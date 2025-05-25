import {
    addFoodieThoughtsData,
    addTopRestaurantsData,
    addTopRestaurantsTitle,
    addRestaurantsWithOnineDelivery,
    setLoading,
    addOnlineDeliveryTitle,
    addBestPlacesToEat,
    addBestNearCuisions,
    addNearByRestaurants,
    addAvailableCities,
    addLatAndLng,
} from '../features/home/homeSlice';

export const updateHomeRestaurantData = async (res, dispatch, lat, lng) => {
    if (res?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present") {
        alert("We don't server in this location");
    } else {
        localStorage.setItem("HomeAPIData", JSON.stringify(res));
        localStorage.setItem("lat", JSON.stringify(lat));
        localStorage.setItem("lng", JSON.stringify(lng));

        dispatch(addLatAndLng({lat, lng}));
        dispatch(addFoodieThoughtsData(res));
        dispatch(addTopRestaurantsData(res));
        dispatch(addRestaurantsWithOnineDelivery(res));
        dispatch(addTopRestaurantsTitle(res));
        dispatch(addOnlineDeliveryTitle(res));
        dispatch(addBestPlacesToEat(res));
        dispatch(addBestNearCuisions(res));
        dispatch(addNearByRestaurants(res));
        dispatch(addAvailableCities(res));
        dispatch(setLoading(false));
    }
};

