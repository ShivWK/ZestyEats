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
  swiggySsrRestaurantPageHandler
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


module.exports = swiggyRouter;

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Wendy%27s%20Burgers&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=4517eee1-c149-8453-f584-a862ca9a2ff5&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A972%2C%22primaryRestaurantId%22%3A382636%2C%22cloudinaryId%22%3A%22RX_THUMBNAIL%2FIMAGES%2FVENDOR%2F2025%2F1%2F11%2F097020c5-09e8-4430-96fb-77ef985c2935_382636.JPG%22%2C%22brandId%22%3A972%2C%22dishFamilyId%22%3A%22846649%22%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D&selectedPLTab=DISH

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Burger&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=1f5c86db-9c10-9519-9154-c3b22c559b8e&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FBurger.png%22%2C%22dishFamilyId%22%3A%22846649%22%2C%22dishFamilyIds%22%3A%5B%22846649%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D&selectedPLTab=RESTAURANT