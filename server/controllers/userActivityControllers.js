const UserActivityModal = require("./../models/userActivityModel");
const SessionModel = require("./../models/authModals/sessionModel");
const deviceFingerPrinter = require("./../utils/deviceFingerPrinter");
const { UAParser } = require("ua-parser-js");
const calSessionValidationScore = require("./../utils/calSessionValidationScore");
const cleanGuestSessionData = require("./../utils/cleanGuestSessionData");

exports.checkSessionId = (req, res, next) => {
    if (!req.signedCookies.rSid) {
        return res.status(400).json({
            status: "failed",
            message: "Session ID not found in signed cookies",
        });
    }

    next();
}

// const calSessionValidationScore = (stored, current) => {
//     let score = 0;

//     if (stored.visitorId === current.visitorId) score += 5;
//     if (stored.deviceIp === current.deviceIp) score += 1;
//     if (stored.browserName === current.browserName) score += 3;
//     if (stored.browserVersion === current.browserVersion) score += 2;
//     if (stored.oSName === current.oSName) score += 2;
//     if (stored.oSVersion === current.oSVersion) score += 1;
//     if (stored.uA === current.uA) score += 2;
//     if (stored.deviceModal === current.deviceModal) score += 1;
//     if (stored.deviceVender === current.deviceVender) score += 1;
//     if (stored.language === current.language) score += 1;
//     if (stored.resolution === current.resolution) score += 1;

//     return score;
// }

exports.protected = async (req, res, next) => {
    const rSid = req.signedCookies.rSid;
    const headers = req.headers;
    const clientUa = headers["x-user-agent"];
    const uaResult = UAParser(clientUa);
    
    const clientDeviceInfo = deviceFingerPrinter(uaResult, req);

    console.log("Client", clientDeviceInfo);

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
        console.log("Existing visitor", sessionDeviceInfo)

        const score = calSessionValidationScore(sessionDeviceInfo, clientDeviceInfo);
        console.log(score)

        if (score < 15) {
            return res.status(401).json({
                status: "failed",
                message: "Not a valid session. Please login again.",
                login: true
            })
        }

        req.UserID = session.userId;
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
