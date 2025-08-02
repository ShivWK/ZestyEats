const SessionModel = require("../models/authModals/sessionModel");
const OtpModal = require("../models/authModals/otpModel");
const AccessModal = require("./../models/authModals/blockAccessModal");
const UserModal = require("./../models/userModel");
const recaptchaVerification = require("./../utils/recaptchaVerification");
const crypto = require("crypto");
const sendMail = require("./../utils/email");
const sms = require("./../utils/sms");
const { UAParser } = require('ua-parser-js');
const signupEmail = require("./../utils/emailTemplates/signupEmail");
const deviceFingerPrinter = require("./../utils/deviceFingerPrinter");

exports.guestSession = async (req, res, next) => {
    const headers = req.headers;
    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

    console.log(req.signedCookies);

    try {
        if (!req.signedCookies?.gSid) {
            const session = await SessionModel.create({
                deviceInfo: deviceFingerPrinter(headers, uaResult, req),
                type: "guest"
            });

            res.cookie("gSid", session.id, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                signed: true,
                secure: true,
                sameSite: "None"
            })

            res.status(200).json({
                status: "success",
                data: {
                    message: "Session created",
                    sessionId: session.id,
                }
            })
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    message: "Session created",
                    sessionId: req.signedCookies.gSid,
                }
            })
        }

    } catch (err) {
        console.error("Error in session creation", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.signup = async (req, res) => {
    const headers = req.headers;
    const body = req.body;
    const { name, phone_number, email } = body.userData;
    const token = body.token;
    const mode = req.params.mode;

    const visiterId = headers["x-device-id"]
    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

    if (!name || !phone_number || !email || !token || !ua || !visiterId) {
        return res.status(400).json({
            status: "failed",
            message: "invalid credentials"
        })
    }

    const nameRule = /^[a-zA-Z\s]{1,50}$/;
    const phoneRule = /^[2-9]\d{9}$/;
    const emailRule = /^[^.][a-zA-z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

    // Data validation 

    if (!nameRule.test(name.trim()) ||
        !phoneRule.test(phone_number.trim()) ||
        !emailRule.test(email.trim())) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid Credentials",
        })
    }

    // Data sanitization

    const cleanName = name.trim().replace(/\s+/g, " ");
    const cleanPhone = +phone_number.trim();
    const cleanEmail = email.trim();

    const recaptchaResult = await recaptchaVerification(token);

    if (!recaptchaResult.success) {
        return res.status(401).json({
            status: "failed",
            data: recaptchaResult["error-code"],
        })
    } else {
        const user = await UserModal.findOne({ email: cleanEmail });
        if (user) {
            return res.status(409).json({
                status: "failed",
                message: "Email already exists. Please log in instead."
            })
        }

        const signUpOTP = crypto.randomInt(100000, 1000000);

        if (mode === "phone") {
            const text = `Hi ${cleanName.split(" ")[0]}, your OTP is ${signUpOTP} to complete your signup. Do not share this code with anyone. This code is valid for 5 minutes.`;

            sms(cleanPhone, text)
                .then(res => res.json())
                .then(async (response) => {
                    console.log("API response", response);

                    // GENERATE OTP DOC
                    const hashedOTP = crypto.createHash("sha256").update(String(signUpOTP)).digest("hex");
                    await OtpModal.create({
                        visiterId,
                        phone: cleanPhone,
                        for: "signup",
                        hashedOtp: hashedOTP,
                    })

                    // Generate Access Doc
                    await AccessModal.create({
                        sessionId: req.signedCookies.gSid,
                        deviceInfo: deviceFingerPrinter(headers, uaResult, req),
                        phone: cleanPhone,
                    })

                    return res.status(200).json({
                        status: "success",
                        message: "OTP send successfully to your number"
                    })
                }).catch(err => {
                    console.log("Error in sending OTP", err);
                    return res.status(500).json({
                        status: "failed",
                        message: "OTP not send"
                    })
                })

        } else {
            try {
                const text = signupEmail(cleanName, signUpOTP, "signup");
                const resp = await sendMail(cleanEmail, text)
                console.log("API response", resp)

                // Generate OTP Doc
                const hashedOTP = crypto.createHash("sha256").update(String(signUpOTP)).digest("hex");
                await OtpModal.create({
                    email: cleanEmail,
                    for: "signup",
                    hashedOtp: hashedOTP
                })

                // Generate Access Doc
                await AccessModal.create({
                    sessionId: req.signedCookies.gSid,
                    deviceInfo: deviceFingerPrinter(headers, uaResult, req),
                    email: cleanEmail,
                })

                return res.status(200).json({
                    status: "success",
                    message: "OTP send successfully to your email"
                })
            } catch (err) {
                console.log("Error in sending OTP", err);
                return res.status(500).json({
                    status: "failed",
                    message: "OTP not send"
                })
            }
        }
    }
}

exports.login = async (req, res, next) => {
    const headers = req.headers;
    const mode = req.params.mode;
    const body = req.body;

    const otpFor = body.otpFor;
    const token = body.token;

    const visiterId = headers["x-device-id"]
    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

    if (!otpFor || !token || !ua || !visiterId) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid credentials"
        })
    }

    const phoneRule = /^[2-9]\d{9}$/;
    const emailRule = /^[^.][a-zA-z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

    // Data validation 

    if (mode === "phone") {
        if (!phoneRule.test(otpFor.trim())) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid Credentials",
            })
        }
    } else {
        if (!emailRule.test(otpFor.trim())) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid Credentials",
            })
        }
    }

    // Data sanitization
    let cleanEmail = null;
    let cleanPhone = null;

    if (mode === "phone") cleanPhone = +otpFor.trim();
    else cleanEmail = otpFor.trim();

    const recaptchaResult = await recaptchaVerification(token);

    if (!recaptchaResult.success) {
        return res.status(401).json({
            status: "failed",
            data: recaptchaResult["error-code"],
        })
    } else {
        let user = null;

        if (mode === "phone") user = await UserModal.findOne({ phone: cleanPhone });
        else user = await UserModal.findOne({ email: cleanEmail });

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid credential. Please try again."
            })
        }

        const loginOTP = crypto.randomInt(100000, 1000000);

        if (mode === "phone") {
            const text = `Hi, your OTP is ${loginOTP} to complete your login. Do not share this code with anyone. This code is valid for 5 minutes.`;

            // Delete existing otp(s)
            await OtpModal.deleteMany({ visiterId });

            sms(cleanPhone, text)
                .then(res => res.json())
                .then(async (response) => {
                    console.log("API response", response);

                    // GENERATE OTP DOC
                    const hashedOTP = crypto.createHash("sha256").update(String(loginOTP)).digest("hex");
                    await OtpModal.create({
                        visiterId,
                        phone: cleanPhone,
                        for: "login",
                        hashedOtp: hashedOTP,
                    })

                    // Generate Access Doc
                    await AccessModal.create({
                        sessionId: req.signedCookies.gSid,
                        deviceInfo: deviceFingerPrinter(headers, uaResult, req),
                        phone: cleanPhone,
                    })

                    return res.status(200).json({
                        status: "success",
                        message: "OTP send successfully to your number"
                    })
                }).catch(err => {
                    console.log("Error in sending OTP", err);
                    return res.status(500).json({
                        status: "failed",
                        message: "OTP not send. Please try again."
                    })
                })

        } else {
            try {
                const text = signupEmail(null, loginOTP, "login");
                const resp = await sendMail(cleanEmail, text)
                console.log("API response", resp)

                // Generate OTP Doc
                const hashedOTP = crypto.createHash("sha256").update(String(loginOTP)).digest("hex");
                await OtpModal.create({
                    email: cleanEmail,
                    for: "login",
                    hashedOtp: hashedOTP
                })

                // Generate Access Doc
                await AccessModal.create({
                    sessionId: req.signedCookies.gSid,
                    deviceInfo: deviceFingerPrinter(headers, uaResult, req),
                    email: cleanEmail,
                })

                return res.status(200).json({
                    status: "success",
                    message: "OTP send successfully to your email"
                })
            } catch (err) {
                console.log("Error in sending OTP", err);
                return res.status(500).json({
                    status: "failed",
                    message: "OTP not send. Please try again."
                })
            }
        }
    }
}

exports.resendOtp = async (req, res, next) => {
    const headers = req.headers;
    const visiterId = headers["x-device-id"]
    const ua = headers["x-user-agent"];
    const mode = req.params.mode;

    const body = req.body;
    const resendOtpTo = body.resendOtpTo;
    const token = body.token;

    if (!token || !resendOtpTo || !visiterId || !ua) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid credentials"
        })
    }

    const recaptchaResult = await recaptchaVerification(token);

    if (!recaptchaResult.success) {
        return res.status(401).json({
            status: "failed",
            data: recaptchaResult["error-code"],
        })

    } else {
        const result = await AccessModal.find({ "deviceInfo.visitorId": visiterId });

        for (const doc of result) {
            const block = doc.resendBlocked;

            // console.log(block)

            if (block?.value && block.blockedAt) {
                const blockExpiresAt = new Date(block.blockedAt.getTime() + 5 * 60 * 1000);

                if (Date.now() < blockExpiresAt.getTime()) {
                    return res.status(429).json({
                        status: "failed",
                        message: "Resend limit reached. Try again after some time.",
                        block: true
                    });
                } else {
                    const findThrough = doc.phone ? "phone" : "email";
                    const findThroughValue = doc.phone ?? doc.email;

                    const update = await AccessModal.findOneAndUpdate(
                        { [findThrough]: findThroughValue },
                        {
                            $set: {
                                resendCount: 0,
                                "resendBlocked.value": false,
                                "resendBlocked.blockedAt": null,
                            }
                        }
                    )

                    console.log("Unblocking result", update);
                }
            }
        }

        async function updateResendCount(value, findThrough) {
            const newValue = await AccessModal.findOneAndUpdate(
                { [findThrough]: value },
                { $inc: { resendCount: 1 } },
                { new: true, upsert: true }
            )

            console.log(newValue)

            if (newValue?.resendCount >= 3) {
                const newValue = await AccessModal.updateOne(
                    { [findThrough]: value },
                    { $set: { "resendBlocked.value": true, "resendBlocked.blockedAt": new Date()} },
                    { new: true, upsert: true }
                )

                console.log(newValue)
            }

            return newValue?.resendCount;
        }

        const resendOTP = crypto.randomInt(100000, 1000000);

        if (mode === "phone") {
            await OtpModal.deleteMany({ phone: resendOtpTo });

            text = `Hi, your OTP is ${resendOTP}. Do not share this code with anyone. This code is valid for 5 minutes.`;

            sms(resendOtpTo, text)
                .then(res => res.json())
                .then(async (response) => {
                    console.log("API response", response);

                    // GENERATE OTP DOC
                    const hashedOTP = crypto.createHash("sha256").update(String(resendOTP)).digest("hex");
                    await OtpModal.create({
                        visiterId,
                        phone: resendOtpTo,
                        for: "login",
                        hashedOtp: hashedOTP,
                    })

                    // Update in access doc
                    const count = await updateResendCount(resendOtpTo, "phone");

                    res.status(200).json({
                        status: "success",
                        message: "OTP send successfully to your number",
                        resendCount: count
                    })

                }).catch(err => {
                    console.log("Error in sending OTP", err);
                    return res.status(500).json({
                        status: "failed",
                        message: "OTP not send. Please try again."
                    })
                })
        } else {
            await OtpModal.deleteMany({ email: resendOtpTo });

            try {
                const text = signupEmail(null, resendOTP, "Authentication");
                const resp = await sendMail(resendOtpTo, text)
                console.log("API response", resp)

                // Generate OTP Doc
                const hashedOTP = crypto.createHash("sha256").update(String(resendOTP)).digest("hex");
                await OtpModal.create({
                    email: resendOtpTo,
                    for: "login",
                    hashedOtp: hashedOTP
                })

                // Update access doc
                const count = await updateResendCount(resendOtpTo, "email");

                res.status(200).json({
                    status: "success",
                    message: "OTP send successfully to your email",
                    resendCount: count,
                })
            } catch (err) {
                console.log("Error in sending OTP", err);
                return res.status(500).json({
                    status: "failed",
                    message: "OTP not send. Please try again."
                })
            }
        }
    }
}

exports.verifyOTP = async (req, res, next) => {
    const headers = req.headers;
    const mode = req.params.mode;
    const forWhat = req.params.forWhat;
    const visiterId = headers["x-device-id"];
    const body = req.body;

    console.log(mode, forWhat, body.OTP, body.otpFor);

    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

    const otpRule = /^[0-9]{6}$/;
    const nameRule = /^[a-zA-Z\s]{1,50}$/;
    const phoneRule = /^[0-9]{10}$/;
    const emailRule = /^[^.][a-zA-z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

    // Data validation 

    if (forWhat === "signup") {
        if (!nameRule.test(body.name.trim()) ||
            !phoneRule.test(body.phone.trim()) ||
            !emailRule.test(body.email.trim()) ||
            !otpRule.test(body.OTP)) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid Credentials",
            })
        }
    } else {
        if (mode === "phone") {
            if (!phoneRule.test(body.otpFor.trim()) || !otpRule.test(body.OTP.trim())) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid Credentials",
                })
            }
        } else {
            if (!emailRule.test(body.otpFor.trim()) || !otpRule.test(body.OTP.trim())) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid Credentials",
                })
            }
        }
    }

    // Data sanitization

    let cleanEmail = null;
    let cleanName = null;
    let cleanPhone = null;

    if (forWhat === "signup") {
        cleanName = body.name.trim().replace(/\s+/g, " ");
        cleanPhone = +body.phone.trim();
        cleanEmail = body.email.trim();
    }

    let OtpDoc = null;
    if (mode === "phone") {
        OtpDoc = await OtpModal.findOne({ phone: body.otpFor.trim() })
    } else {
        OtpDoc = await OtpModal.findOne({ email: body.otpFor.trim() })
    }

    if (!OtpDoc) return res.status(410).json({ status: "failed", message: "OTP expired" });

    const userOTP = crypto.createHash("sha256").update(String(body.OTP)).digest('hex');

    if (userOTP === OtpDoc.hashedOtp) {
        let User = null;

        if (forWhat === "signup") {
            User = await UserModal.create({
                name: cleanName,
                phone: cleanPhone,
                isNumberVerified: mode === "phone",
                email: cleanEmail,
                isEmailVerified: mode === "email",
            })
        } else {
            if (mode === "phone") User = await UserModal.findOne({ phone: body.otpFor });
            else User = await UserModal.findOne({ email: body.otpFor });
        }

        // Create a registered session

        const session = await SessionModel.create({
            userId: User.id,
            deviceInfo: deviceFingerPrinter(headers, uaResult, req),
            type: "registered"
        });

        res.cookie("rSid", session.id, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            signed: true,
            secure: true,
            sameSite: "None",
            path: "/"
        })

        return res.status(200).json({
            status: "success",
            data: {
                userName: User.name,
                userEmail: User.email,
                userPhone: User.phone,
                isEmailVerified: User.isEmailVerified,
                isPhoneVerified: User.isNumberVerified,
            }
        })
    } else {
        return res.status(401).json({
            status: "failed",
            message: "Invalid OTP"
        })
    }
}

exports.addGuestSessionRecentLocation = async (req, res, next) => {
    console.log("Hit", req.body);

    const sid = req.signedCookies?.sid;

    try {
        const recentLocations = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.recentLocations": req.body.recentLocations } }, { new: true });
        res.status(200).json({
            status: "success",
            data: recentLocations,
        })
    } catch (err) {
        console.error("Error in location addition", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.getGuestSessionData = async (req, res, next) => {
    console.log("Hit", req.body);

    const sid = req.signedCookies?.sid;

    try {
        const sessionData = await SessionModel.findById(sid);

        res.status(200).json({
            status: "success",
            data: sessionData,
        })
    } catch (err) {
        console.error("Error in location addition", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionFavRestaurants = async (req, res, next) => {
    console.log("Hit", req.body);

    const sid = req.signedCookies?.sid;

    try {
        const favRestaurants = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.favRestaurants": req.body.favRestaurants } }, { new: true });
        res.status(200).json({
            status: "success",
            data: favRestaurants,
        })

        console.log("Added", favRestaurants)
    } catch (err) {
        console.error("Error in favorite restaurant addition", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionWishListedItems = async (req, res, next) => {
    console.log("Hit", req.body);

    const sid = req.signedCookies?.sid;

    try {
        const wishListedItems = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.wishListedItems": req.body.wishListedItems } }, { new: true });
        res.status(200).json({
            status: "success",
            data: wishListedItems,
        })

        console.log("Added", wishListedItems);
    } catch (err) {
        console.error("Error in adding items to wishlist", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionItemsToBeAddedInCart = async (req, res, next) => {
    console.log("Hit", req.body);

    const sid = req.signedCookies?.sid;

    try {
        const itemsToBeAddedInCart = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.itemsToBeAddedInCart": req.body.itemsToBeAddedInCart } }, { new: true });
        res.status(200).json({
            status: "success",
            data: itemsToBeAddedInCart,
        })

        console.log("Added", itemsToBeAddedInCart);
    } catch (err) {
        console.error("Error in adding items to wishlist", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionCartItems = async (req, res, next) => {
    console.log("Hit", req.body);

    const sid = req.signedCookies?.sid;

    try {
        const cartItems = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.cartItems": req.body.cartItems } }, { new: true });
        res.status(200).json({
            status: "success",
            data: cartItems,
        })
        console.log("Added", cartItems)
    } catch (err) {
        console.error("Error in adding items to wishlist", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.oAuthAuthorization = (req, res, next) => { }
