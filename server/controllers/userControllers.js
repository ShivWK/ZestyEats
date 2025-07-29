const SessionModel = require("./../models/sessionModel");
const OtpModal = require("./../models/otpModel");
const extractDeviceInfo = require("../utils/extractDeviceInfo");
const recaptchaVerification = require("./../utils/recaptchaVerification");
const crypto = require("crypto");
const sendMail = require("./../utils/email");
const sms = require("./../utils/sms");


exports.oAuthAuthorization = (req, res, next) => { }

exports.signup = async (req, res) => {
    const body = req.body;
    const { name, phone_number, email } = body.userData;
    const token = body.token;
    const mode = req.params.mode;

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
                .then( async (response) => {
                    console.log("API response", response);
                    await OtpModal.create({
                        phone: cleanPhone,
                        for: "signup",
                        hashedOtp: signUpOTP,
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
                const text = `<!DOCTYPE html>
                                <html>
                                <head>
                                    <meta charset="UTF-8" />
                                    <title>Your ZestyEats OTP</title>
                                    <style>
                                    body {
                                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                        background-color: #f6f8fa;
                                        padding: 0;
                                        margin: 0;
                                    }
                                    .container {
                                        max-width: 500px;
                                        margin: 40px auto;
                                        background-color: #ffffff;
                                        border-radius: 8px;
                                        padding: 30px;
                                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                                        text-align: center;
                                    }
                                    .logo {
                                        font-size: 30px;
                                        color: #ff5200;
                                        font-weight: bold;
                                        margin-bottom: 20px;
                                    }
                                    .otp {
                                        font-size: 32px;
                                        font-weight: 700;
                                        letter-spacing: 4px;
                                        color: #333;
                                        margin: 20px 0;
                                    }
                                    .text {
                                        font-size: 16px;
                                        color: #555;
                                        margin-bottom: 30px;
                                    }
                                    .footer {
                                        font-size: 12px;
                                        color: #aaa;
                                        margin-top: 20px;
                                    }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                    <div class="logo">ZestyEats</div>
                                    <div class="text">
                                        Hey ${cleanName.split(" ")[0]} <br />
                                        Use the OTP below to complete your signup:
                                    </div>
                                    <div class="otp">${signUpOTP}</div>
                                    <div class="text">
                                        This OTP is valid for only 5 minutes. <br />
                                        If you did not request this, you can safely ignore this email.
                                    </div>
                                    <div class="footer">
                                        © 2025 ZestyEats. All rights reserved.
                                    </div>
                                    </div>
                                </body>
                                </html>`;

                const resp = await sendMail(cleanEmail, text)
                console.log("API response", resp)

                await OtpModal.create({
                        email: cleanEmail,
                        for: "signup",
                        hashedOtp: signUpOTP,
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

exports.guestSession = async (req, res, next) => {
    console.log("hit")
    const deviceInfo = extractDeviceInfo(req.body.deviceId)

    try {
        if (!req.signedCookies?.sid) {
            const session = await SessionModel.create({ deviceId: deviceInfo.signature });

            res.cookie("sid", session.id, {
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
                    sessionId: req.signedCookies.sid,
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