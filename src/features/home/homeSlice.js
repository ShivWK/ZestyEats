import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiData : null,
    foodieThoughtsData : [],
    topRestaurantsData : [],
    yourCurrentCity: "",
    searchedCity:"",
    searchedCityAddress: "",
    topRestaurantsTitle: "Top restaurant chains in your location",
    isLoading: false,
    recentLocations: [],
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
            const title = action.payload?.data?.cards?.find(
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
        },

        addRecentLocations: (state, action) => {
            const newItem = Array.isArray(action.payload) ?  action.payload : [action.payload];

            const combine = [...newItem, ...state.recentLocations].reduce((acc, item) => {
                if (!acc.some(element => element.place_id === item.place_id)) {
                    acc.push(item);
                }

                return acc
            }, [])

            state.recentLocations = combine;
        },

        removeARecentLocation: (state, action) => {
            state.recentLocations.splice(action.payload, 1);
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
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
export const selectIsLoading = state => state.home.isLoading;
export const selectRecentLocations = state => state.home.recentLocations;

export const { 
    addApiData, 
    addFoodieThoughtsData, 
    addTopRestaurantsData,
    addSearchedCity,
    addSearchedCityAddress,
    addYourCurrentCity,
    removeYourCurrentCity,
    addTopRestaurantsTitle,
    addRecentLocations,
    setLoading,
    removeARecentLocation
} = homeSlice.actions;


