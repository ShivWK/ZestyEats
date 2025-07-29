const SessionModel = require("./../models/sessionModel");
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
            // const options = {
            //     method: "POST",
            //     headers: {
            //         "COntent-Type": "application/json",
            //         "Authorization": process.env.FAST_TWO_SMS_KEY,
            //     },
            //     body: JSON.stringify({
            //         message: `Hi ${cleanName.split(" ")[0]}, your OTP is ${signUpOTP} to complete your signup. Do not share this code with anyone. This code is valid for 5 minutes.`,
            //         language: "english",
            //         route: "q",
            //         numbers: `91${cleanPhone}`,
            //     })
            // }

            // fetch("https://www.fast2sms.com/dev/bulkV2", options)

            const text = `Hi ${cleanName.split(" ")[0]}, your OTP is ${signUpOTP} to complete your signup. Do not share this code with anyone. This code is valid for 5 minutes.`;

            sms(cleanPhone, text)
                .then(res => res.json())
                .then(response => {
                    console.log("API response", response)
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
                const text = `Hi ${cleanName.split(" ")[0]}, your OTP is ${signUpOTP} to complete your signup. Do not share this code with anyone. This code is valid for 5 minutes.`;

                const resp = await sendMail(cleanEmail, text)
                console.log("API response", resp)
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