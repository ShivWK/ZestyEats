import { createSelector, createSlice } from "@reduxjs/toolkit";

const cityHomeSlice = createSlice({
    name: "cityHomeSlice",

    initialState: {
        secondaryCity: "bangalore",
        pageOffset: "",
        nextFetch: "",
        isCityPageLoading: false,
        bannerTitle: "",
        foodieThoughtsData: [],
        restaurantChainData: [],
        restaurantChainTitle: "",
        onlineDeliveryRestaurantsData: [],
        onlineDeliveryRestaurantsTitle: "",
        localitiesData: [],
        localitiesTitle: "",
        cityCuisinesData: [],
        cityCuisinesTitle: "",
        restaurantChainInCityData: [],
        restaurantChainInCityTitle: "",
        popularDishInCityData: [],
        popularDishInCityTitle: "",
        cityLat: null,
        cityLng: null,
    },

    reducers: {
        setCityLatAndLng: (state, action) => {
            const {lat, lng} = action.payload.at(-1)?.card?.card;

            state.cityLat = lat;
            state.cityLng = lng;
        },

        setSecondaryCity: (state, action) => {
            state.secondaryCity = action.payload;
        },

        setPageOffset: (state, action) => {
            state.pageOffset = action.payload;
        },

        setNextFetch: (state, action) => {
            state.nextFetch = action.payload;
        },

        setCityPageLoading: (state, action) => {
            state.isCityPageLoading = action.payload;
        },

        setBannerTitle: (state, action) => {
            const cards = action.payload;

            const banner_text =
                cards.find((item) => item?.card?.card?.id === "best_restaurants_header")
                    ?.card?.card?.title || "";

            state.bannerTitle = banner_text;
        },

        setFoodieThoughtsData: (state, action) => {
            const cards = action.payload;

            state.foodieThoughtsData =
                cards?.find((item) => item?.card?.card?.id === "whats_on_your_mind")
                    ?.card?.card?.imageGridCards?.info || [];
        },

        setRestaurantChainData: (state, action) => {
            const cards = action.payload;

            state.restaurantChainData =
                cards?.find((item) => item?.card?.card?.id === "top_brands_for_you")
                    ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            state.restaurantChainTitle = cards?.find(
                (item) => item?.card?.card?.id === "top_brands_for_you"
            )?.card?.card?.header?.title;
        },

        setOnlineDeliveryRestaurantsData: (state, action) => {
            const cards = action.payload;

            state.onlineDeliveryRestaurantsData =
                cards?.find(
                    (item) => item?.card?.card?.id === "restaurant_grid_listing_v2"
                )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            state.onlineDeliveryRestaurantsTitle = cards?.find(
                (item) => item?.card?.card?.id === "popular_restaurants_title"
            )?.card?.card?.title;
        },

        setLocalitiesData: (state, action) => {
            const cards = action.payload;

            state.localitiesData =
                cards?.find((item) => item?.card?.card?.id === "area_list")?.card?.card
                    ?.areas || [];

            state.localitiesTitle = cards?.find(
                (item) => item?.card?.card?.id === "area_list"
            )?.card?.card?.title;
        },

        setCityCuisinesData: (state, action) => {
            const cards = action.payload;

            state.cityCuisinesData =
                cards?.find((item) => item?.card?.card?.id === "cuisines_near_you")
                    ?.card?.card?.cuisines || [];

            state.cityCuisinesTitle = cards?.find(
                (item) => item?.card?.card?.id === "cuisines_near_you"
            )?.card?.card?.title;
        },

        setRestaurantChainInCityData: (state, action) => {
            const cards = action.payload;

            state.restaurantChainInCityData =
                cards?.find((item) => item?.card?.card?.id === "brand_page_links")?.card
                    ?.card?.brands || [];

            state.restaurantChainInCityTitle = cards?.find(
                (item) => item?.card?.card?.id === "brand_page_links"
            )?.card?.card.title;
        },

        setPopularDishInCityData: (state, action) => {
            const cards = action.payload;

            state.popularDishInCityData =
                cards?.find((item) => item?.card?.card?.id === "dish_page_links")?.card
                    ?.card?.brands || [];

            state.popularDishInCityTitle = cards?.find(
                (item) => item?.card?.card?.id === "dish_page_links"
            )?.card?.card?.title;
        },
    },
});

export default cityHomeSlice.reducer;

export const selectSecondaryCity = (state) => state.cityHomeSlice.secondaryCity;

export const selectCityLatAndLng = createSelector([
    (state) => state.cityHomeSlice.cityLat,
    (state) => state.cityHomeSlice.cityLng,
], (lat, lng) => ({ lat, lng }));

export const selectCityLoading = (state) =>
    state.cityHomeSlice.isCityPageLoading;

export const selectMetadata = (state) => ({
    pageOffset: state.cityHomeSlice.pageOffset,
    nextFetch: state.cityHomeSlice.nextFetch,
});

export const selectPageData = createSelector(
    [
        (state) => state.cityHomeSlice.bannerTitle,
        (state) => state.cityHomeSlice.foodieThoughtsData,
        (state) => state.cityHomeSlice.restaurantChainData,
        (state) => state.cityHomeSlice.restaurantChainTitle,
        (state) => state.cityHomeSlice.onlineDeliveryRestaurantsData,
        (state) => state.cityHomeSlice.onlineDeliveryRestaurantsTitle,
        (state) => state.cityHomeSlice.localitiesData,
        (state) => state.cityHomeSlice.localitiesTitle,
        (state) => state.cityHomeSlice.cityCuisinesData,
        (state) => state.cityHomeSlice.cityCuisinesTitle,
        (state) => state.cityHomeSlice.restaurantChainInCityData,
        (state) => state.cityHomeSlice.restaurantChainInCityTitle,
        (state) => state.cityHomeSlice.popularDishInCityData,
        (state) => state.cityHomeSlice.popularDishInCityTitle,
    ],
    (
        cityBannerText,
        cityFoodieData,
        cityRestaurantChainData,
        cityRestaurantChainTitle,
        cityOnlineDeliveryRestaurantData,
        cityOnlineDeliveryRestaurantTitle,
        cityLocalitiesData,
        cityLocalitiesTitle,
        cityCuisinesData,
        cityCuisinesTitle,
        restaurantChainInCityData,
        restaurantChainInCityTitle,
        popularDishInCityData,
        popularDishInCityTitle
    ) => ({
        cityBannerText,
        cityFoodieData,
        cityRestaurantChainData,
        cityRestaurantChainTitle,
        cityOnlineDeliveryRestaurantData,
        cityOnlineDeliveryRestaurantTitle,
        cityLocalitiesData,
        cityLocalitiesTitle,
        cityCuisinesData,
        cityCuisinesTitle,
        restaurantChainInCityData,
        restaurantChainInCityTitle,
        popularDishInCityData,
        popularDishInCityTitle,
    })
);

export const {
    setCityLatAndLng,
    setSecondaryCity,
    setBannerTitle,
    setCityCuisinesData,
    setCityPageLoading,
    setFoodieThoughtsData,
    setLocalitiesData,
    setOnlineDeliveryRestaurantsData,
    setPopularDishInCityData,
    setRestaurantChainData,
    setRestaurantChainInCityData,
    setPageOffset,
    setNextFetch,
} = cityHomeSlice.actions;
