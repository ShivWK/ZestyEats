const express = require("express");
const userRouter = express.Router();
const {
  signup,
  guestSession,
  addGuestSessionRecentLocation,
  addGuestSessionFavRestaurants,
  addGuestSessionWishListedItems,
  addGuestSessionItemsToBeAddedInCart,
  addGuestSessionCartItems,
  getGuestSessionData,
} = require("./../controllers/userControllers");

const checkSessionId = (req, res, next) => {
  if (!req.signedCookies.sid) {
    return res.status(400).json({
      status: "failed",
      message: "Session ID not found in signed cookies",
    });
  }

  next();
};

userRouter.route("/signup").post(signup);
userRouter
  .route("/session")
  .post(guestSession)
  .get(checkSessionId, getGuestSessionData);

userRouter.use(checkSessionId);

userRouter.route("/recentLocations").patch(addGuestSessionRecentLocation);
userRouter.route("/favRestaurants").patch(addGuestSessionFavRestaurants);
userRouter.route("/wishListedItems").patch(addGuestSessionWishListedItems);
userRouter
  .route("/itemsToBeAddedInCart")
  .patch(addGuestSessionItemsToBeAddedInCart);
userRouter.route("/cartItems").patch(addGuestSessionCartItems);

module.exports = userRouter;
