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
    setAllDataAtOnce,
    getLiveSessions,
    logTheUserOut,
    getUserPaymentMethods,
    deleteAccount,
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

userActivityRouter.route("/userPaymentMethods").get(getUserPaymentMethods);

userActivityRouter.route("/logout/:mode").post(logTheUserOut);

userActivityRouter.route("/userCartData").patch(setUserCartData);
userActivityRouter.route("/userWishListData").patch(setUserWishListData);
userActivityRouter.route("/userFavRestaurantData").patch(setUserFavRestaurantData);
userActivityRouter.route("/userItemsToBeAddedInCartData").patch(setUserItemsToBeAddedInCartData);
userActivityRouter.route("/userRecentLocationData").patch(setUserRecentLocationData);
userActivityRouter.route("/transfer").patch(setAllDataAtOnce);

module.exports = userActivityRouter;