const express = require("express");
const userRouter = express.Router();
const {
  signup,
  guestSession,
  addGuestSessionRecentLocation,
  addGuestSessionFavRestaurants,
  addGuestSessionWishListedItems,
  addGuestSessionItemsToBeAddedInCart
} = require("./../controllers/userControllers");

userRouter.route("/signup").post(signup);
userRouter.route("/session").post(guestSession);
userRouter.route("/recentLocations").patch(addGuestSessionRecentLocation);
userRouter.route("/favRestaurants").patch(addGuestSessionFavRestaurants);
userRouter.route("/wishListedItems").patch(addGuestSessionWishListedItems);
userRouter.route("/itemsToBeAddedInCart").patch(addGuestSessionItemsToBeAddedInCart);

module.exports = userRouter;
