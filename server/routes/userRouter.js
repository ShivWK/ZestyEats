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
  getGuestSessionData
} = require("./../controllers/userControllers");

userRouter.route("/signup").post(signup);
userRouter.route("/session").post(guestSession).get(getGuestSessionData);
userRouter.route("/recentLocations").patch(addGuestSessionRecentLocation);
userRouter.route("/favRestaurants").patch(addGuestSessionFavRestaurants);
userRouter.route("/wishListedItems").patch(addGuestSessionWishListedItems);
userRouter.route("/itemsToBeAddedInCart").patch(addGuestSessionItemsToBeAddedInCart);
userRouter.route("/cartItems").patch(addGuestSessionCartItems);

module.exports = userRouter;
