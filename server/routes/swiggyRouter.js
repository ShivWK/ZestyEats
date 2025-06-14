const express = require("express");
const swiggyRouter = express.Router();

const {
  homePageData,
  addressAutoComplete,
  addressRecommend,
  addressFromCoordinates,
  specificFoodCategoryData,
  specificRestaurantData,
  dishSearchData,
} = require("./../controllers/swiggyControllers");

swiggyRouter.get("/homepageData", homePageData);
swiggyRouter.get("/place-autocomplete", addressAutoComplete);
swiggyRouter.get("/address-recommend", addressRecommend);
swiggyRouter.get("/address-from-coordinates", addressFromCoordinates);
swiggyRouter.get("/specific-restaurants", specificRestaurantData);
swiggyRouter.get("/food-category", specificFoodCategoryData);
swiggyRouter.get("/dish-search", dishSearchData)

module.exports = swiggyRouter;