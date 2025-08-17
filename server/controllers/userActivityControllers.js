const UserActivityModal = require("./../models/userActivityModel");
const SessionModel = require("./../models/authModals/sessionModel");
const UserModal = require("./../models/userModel");
const OtpModel = require("../models/authModals/otpModel");
const AddressModel = require("./../models/userAddressModel");

const deviceFingerPrinter = require("./../utils/deviceFingerPrinter");
const { UAParser } = require("ua-parser-js");
const calSessionValidationScore = require("./../utils/calSessionValidationScore");
const cleanGuestSessionData = require("./../utils/cleanGuestSessionData");

const mailTemplate = require("./../utils/emailTemplates/signupEmail");
const crypto = require("crypto");
const sendEmail = require("./../utils/email");
const sendSMS = require("./../utils/sms");

exports.checkSessionId = (req, res, next) => {
    if (!req.signedCookies.rSid) {
        return res.status(400).json({
            status: "failed",
            message: "Session ID not found in signed cookies",
        });
    }

    next();
}

exports.protected = async (req, res, next) => {
    const rSid = req.signedCookies.rSid;
    const headers = req.headers;
    const clientUa = headers["x-user-agent"];
    const uaResult = UAParser(clientUa);

    console.log("Protection HIT")

    const clientDeviceInfo = deviceFingerPrinter(uaResult, req);

    // console.log("Client", clientDeviceInfo);

    if (!rSid) {
        return res.status(401).json({
            status: "failed",
            message: "Missing session ID"
        });
    }

    try {
        const session = await SessionModel.findById(rSid);

        if (!session) {
            return res.status(401).json({
                status: "failed",
                message: "unauthorized"
            })
        }

        const sessionDeviceInfo = session.deviceInfo;
        // console.log("Existing visitor", sessionDeviceInfo)

        const score = calSessionValidationScore(sessionDeviceInfo, clientDeviceInfo);
        // console.log(score)

        if (score < 10) {
            return res.status(401).json({
                status: "failed",
                message: "Not a valid session. Please login again.",
                login: true
            })
        }

        req.UserID = session.userId;

        await SessionModel.findByIdAndUpdate(rSid, { $set: { createdAt: new Date() } });
        next();
    } catch (err) {
        console.log("Error in getting session", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

exports.getUserActivityData = async (req, res, next) => {
    const userId = req.UserID;

    try {
        const doc = await UserActivityModal.findOneAndUpdate(
            { userId },
            {},
            { new: true, upsert: true }
        );

        return res.status(200).json({
            status: "success",
            data: doc
        })
    } catch (err) {
        console.log("Error in getting the doc", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.getLiveSessions = async (req, res, next) => {
    const userId = req.UserID;
    const sid = req.signedCookies.rSid;

    try {
        const sessions = await SessionModel.find({ userId, type: "registered" });
        console.log(sessions);

        const resultArr = sessions.map(session => {
            const activeNow = sid == session.id;

            return {
                id: session.id,
                data: session.deviceInfo,
                lastActive: session.createdAt,
                activeNow
            }
        })

        return res.status(200).json({
            status: "success",
            data: resultArr
        })

    } catch (err) {
        console.log("Error in finding sessions", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.setAllDataAtOnce = async (req, res, next) => {

}

exports.getUserAddress = async (req, res, next) => {
    const userId = req.UserID;

    try {
        const result = await UserModal.findById(userId);

        return res.status(200).json({
            status: "success",
            data: result.address,
        })
    } catch (err) {
        console.log("Error in fetching user address", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error."
        })
    }
}

exports.setUserAddress = async (req, res, next) => {
    const userId = req.UserID;
    const data = req.body.address;

    if (!data) {
        return res.status(400).json({
            status: "failed",
            message: "Please Proved the address"
        })
    }

    try {
        const result = await UserModal.findByIdAndUpdate(userId, { $push: { address: data } });

        return res.status(200).json({
            status: "success",
            message: "Address added successfully",
            data: result.address,
        })
    } catch (err) {
        console.log("Error in fetching user address", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error."
        })
    }
}

exports.getUserPaymentMethods = async (req, res, next) => {
    const userId = req.UserID;

    try {
        const result = await UserModal.findById(userId);

        return res.status(200).json({
            status: "success",
            data: result.payments,
        })
    } catch (err) {
        console.log("Error in fetching user payment methods", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error."
        })
    }
}

exports.setUserCartData = async (req, res, next) => {
    const data = req.body.cartItems;
    const userId = req.UserID;

    try {
        const doc = await UserActivityModal.findOneAndUpdate(
            { userId },
            { $set: { cartItems: data } },
            { new: true }
        );

        return res.status(200).json({
            status: "success",
            data: doc
        })
    } catch (err) {
        console.log("Error in getting the doc", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.setUserWishListData = async (req, res, next) => {
    const data = req.body.wishListedItems;
    const userId = req.UserID;

    try {
        const doc = await UserActivityModal.findOneAndUpdate(
            { userId },
            { $set: { wishListedItems: data } },
            { new: true }
        );

        return res.status(200).json({
            status: "success",
            data: doc
        })
    } catch (err) {
        console.log("Error in getting the doc", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.setUserFavRestaurantData = async (req, res, next) => {
    const data = req.body.favRestaurants;
    const userId = req.UserID;

    try {
        const doc = await UserActivityModal.findOneAndUpdate(
            { userId },
            { $set: { favRestaurants: data } },
            { new: true }
        );

        return res.status(200).json({
            status: "success",
            data: doc
        })
    } catch (err) {
        console.log("Error in getting the doc", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.setUserRecentLocationData = async (req, res, next) => {
    const data = req.body.recentLocations;
    const userId = req.UserID;

    try {
        const doc = await UserActivityModal.findOneAndUpdate(
            { userId },
            { $set: { recentLocations: data } },
            { new: true }
        );

        return res.status(200).json({
            status: "success",
            data: doc
        })
    } catch (err) {
        console.log("Error in getting the doc", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.setUserItemsToBeAddedInCartData = async (req, res, next) => {
    const data = req.body.itemsToBeAddedInCart;
    const userId = req.UserID;

    try {
        const doc = await UserActivityModal.findOneAndUpdate(
            { userId },
            { $set: { itemsToBeAddedInCart: data } },
            { new: true }
        );

        return res.status(200).json({
            status: "success",
            data: doc
        })
    } catch (err) {
        console.log("Error in getting the doc", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.logTheUserOut = async (req, res, next) => {
    const gSid = req.signedCookies.gSid;
    const mode = req.params.mode;
    const sessionId = req.body.id;
    const userId = req.UserID;

    if (mode === "single") {
        if (!sessionId) {
            return res.status(400).json({
                status: "failed",
                message: "Session ID is required"
            })
        }

        try {
            const deletedSession = await SessionModel.findByIdAndDelete(sessionId);

            if (!deletedSession) {
                return res.status(404).json({
                    status: "failed",
                    message: "Session not found"
                })
            }

            res.status(200).json({
                status: "success",
                message: "User logged out successfully",
            })

        } catch (err) {
            console.log("Error in logging the user out", err);

            return res.status(500).json({
                status: "error",
                message: "Internal server error"
            })
        }
    } else {
        try {
            const deletedSession = await SessionModel.deleteMany({ userId });

            if (!deletedSession) {
                return res.status(404).json({
                    status: "failed",
                    message: "Sessions with the given user are not found"
                })
            }

            await cleanGuestSessionData(gSid);

            res.status(200).json({
                status: "success",
                message: "User logged out from all sessions successfully",
            })

        } catch (err) {
            console.log("Error in logging the user out", err);

            return res.status(500).json({
                status: "error",
                login: "Internal server error"
            })
        }
    }

    await cleanGuestSessionData(gSid);
}

exports.verifyDeleteOtp = async (req, res, next) => {
    const otp = req.body.otp;
    const email = req.body.email;

    const userHashedOTP = crypto.createHash("sha256").update(String(otp)).digest("hex");

    try {
        const otpDoc = await OtpModel.findOne({ email });

        if (!otpDoc) {
            return res.status(410).json({
                status: "failed",
                message: "OTP expired"
            });
        }

        if (userHashedOTP === otpDoc.hashedOtp) {
            await OtpModel.deleteOne({ _id: otpDoc._id });

            return res.status(200).json({
                status: "success",
                message: "OTP verified"
            })
        } else {
            return res.status(401).json({
                status: "failed",
                message: "invalid OTP"
            })
        }

    } catch (err) {
        console.log("Error in verifying the OTP", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error. Please try after sometime."
        })
    }
}

exports.deleteAccount = async (req, res, next) => {
    const userId = req.UserID;
    const mode = req.params.mode;

    try {
        if (mode === "sendOTP") {
            const user = await UserModal.findById(userId);
            const email = user.email;

            await OtpModel.deleteMany({ email });

            const deleteOTP = crypto.randomInt(100000, 1000000);
            const text = mailTemplate(user.name, deleteOTP, "account deletion");

            const resp = await sendEmail(email, text);

            console.log("deletion mail send", resp);

            const hashedOTP = crypto.createHash("sha256").update(String(deleteOTP)).digest("hex");
            await OtpModel.create({
                email,
                for: "delete",
                hashedOtp: hashedOTP
            });

            return res.status(200).json({
                status: "success",
                message: "OTP send successfully to your email"
            })
        } else if (mode === "deleteAccount") {
            await UserModal.findByIdAndDelete(userId);
            await SessionModel.findOneAndDelete({ userId, type: "registered" });
            await AddressModel.findOneAndDelete({ userId });
            await UserActivityModal.findOneAndDelete({ userId });

            return res.status(200).json({
                status: "success",
                message: "Account deleted successfully"
            })
        }

    } catch (err) {
        console.log("Error in sending deletion OTP", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error. Please try after sometime."
        })
    }
}

exports.sendEditOTP = async (req, res, next) => {
    const forWhat = req.body.forWhat;
    const mode = req.params.mode;
    const action = req.params.action;
    const userId = req.UserID;

    if (!forWhat) {
        return req.status(400).json({
            status: "failed",
            message: "Please provide where to send the OTP"
        })
    }

    const editOTP = crypto.randomInt(100000, 1000000);
    const hashedOTP = crypto.createHash("sha256").update(String(editOTP)).digest("hex");

    try {
        const user = await UserModal.findById(userId);

        if (mode === "phone") {
            await OtpModel.deleteMany({ [mode]: forWhat });

            const text = `Hi, your OTP is ${editOTP}. Do not share this code with anyone. This code is valid for 5 minutes.`;

            const result = await sendSMS(forWhat, text);
            console.log("OTP sms send", result);

            await OtpModel.create({
                phone: forWhat,
                for: "verification",
                hashedOtp: hashedOTP
            });

            return res.status(200).json({
                status: "success",
                message: "OTP successfully send to your phone number."
            })

        } else if (mode === "email") {
            await OtpModel.deleteMany({ [mode]: forWhat });
            const purpose = action === "verification" ? "verification" : "account details update";
            const type = action === "verification" ? "verification" : "edit";

            const text = mailTemplate(user.name, editOTP, purpose);

            const result = await sendEmail(forWhat, text);
            console.log("OTP send successfully", result);

            await OtpModel.create({
                email: forWhat,
                for: type,
                hashedOtp: hashedOTP
            });

            return res.status(200).json({
                status: "success",
                message: "OTP send successfully to your email",
            });
        }
    } catch (err) {
        console.log("Error in sending profile update OTP", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error. Please try after sometime."
        })
    }
}

exports.updateProfile = async (req, res, next) => {
    const userId = req.UserID;

    const body = req.body;
    const data = body.data;
    const otp = body.OTP;
    const isEmailChanged = body.isEmailChanged;
    const isPhoneChanged = body.isPhoneChanged;

    if (!data || !otp) {
        return res.status(400).json({
            status: "failed",
            message: "Please provide data",
        })
    }

    try {
        const userHashedOTP = crypto.createHash("sha256").update(String(otp)).digest("hex");
        const otpDoc = await OtpModel.findOne({ email: data.oldEmail });

        if (!otpDoc) {
            return res.status(410).json({
                status: "failed",
                message: "OTP expired"
            });
        }

        if (userHashedOTP === otpDoc.hashedOtp) {

            const updateData = {
                name: data.name,
                phone: data.phone,
                email: data.email,
            }

            if (isEmailChanged) updateData.isEmailVerified = false;
            if (isPhoneChanged) updateData.isNumberVerified = false;

            const result = await UserModal.findByIdAndUpdate(userId, { $set: updateData });
            await OtpModel.deleteOne({ _id: otpDoc._id });

            return res.status(200).json({
                status: "success",
                message: "Profile Updated successfully"
            })
        } else {
            return res.status(401).json({
                status: "failed",
                message: "invalid OTP"
            })
        }

    } catch (err) {
        console.log("Error in updating the profile", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error. Please try after sometime."
        })
    }
}

exports.getUserProfile = async (req, res, next) => {
    const userId = req.UserId;

    try {
        const User = await UserModal.findById(userId);

        const user = {
            name: User.name,
            phone: User.phone,
            email: User.email,
            isEmailVerified: User.isEmailVerified,
            isNumberVerified: User.isNumberVerified,
        }

        return res.status(200).json({
            status: "success",
            data: user,
            auth: true
        })
    } catch (err) {
        console.log("Error in fetching user details", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error. Please try after sometime."
        })
    }
}