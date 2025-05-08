import {
    addApiData,
    addFoodieThoughtsData,
    addTopRestaurantsData,
    addTopRestaurantsTitle,
    setLoading
} from '../features/home/homeSlice';

export const updateHomeRestaurantData = async (res, dispatch) => {
    if (res?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present") {
        alert("We don't server in this location");
    } else {
        localStorage.setItem("HomeAPIData", JSON.stringify(res));

        dispatch(addApiData(res));
        dispatch(addFoodieThoughtsData(res));
        dispatch(addTopRestaurantsData(res));
        dispatch(addTopRestaurantsTitle(res));
        dispatch(setLoading(false));
    }
};

