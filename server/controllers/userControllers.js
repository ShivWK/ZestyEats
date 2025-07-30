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

exports.oAuthAuthorization = (req, res, next) => { }

exports.signup = async (req, res) => {
    const headers = req.header;
    const body = req.body;
    const { name, phone_number, email } = body.userData;
    const token = body.token;
    const mode = req.params.mode;

    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

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
            sameSite: "None",
            path: "/"
        })
    }

    const nameRule = /^[a-zA-Z\s]{1,50}$/;
    const phoneRule = /^[0-9]{10}$/;
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

    const result = await recaptchaVerification(token);

    if (!result.success) {
        return res.status(400).json({
            status: "failed",
            data: result["error-code"],
        })
    } else {
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
                        phone: cleanPhone,
                        for: "signup",
                        hashedOtp: hashedOTP,
                    })

                    // Generate Access Doc
                    await AccessModal.create({
                        sessionId: req.signedCookies.gSid,
                        deviceInfo: deviceFingerPrinter(headers, uaResult, req),
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
                const text = signupEmail(cleanName, signUpOTP);
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

exports.verifyOTP = async (req, res, next) => {
    const headers = req.headers;
    const mode = req.params.mode;
    const clientVisitorId = headers["x-device-id"];
    const ua = headers["x-user-agent"];
    const body = req.body;

    const result = await AccessModal.find({ "deviceInfo.visitorId": clientVisitorId });
    console.log(result);
    const uaResult = UAParser(ua);

    const otpRule = /^[0-9]{6}$/;
    const nameRule = /^[a-zA-Z\s]{1,50}$/;
    const phoneRule = /^[0-9]{10}$/;
    const emailRule = /^[^.][a-zA-z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$/;

    // Data validation 

    if (!nameRule.test(body.name.trim()) ||
        !phoneRule.test(body.phone.trim()) ||
        !emailRule.test(body.email.trim()) ||
        !otpRule.test(body.OTP)) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid Credentials",
        })
    }

    // Data sanitization

    const cleanName = body.name.trim().replace(/\s+/g, " ");
    const cleanPhone = +body.phone.trim();
    const cleanEmail = body.email.trim();

    let OtpDoc = null;
    if (mode === "phone") {
        OtpDoc = await OtpModal.findOne({ phone: body.otpFor.trim() })
    } else {
        OtpDoc = await OtpModal.findOne({ email: body.otpFor.trim() })
    }

    if (!OtpDoc) return res.status(410).json({ status: "failed", message: "OTP expired" });

    const userOTP = crypto.createHash("sha256").update(String(body.OTP)).digest('hex');

    if (userOTP === OtpDoc.hashedOtp) {
        const User = await UserModal.create({
            name: cleanName,
            phone: cleanPhone,
            isNumberVerified: mode === "phone",
            email: cleanEmail,
            isEmailVerified: mode === "email",
        })

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
            sameSite: "None"
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

exports.guestSession = async (req, res, next) => {
    const headers = req.headers;
    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

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

exports.addGuestSessionRecentLocation = async (req, res, next) => {
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
    const sid = req.signedCookies?.sid;

    try {
        const recentLocations = await SessionModel.findById(sid);

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

exports.addGuestSessionFavRestaurants = async (req, res, next) => {
    const sid = req.signedCookies?.sid;

    try {
        const favRestaurants = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.favRestaurants": req.body.favRestaurants } }, { new: true });
        res.status(200).json({
            status: "success",
            data: favRestaurants,
        })
    } catch (err) {
        console.error("Error in favorite restaurant addition", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionWishListedItems = async (req, res, next) => {
    const sid = req.signedCookies?.sid;

    try {
        const wishListedItems = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.wishListedItems": req.body.wishListedItems } }, { new: true });
        res.status(200).json({
            status: "success",
            data: wishListedItems,
        })
    } catch (err) {
        console.error("Error in adding items to wishlist", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionItemsToBeAddedInCart = async (req, res, next) => {
    const sid = req.signedCookies?.sid;

    try {
        const itemsToBeAddedInCart = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.itemsToBeAddedInCart": req.body.itemsToBeAddedInCart } }, { new: true });
        res.status(200).json({
            status: "success",
            data: itemsToBeAddedInCart,
        })
    } catch (err) {
        console.error("Error in adding items to wishlist", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}

exports.addGuestSessionCartItems = async (req, res, next) => {
    const sid = req.signedCookies?.sid;

    try {
        const cartItems = await SessionModel.findByIdAndUpdate(sid,
            { $set: { "data.cartItems": req.body.cartItems } }, { new: true });
        res.status(200).json({
            status: "success",
            data: cartItems,
        })
    } catch (err) {
        console.error("Error in adding items to wishlist", err);

        res.status(500).json({
            status: "failed",
            message: err.message,
        })
    }
}