const express = require("express");
const userRouter = express.Router();
const AccessModal = require("./../models/authModals/blockAccessModal");

const {
  signup,
  login,
  guestSession,
  addGuestSessionRecentLocation,
  addGuestSessionFavRestaurants,
  addGuestSessionWishListedItems,
  addGuestSessionItemsToBeAddedInCart,
  addGuestSessionCartItems,
  getGuestSessionData,
  verifyOTP,
  resendOtp,
} = require("./../controllers/userControllers");

const checkSessionId = (req, res, next) => {
  if (!req.signedCookies.gSid) {
    return res.status(400).json({
      status: "failed",
      message: "Session ID not found in signed cookies",
    });
  }

  next();
};

const checkIfBlocked = async (req, res, next) => {
    const visiterId = req.headers["x-device-id"];
    const result = await AccessModal.find({ "deviceInfo.visitorId": visiterId });

    // const arr = result.map(doc => doc.blockedUntil)
    console.log(result);
    next();
}

userRouter.route("/signup/sendOtp/:mode").post(checkIfBlocked ,signup);
userRouter.route("/verifyOtp/:mode/:forWhat").post(checkIfBlocked ,verifyOTP);
userRouter.route("/login/sendOtp/:mode").post(checkIfBlocked ,login);
userRouter.route("/resendOtp/:mode").post(checkIfBlocked ,resendOtp);

userRouter.route("/session").post(guestSession).get(checkSessionId, getGuestSessionData);

userRouter.use(checkSessionId);

userRouter.route("/recentLocations").patch(addGuestSessionRecentLocation);
userRouter.route("/favRestaurants").patch(addGuestSessionFavRestaurants);
userRouter.route("/wishListedItems").patch(addGuestSessionWishListedItems);
userRouter.route("/itemsToBeAddedInCart").patch(addGuestSessionItemsToBeAddedInCart);
userRouter.route("/cartItems").patch(addGuestSessionCartItems);

module.exports = userRouter;
