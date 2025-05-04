import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiData : null,
    foodieThoughtsData : [],
    topRestaurantsData : [],
    yourCurrentCity: "",
    searchedCity:"",
    searchedCityAddress: "",
    topRestaurantsTitle: "Top restaurant chains in your location",
}

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers : {
        addApiData: (state, action) => {
            state.apiData = action.payload;
        },

        addFoodieThoughtsData: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.id === "whats_on_your_mind"
            )
            ?.card?.card?.imageGridCards?.info || [];

            state.foodieThoughtsData = result;
        },

        addTopRestaurantsData: (state, action) => {
            const result = action.payload?.data?.cards?.find(
                item => item?.card?.card?.id === "top_brands_for_you"
             )
             ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            state.topRestaurantsData = result;
        },

        addSearchedCity: (state, action) => {
            if( typeof action.payload !== "object" || action.payload === null) {
                // we are checking for null because type of null is alos object
                state.searchedCity = action.payload;
            } else {
                const city = action.payload?.data?.cards?.find(
                    item => item?.card?.card?.id === "top_brands_for_you"
                 )
                 ?.card?.card?.header?.title || "your location";

                 state.searchedCity = city; 
            }

        },

        addTopRestaurantsTitle : (state, action) => {
            const title = action.payload?.data?.data?.cards?.find(
                item => item?.card?.card?.id === "top_brands_for_you"
             )
             ?.card?.card?.header?.title;
             
             state.topRestaurantsTitle = title; 
        },

        addSearchedCityAddress: (state, action) => {
            state.searchedCityAddress = action.payload;
        },

        addYourCurrentCity: (state, action) => {
            state.yourCurrentCity = action.payload;
        },

        removeYourCurrentCity: (state) => {
            state.yourCurrentCity = "";
        }
    }
});

export default homeSlice.reducer;
export const selectApiData = state => state.home.apiData;
export const selectFoodieThoughtsData = state => state.home.foodieThoughtsData;
export const selectTopRestaurantsTitle = state => state.home.topRestaurantsTitle; 
export const selectTopRestaurantsData = state => state.home.topRestaurantsData; 
export const selectYourCurrentCity = state => state.home.yourCurrentCity; 
export const selectSearchedCity = state => state.home.searchedCity; 
export const selectSearchedCityAddress = state => state.home.searchedCityAddress; 

export const { 
    addApiData, 
    addFoodieThoughtsData, 
    addTopRestaurantsData,
    addSearchedCity,
    addSearchedCityAddress,
    addYourCurrentCity,
    removeYourCurrentCity,
    addTopRestaurantsTitle,
} = homeSlice.actions;


