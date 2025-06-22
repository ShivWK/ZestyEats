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
  searchHomeData,
  specificFoodSearchSuggestions,
  suggestedDataHandler,
  extraSuggestionsData,
  searchOnTabClick,
  swiggySsrRestaurantPageHandler,
  servingCityDataHandler
} = require("./../controllers/swiggyControllers");

swiggyRouter.get("/homepageData", homePageData);
swiggyRouter.get("/place-autocomplete", addressAutoComplete);
swiggyRouter.get("/address-recommend", addressRecommend);
swiggyRouter.get("/address-from-coordinates", addressFromCoordinates);
swiggyRouter.get("/specific-restaurants", specificRestaurantData);
swiggyRouter.get("/food-category", specificFoodCategoryData);
swiggyRouter.get("/dish-search", dishSearchData);
swiggyRouter.get("/search-home-data", searchHomeData);
swiggyRouter.get("/search-food-suggestions", specificFoodSearchSuggestions);
swiggyRouter.get("/extra-suggestions", extraSuggestionsData);
swiggyRouter.get("/suggested-data", suggestedDataHandler);
swiggyRouter.get("/search-tab-data", searchOnTabClick);
swiggyRouter.get("/restaurants-near-me-data", swiggySsrRestaurantPageHandler);
swiggyRouter.get("/data-for-city", servingCityDataHandler);



// https://swiggy-clone-klzu.onrender.com/api/swiggy/restaurants-near-me-data?place=north-indian

module.exports = swiggyRouter;