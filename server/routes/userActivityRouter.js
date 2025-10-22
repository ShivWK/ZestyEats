const express = require("express");
const userActivityRouter = express.Router();

const {
    checkSessionId,
    protected,
    getUserActivityData,
    setUserCartData,
    setUserFavRestaurantData,
    setUserItemsToBeAddedInCartData,
    setUserRecentLocationData,
    setUserWishListData,
    getLiveSessions,
    logTheUserOut,
    deleteAccount,
    verifyDeleteOtp,
    sendEditOTP,
    updateProfile,
    getUserProfile,
    verifyCredentials,
    getOrders
} = require("../controllers/userActivityControllers");

const {
    setUserAddress,
    getUserAddress,
    updateUserAddress,
    deleteUserAddress,
} = require("./../controllers/addressController")

userActivityRouter.use(checkSessionId);
userActivityRouter.use(protected);

userActivityRouter.route("/userActivityData").get(getUserActivityData);
userActivityRouter.route("/loggedInSession").get(getLiveSessions);
userActivityRouter.route("/userAddress")
    .get(getUserAddress)
    .post(setUserAddress)
    .delete(deleteUserAddress)
    .put(updateUserAddress);

userActivityRouter.route("/deleteAccount/:mode").post(deleteAccount);
userActivityRouter.route("/deleteOTP").post(verifyDeleteOtp);

userActivityRouter.route("/orders").get(getOrders);

userActivityRouter.route("/logout/:mode").post(logTheUserOut);
userActivityRouter.route("/editOTP/:mode/:action").post(sendEditOTP);
userActivityRouter.route("/profile").post(updateProfile).get(getUserProfile);
userActivityRouter.route("/verification/:mode").post(verifyCredentials)

userActivityRouter.route("/userCartData").patch(setUserCartData);
userActivityRouter.route("/userWishListData").patch(setUserWishListData);
userActivityRouter.route("/userFavRestaurantData").patch(setUserFavRestaurantData);
userActivityRouter.route("/userItemsToBeAddedInCartData").patch(setUserItemsToBeAddedInCartData);
userActivityRouter.route("/userRecentLocationData").patch(setUserRecentLocationData);

module.exports = userActivityRouter;