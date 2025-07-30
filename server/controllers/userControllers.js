const SessionModel = require("../models/authModals/sessionModel");
const OtpModal = require("../models/authModals/otpModel");
const AccessModal = require("./../models/authModals/blockAccessModal");
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
            deviceInfo: deviceFingerPrinter(headers, uaResult),
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
        return res.status(400).json({
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
                        deviceInfo: deviceFingerPrinter(headers, uaResult),
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
                    deviceInfo: deviceFingerPrinter(headers, uaResult),
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
    const clientVisitorId = headers["x-device-id"];
    const body = req.body;

    const result = await AccessModal.find({ "deviceInfo.visitorId" : clientVisitorId});

    console.log(result)
}

exports.guestSession = async (req, res, next) => {
    const headers = req.headers;
    const ua = headers["x-user-agent"];
    const uaResult = UAParser(ua);

    try {
        if (!req.signedCookies?.gSid) {
            const session = await SessionModel.create({
                deviceInfo: deviceFingerPrinter(headers, uaResult),
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