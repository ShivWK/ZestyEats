import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../features/home/homeSlice";
import { updateHomeRestaurantData } from "../utils/updateHomeData";
import { useLazyGetHomePageDataQuery } from "../features/home/homeApiSlice";

const useFetchHomeData = ({ lat, lng }) => {
    const [ triggerHomeAPI ] = useLazyGetHomePageDataQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                let apiResponse = await triggerHomeAPI({
                    lat,
                    lng,
                }).unwrap();
                if (!apiResponse) return;
                updateHomeRestaurantData(apiResponse, dispatch, lat, lng);
            } catch (err) {
                console.log("Cant fetch home data", err);
                dispatch(setLoading(false));
            }
        }

        fetchData()
    }, [lat, lng, dispatch, triggerHomeAPI])

}

export default useFetchHomeData;

// may need to delete it