import SearchContainer from "../SearchContainer";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  
  const crossHandler = () => {
    setSearchTerm('');
  }

  return (
    <SearchContainer
      placeholder={"Search for restaurants and food"}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      crossHandler={crossHandler}
      Child={Outlet}
    />
  );
};

export default Search;

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=26.9124336&lng=75.7872709&str=Burger&trackingId=null&submitAction=SUGGESTION&queryUniqueId=8a00d43e-69d9-fe8f-f165-1334bc249d22&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FBurger.png%22%2C%22dishFamilyId%22%3A%22846649%22%2C%22dishFamilyIds%22%3A%5B%22846649%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Desserts&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0bd63e50-5a5b-ea10-9f38-4f61b4041db8&metaData=%7B%22type%22%3A%22CUISINE%22%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Cuisine%22%7D

// 3: Image Click Url : https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Rolls&trackingId=b3988e37-6215-174a-2625-44876a86072b&submitAction=DEFAULT_SUGGESTION&queryUniqueId=1deefe6b-f96a-5070-65a2-c46143e5dbc6                // Will give you result of the image click

// Search

// Suggestions on search URL : https://www.swiggy.com/dapi/restaurants/search/suggest?lat=12.9628669&lng=77.57750899999999&str=bur&trackingId=null&includeIMItem=true               // Will give you auto suggesstion to choose

// Load more url : https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=bur&trackingId=null&submitAction=DEFAULT_SUGGESTION&queryUniqueId=14731ed6-27b3-ab73-ccc8-2c29158c3c5d        // Will give u more suggextions result

// Restaurants, Dishes

//Dishes
// Click on the suggestion url : https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Burger&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=6aa1610b-fcf3-1c10-607d-d930b7d4d19b&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FBurger.png%22%2C%22dishFamilyId%22%3A%22846649%22%2C%22dishFamilyIds%22%3A%5B%22846649%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D

//Restaurants
// Search suggestion card click will give u 2 options restaurent and dishes, dishes result u will get from above url, but restaurant click will be by url: https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Burger&trackingId=undefined&submitAction=ENTER&queryUniqueId=3dc17217-78c8-d8a9-bf77-059a6a7cef57&selectedPLTab=RESTAURANT
