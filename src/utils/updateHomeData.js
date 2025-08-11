import {
    addFoodieThoughtsData,
    addTopRestaurantsData,
    addTopRestaurantsTitle,
    addRestaurantsWithOnineDelivery,
    setLoading,
    addOnlineDeliveryTitle,
    addBestNearCuisions,
    addAvailableCities,
    addLatAndLng,
    setUserFriendlyPathHistory,
    setPathHistory,
    setUnserviceable,
} from '../features/home/homeSlice';

import { setDeliveryLat, setDeliveryLng } from '../features/delivery/deliverySlice';

export const updateHomeRestaurantData = async (res, dispatch, lat, lng, userPathHistory, pathHistory) => {
    if (res?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present") {
        alert("We don't server in this location");
    } else {
        localStorage.setItem("HomeAPIData", JSON.stringify(res));
        localStorage.setItem("lat", JSON.stringify(lat));
        localStorage.setItem("lng", JSON.stringify(lng));

        dispatch(setPathHistory(pathHistory));
        dispatch(setUserFriendlyPathHistory(userPathHistory));
        dispatch(addLatAndLng({ lat, lng }));
        dispatch(setDeliveryLat(lat));
        dispatch(setDeliveryLng(lng));
        dispatch(addFoodieThoughtsData(res));
        dispatch(addTopRestaurantsData(res));
        dispatch(addRestaurantsWithOnineDelivery(res));
        dispatch(addTopRestaurantsTitle(res));
        dispatch(setUnserviceable(res));
        dispatch(addOnlineDeliveryTitle(res));
        dispatch(addBestNearCuisions(res));
        dispatch(addAvailableCities(res));
        dispatch(setLoading(false));
    }
};

