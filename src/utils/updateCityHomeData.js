import {
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
    setNextFetch
} from "../features/cityHome/cityHomeSlice";

const updateCityHomeData = (data, dispatch) => {
    if (!data) return;
    // console.log("City home data", data)
    localStorage.setItem("CityHomeData", JSON.stringify(data));

    const mainData = data?.props?.pageProps?.widgetResponse?.success;
    const pageOffset = mainData?.pageOffset?.nextOffset;
    const nextFetch = mainData?.nextFetch;
    const cards = mainData?.cards;

    dispatch(setPageOffset(pageOffset)),
    dispatch(setNextFetch(nextFetch));
    dispatch(setBannerTitle(cards));
    dispatch(setFoodieThoughtsData(cards));
    dispatch(setRestaurantChainData(cards));
    dispatch(setOnlineDeliveryRestaurantsData(cards));
    dispatch(setLocalitiesData(cards));
    dispatch(setCityCuisinesData(cards));
    dispatch(setRestaurantChainInCityData(cards));
    dispatch(setPopularDishInCityData(cards));
    dispatch(setCityPageLoading(false));
}

export default updateCityHomeData;