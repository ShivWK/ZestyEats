import {
    setHideLocationInfoModal,
    setLocationInfoModal,
    selectLocationInfoModal,
    setLocationModal,
    selectLocationInfoModalReason,
    setLocationInfoModalReason,
    selectGrantBtnClicked,
    setGrantBTnClicked,
} from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import { useLazyGetHomePageDataQuery } from "../../features/home/homeApiSlice";
import { setLoading } from "../../features/home/homeSlice";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { updateSearchedCity } from "../../utils/addSearchedCity";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateCurrentCity } from "../../utils/addCurrentCity";

export const fetchDefaultHomeAPIData = async (
    triggerHomeAPI,
    dispatch,
    lat,
    lng
) => {
    try {
        dispatch(setLoading(true));
        let apiResponse = await triggerHomeAPI({
            lat,
            lng,
        }).unwrap();
        if (!apiResponse) return;
        updateHomeRestaurantData(apiResponse, dispatch, lat, lng);
    } catch (err) {
        dispatch(setLoading(false));
    }
};

const LocationInfoModal = () => {
    const dispatch = useDispatch();
    const { hideLocationInfoModal } = useSelector(selectLocationInfoModal);
    const reasonOfOpening = useSelector(selectLocationInfoModalReason);
    const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
    const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();
    const [shouldOpenLocationModal, setShouldOpenLocationModal] = useState(false);
    const [isUserInteracted, setIsUserInteracted] = useState(false)
    const locationInfoModalRef = useRef(null);
    const grantBtnClicked = useSelector(selectGrantBtnClicked);

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

    const permissionGrantHandler = () => {
        setIsUserInteracted(true)
        dispatch(setGrantBTnClicked(true));
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat1 = position.coords.latitude;
            const lng1 = position.coords.longitude;

            try {
                const data = await triggerLocationByCoordinates({
                    lat1,
                    lng1,
                }).unwrap();

                updateCurrentCity(data, dispatch);

                const lat = data?.data?.[0]?.geometry?.location?.lat;
                const lng = data?.data?.[0]?.geometry?.location?.lng;

                try {
                    const res2 = await triggerHomeAPI({ lat, lng }).unwrap();
                    updateHomeRestaurantData(res2, dispatch, lat, lng);
                } catch (err) {
                    console.error("ERROR in fetching data", err);
                    dispatch(setLocationInfoModalReason("error"))
                    dispatch(setLocationInfoModal(true))
                }
            } catch (err) {
                console.log("Error fetching current location data.", err);
                dispatch(setLocationInfoModalReason("error"))
                dispatch(setLocationInfoModal(true))
            }
        },
            err => {
                if (err.code === err.TIMEOUT) {
                    dispatch(setHideLocationInfoModal(false))
                    dispatch(setLocationInfoModalReason("error"))
                    dispatch(setLocationInfoModal(true))
                } else if (err.code === err.PERMISSION_DENIED) {
                    dispatch(setHideLocationInfoModal(false))

                    if (grantBtnClicked) {
                        dispatch(setLocationInfoModalReason("error"));
                        dispatch(setLocationInfoModal(true));
                    } else {
                        dispatch(setLocationInfoModalReason("permission"));
                        dispatch(setLocationInfoModal(true));
                    }
                } else if (err.code === err.POSITION_UNAVAILABLE) {
                    dispatch(setHideLocationInfoModal(false))
                    dispatch(setLocationInfoModalReason("error"))
                    dispatch(setLocationInfoModal(true))
                } else {
                    dispatch(setHideLocationInfoModal(false))
                    dispatch(setLocationInfoModalReason("error"))
                    dispatch(setLocationInfoModal(true))
                }
            },
            {
                timeout: 5000,
                enableHighAccuracy: false,
                maximumAge: 20000
            }
        );
    }

    const searchClickHandler = (e) => {
        setIsUserInteracted(true);

        e.stopPropagation();
        setShouldOpenLocationModal(true);
        dispatch(setHideLocationInfoModal(true));
    }

    const placeClickHandler = (data) => {
        setIsUserInteracted(true);

        const location = {
            terms: [
                { value: data.city },
                { value: data.location.split(", ")[0] },
                { value: data.location.split(", ")[1] }
            ]
        }

        updateSearchedCity(location, dispatch);
        fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, data.lat, data.lng)
    }

    const runOnAnimationEnd = (e) => {
        const classList = e.target.classList;

        if (classList.contains("hide-locationInfoModal")) {
            dispatch(setLocationInfoModal(false));

            if (classList.contains("open-location-modal")) {
                dispatch(setLocationModal(true));
                setShouldOpenLocationModal(false);
            }

            if (!isUserInteracted) {
                toast.info("No location selected. Showing restaurants in Bangalore by default.", {
                    autoClose: 2000,
                    style: {
                        backgroundColor: "#ff5200",
                        fontWeight: "semibold",
                        color: "white",
                    },
                    progressClassName: "progress-style",
                })
                placeClickHandler(placeArray[1]);
            }
        }
    }

    const hideLocationInfoModalHandler = () => dispatch(setHideLocationInfoModal(true));

    return (
        <div
            onClick={hideLocationInfoModalHandler}
            className="fixed inset-0 bg-black/30 top-0 left-0 w-[100%] h-[100%] z-40"
        >
            <div
                ref={locationInfoModalRef}
                role="dialog"
                aria-modal={true}
                onAnimationEnd={runOnAnimationEnd}
                className={`absolute block left-1/2 transform -translate-x-1/2 font-sans tracking-wide dark:bg-transparent bg-white overflow-hidden rounded-xl w-[90%] lg:w-[30%] ${hideLocationInfoModal
                    ? "hide-locationInfoModal"
                    : "show-locationInfoModal"
                    }
                ${shouldOpenLocationModal && "open-location-modal"}`}
            >
                <div className="bg-primary dark:bg-darkPrimary w-full p-2 text-white font-medium flex items-center justify-between">
                    <p className="leading-5">
                        {reasonOfOpening === "permission" ? "Location blocked. Tap 'Grant' to get nearby results." : "Location unavailable. Choose a city below or search to see results"}
                    </p>
                    {reasonOfOpening === "permission"
                        && <button onClick={permissionGrantHandler} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium px-3 py-0.5 rounded active:scale-95 transition-all duration-150 ease-in-out shadow-[0_0_10px_2px_rgba(0,0,0,0.3)]">
                            Grant
                        </button>}
                </div>

                {/* default city options */}

                {placeArray.map((data, index) => {
                    return <div
                        key={index}
                        onClick={() => placeClickHandler(data)}
                        className={`group cursor-pointer ${index !== placeArray.length - 1 && "border-b-[1px]"} dark:bg-gray-300 dark:border-gray-800 border-gray-400 py-2 px-3 md:py-3 md:px-4 w-full`}
                    >
                        <div className="flex gap-2.5 relative w-full items-center">
                            <i className={`ri-map-pin-line text-xl dark:text-gray-950 text-gray-500`}></i>
                            <div className="w-full flex items-center gap-1.5">
                                <p className="font-medium dark:text-gray-950 group-hover:text-primary group-active:text-primary dark:group-active:text-darkPrimary dark:group-hover:text-red-500 line-clamp-2 break-words leading-5">
                                    {data.city}
                                </p>
                                <span className="text-black font-medium">┃</span>
                                <p className="text-sm dark:text-gray-800 font-medium tracking-wide text-gray-500 truncate">
                                    {data.location + "."}
                                </p>
                            </div>
                        </div>
                    </div>
                })}

                {/* Search city */}

                <div onClick={searchClickHandler} className="w-full dark:bg-gray-800 dark:text-gray-200 bg-gray-200 py-2 px-3 flex items-center justify-between cursor-pointer">
                    <p className="font-semibold">Search for a city</p>
                    <i className="ri-search-2-line text-xl cursor-pointer"></i>
                </div>
            </div>
        </div>
    );
};
export default LocationInfoModal;
