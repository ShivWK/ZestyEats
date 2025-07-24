import {
    setHideLocationInfoModal,
    setLocationInfoModal,
    selectLocationInfoModal,
} from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetHomePageDataQuery } from "../../features/home/homeApiSlice";
import { setLoading } from "../../features/home/homeSlice";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";

export const fetchDefaultHomeAPIData = async (
    triggerHomeAPI,
    dispatch,
    lat,
    lng
) => {
    try {
        let apiResponse = await triggerHomeAPI({
            lat,
            lng,
        }).unwrap();
        if (!apiResponse) return;
        updateHomeRestaurantData(apiResponse, dispatch, lat, lng);
    } catch (err) {
        dispatch(setLoading(false));
        // alert(err.error);
    }
};

const LocationInfoModal = () => {
    const dispatch = useDispatch();
    const { hideLocationInfoModal } = useSelector(selectLocationInfoModal);
    const [triggerHomeAPI] = useLazyGetHomePageDataQuery();

    const placeArray = [
        {
            city: "Delhi",
            location: "India",
            lat: 28.7040592,
            lng: 77.10249019999999
        },
        {
            city: "Bangalore",
            location: "Karnataka, India",
            lat: 12.9628669,
            lng: 77.57750899999999
        },
        {
            city: "Mumbai",
            location: "Maharashtra, India",
            lat: 18.9581934,
            lng: 72.8320729
        }
    ]

    const hideLocationInfoModalHandler = () =>
        dispatch(setHideLocationInfoModal(true));
    const unmountLocationInfoModalHandler = () =>
        dispatch(setLocationInfoModal(false));

    return (
        <div
            onClick={hideLocationInfoModalHandler}
            className="fixed inset-0 bg-black/30 top-0 left-0 w-[100%] h-[100%] z-40"
        >
            <div
                onAnimationEnd={unmountLocationInfoModalHandler}
                className={`absolute block left-1/2 transform -translate-x-1/2 font-sans tracking-wide bg-white overflow-hidden rounded-xl w-[90%] lg:w-[30%] ${hideLocationInfoModal
                    ? "hide-locationInfoModal"
                    : "show-locationInfoModal"
                    }`}
            >
                <div className="bg-primary w-full p-2 text-white font-medium flex items-center justify-between">
                    <p className="leading-5">
                        Location blocked. Enable to see nearby results.
                    </p>
                    <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium px-3 py-0.5 rounded active:scale-95 transition-all duration-150 ease-in-out">
                        Grant
                    </button>
                </div>

                {/* default city options */}

                {placeArray.map((data, index) => {
                    return <div
                        key={index}
                        onClick={() => {
                            // handleClick(item);
                        }}
                        className="group cursor-pointer not-last:border-b-[1px] border-gray-400 py-2 px-3 md:py-3 md:px-4 w-full"
                    >
                        <div className="flex gap-2.5 relative w-full items-center">
                            <i className={`ri-map-pin-line text-xl text-gray-500`}></i>
                            <div className="w-full flex items-center gap-1.5">
                                <p className="font-medium group-hover:text-primary group-active:text-primary line-clamp-2 break-words leading-5">
                                    {data.city}
                                </p>
                                <span className="text-black font-medium">┃</span>
                                <p className="text-sm font-medium tracking-wide text-gray-500 truncate">
                                    {data.location + "."}
                                </p>
                            </div>
                        </div>
                    </div>
                })}

                {/* Search city */}

                <div className="w-full bg-gray-200 py-2 px-3 flex items-center justify-between">
                    <p className="font-semibold">Search for a city</p>
                    <i className="ri-search-2-line text-xl cursor-pointer"></i>
                </div>
            </div>
        </div>
    );
};
export default LocationInfoModal;
