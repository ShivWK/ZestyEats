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
    setAllDataAtOnce
} = require("../controllers/userActivityControllers");

userActivityRouter.use(checkSessionId);
userActivityRouter.use(protected);

userActivityRouter.route("/userActivityData").get(getUserActivityData);
userActivityRouter.route("/userCartData").post(setUserCartData);
userActivityRouter.route("/userWishListData").post(setUserWishListData);
userActivityRouter.route("/userFavRestaurantData").post(setUserFavRestaurantData);
userActivityRouter.route("/userItemsToBeAddedInCartData").post(setUserItemsToBeAddedInCartData);
userActivityRouter.route("/userRecentLocationData").post(setUserRecentLocationData);
userActivityRouter.route("/transfer").post(setAllDataAtOnce);

module.exports = userActivityRouter;