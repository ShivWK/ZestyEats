import { createSelector, createSlice } from "@reduxjs/toolkit";
import { recentLocationModifier } from "../../utils/guestSessionDataModifier";

const initialState = {
  lat: 12.9715987,
  lng: 77.5945627,
  city: "",
  isUnserviceable: false,
  foodieThoughtsData: [],
  topRestaurantsData: [],
  recentLocations: [],
  bestNearCuisions: [],
  restaurantsWithOnlineDelivery: [],
  yourCurrentCity: "",
  searchedCity: "Bangalore",
  searchedCityAddress: ", Karnataka, India",
  topRestaurantsTitle: "Top restaurant chains in Bangalore",
  onlineDeliveryTitle: "Restaurants with online food delivery in Bangalore",
  isLoading: true,
  isOnline: true,
  availableInCities: [],
  pathHistory: [],
  userFriendlyPathHistory: [],
  dbModelOpen: false,
  dpModelHide: false,
  showBottomMenu: true,
  currentTheme:"system",
  deviceFingerprint: null,
  user: {}
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },

    setDeviceFingerPrint: (state, action) => {
      state.deviceFingerprint = action.payload;
    },

    setCurrentTheme: (state, action) => {
      state.currentTheme = action.payload;

      localStorage.setItem("theme", state.currentTheme);
    },

    addLatAndLng: (state, action) => {
      const { lat, lng } = action.payload;

      state.lat = lat;
      state.lng = lng;
    },

    setShowBottomMenu: (state, action) => {
      state.showBottomMenu = action.payload;
    },

    setPathHistory: (state, action) => {
      const newPath = action.payload;
      const existingIndex = state.pathHistory.indexOf(newPath);

      if (existingIndex !== -1) {
        state.pathHistory = state.pathHistory.slice(0, existingIndex + 1);
      } else if (Array.isArray(action.payload)) {
        state.pathHistory = action.payload;
      } else if (!newPath) {
        return;
      } else {
        state.pathHistory.push(newPath);
      }

      const storedPath = JSON.parse(localStorage.getItem("pathHistory")) || [];
      if (action.payload !== storedPath.at(-1) && action.payload) {
        localStorage.setItem("pathHistory", JSON.stringify(state.pathHistory));
      }
    },

    setUserFriendlyPathHistory: (state, action) => {
      localStorage.setItem(
        "userFriendlyPathHistory",
        JSON.stringify(action.payload)
      );
      state.userFriendlyPathHistory = action.payload;
    },

    setUnserviceable: (state, action) => {
      const result = action.payload?.data?.cards?.find(
        (item) => item?.card?.card?.id === "swiggy_not_present"
      );

      if (result) {
        state.isUnserviceable = true;
        state.isLoading = false;
      } else {
        state.isUnserviceable = false;
      }
    },

    addFoodieThoughtsData: (state, action) => {
      const result =
        action.payload?.data?.cards?.find(
          (item) => item?.card?.card?.id === "whats_on_your_mind"
        )?.card?.card?.imageGridCards?.info || [];

      state.foodieThoughtsData = result;
    },

    addTopRestaurantsData: (state, action) => {
      const result =
        action.payload?.data?.cards?.find(
          (item) => item?.card?.card?.id === "top_brands_for_you"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      state.topRestaurantsData = result;
    },

    addRestaurantsWithOnineDelivery: (state, action) => {
      const result =
        action.payload?.data?.cards?.find(
          (item) => item?.card?.card?.id === "restaurant_grid_listing_v2"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      state.restaurantsWithOnlineDelivery = result;
    },

    addBestNearCuisions: (state, action) => {
      const result =
        action.payload?.data?.cards?.find(
          (item) => item?.card?.card?.title === "Best Cuisines Near Me"
        )?.card?.card?.brands || [];

      state.bestNearCuisions = result;
    },

    addAvailableCities: (state, action) => {
      const result =
        action.payload?.data?.cards?.find(
          (item) =>
            item?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.seo.widgets.v1.FooterContent"
        )?.card?.card?.cities || [];

      state.availableInCities = result;
    },

    addTopRestaurantsTitle: (state, action) => {
      const title = action.payload?.data?.cards?.find(
        (item) => item?.card?.card?.id === "top_brands_for_you"
      )?.card?.card?.header?.title;

      state.topRestaurantsTitle = title;
      state.city = title?.split(" ").at(-1);
    },

    addSearchedCity: (state, action) => {
      state.searchedCity = action.payload;
    },

    addOnlineDeliveryTitle: (state, action) => {
      const title = action.payload.data.cards.find((item) => {
        return item?.card?.card?.id === "popular_restaurants_title";
      })?.card?.card?.title;
      state.onlineDeliveryTitle = title;

      state.city = title?.split(" ").at(-1);
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
      const newItem = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const combine = [...newItem, ...state.recentLocations].reduce(
        (acc, item) => {
          if (!acc.some((element) => element.place_id === item.place_id)) {
            acc.push(item);
          }
          return acc;
        },
        []
      );

      state.recentLocations = combine;
      recentLocationModifier(state.recentLocations);
    },

    removeARecentLocation: (state, action) => {
      state.recentLocations.splice(action.payload, 1);

      recentLocationModifier(state.recentLocations);
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setOnline: (state, action) => {
      state.isOnline = action.payload;
    },

    setDpModelOpen: (state, action) => {
      state.dbModelOpen = action.payload;
    },

    setDpModelHide: (state, action) => {
      state.dpModelHide = action.payload;
    },
  },
});

export default homeSlice.reducer;

export const selectDeviceFingerPrint = (state) => state.home.deviceFingerprint;
export const selectUserDetails = (state) => state.home.user;
export const selectCurrentTheme = (state) => state.home.currentTheme;
export const selectFoodieThoughtsData = (state) =>
  state.home.foodieThoughtsData;
export const selectTopRestaurantsTitle = (state) =>
  state.home.topRestaurantsTitle;
export const selectTopRestaurantsData = (state) =>
  state.home.topRestaurantsData;
export const selectYourCurrentCity = (state) => state.home.yourCurrentCity;
export const selectSearchedCity = (state) => state.home.searchedCity;
export const selectSearchedCityAddress = (state) =>
  state.home.searchedCityAddress;
export const selectIsLoading = (state) => state.home.isLoading;
export const selectRecentLocations = (state) => state.home.recentLocations;
export const selectOnlineDeliveryRestaurants = (state) =>
  state.home.restaurantsWithOnlineDelivery;
export const selectOnlineDeliveryTitle = (state) =>
  state.home.onlineDeliveryTitle;
export const selectBestCuisionsNearMe = (state) => state.home.bestNearCuisions;
export const selectOnlineStatus = (state) => state.home.isOnline;
export const selectAvailableCities = (state) => state.home.availableInCities;
export const selectPathHistory = (state) => state.home.pathHistory;
export const selectUserFriendlyPathHistory = (state) =>
  state.home.userFriendlyPathHistory;
export const selectLatAndLng = createSelector(
  [(state) => state.home.lat, (state) => state.home.lng],
  (lat, lng) => ({ lat, lng })
);
export const selectCity = (state) => state.home.city;
export const selectDpModel = (state) => state.home.dbModelOpen;
export const selectBottomMenu = (state) => state.home.showBottomMenu;
export const selectDpModelHide = (state) => state.home.dpModelHide;
export const selectIsServiceable = (state) => state.home.isUnserviceable;

export const {
  setUserDetails,
  setCurrentTheme,
  setUnserviceable,
  addFoodieThoughtsData,
  addTopRestaurantsData,
  addSearchedCity,
  addSearchedCityAddress,
  addYourCurrentCity,
  removeYourCurrentCity,
  addTopRestaurantsTitle,
  addRecentLocations,
  setLoading,
  removeARecentLocation,
  addRestaurantsWithOnineDelivery,
  addOnlineDeliveryTitle,
  addBestNearCuisions,
  addBestPlacesToEat,
  addNearByRestaurants,
  setOnline,
  addAvailableCities,
  addLatAndLng,
  setPathHistory,
  setUserFriendlyPathHistory,
  setDpModelOpen,
  setShowBottomMenu,
  setDpModelHide,
  setDeviceFingerPrint
} = homeSlice.actions;
