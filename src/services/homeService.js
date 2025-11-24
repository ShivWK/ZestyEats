import { setLoading } from "../features/Login/loginSlice";
import { updateHomeRestaurantData } from "../utils/updateHomeData";

const fetchHomeData = async ( triggerHome, dispatch, lat, lng, finallyCode = null ) => {
    try {
        dispatch(setLoading(true));
        let apiResponse = await triggerHome({
            lat,
            lng,
        }).unwrap();
        if (!apiResponse) return;
        updateHomeRestaurantData(apiResponse, dispatch, lat, lng);
    } catch (err) {
        console.log("Failed to fetch home data", err)
        dispatch(setLoading(false));
    } finally {
        if (finallyCode) {
            finallyCode()
        }
    }
};

export default fetchHomeData;
