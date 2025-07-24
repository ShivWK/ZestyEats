import {
    setHideLocationInfoModal,
    setLocationInfoModal,
    selectLocationInfoModal,
    setLocationModal,
} from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetHomePageDataQuery } from "../../features/home/homeApiSlice";
import { setLoading } from "../../features/home/homeSlice";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { updateSearchedCity } from "../../utils/addSearchedCity";
import { useRef, useState } from "react";

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
        // alert(err.error);
    }
};

const LocationInfoModal = () => {
    const dispatch = useDispatch();
    const { hideLocationInfoModal } = useSelector(selectLocationInfoModal);
    const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
    const [shouldOpenLocationModal, setShouldOpenLocationModal] = useState(false);
    const locationInfoModalRef = useRef(null);

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

    const searchClickHandler = (e) => {
        e.stopPropagation();
        setShouldOpenLocationModal(true);
        dispatch(setHideLocationInfoModal(true));
    }

    const runOnAnimationEnd = (e) => {
        const classList = e.target.classList;

        if (classList.contains("hide-locationInfoModal")) {
            dispatch(setLocationInfoModal(false));

            if (classList.contains("open-location-modal")) {
                console.log("true")
                dispatch(setLocationModal(true));
                setShouldOpenLocationModal(false);
            }
        }
    }

    const hideLocationInfoModalHandler = () => dispatch(setHideLocationInfoModal(true));
    const unmountLocationInfoModalHandler = () => dispatch(setLocationInfoModal(false));

    const placeClickHandler = (data) => {
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

    return (
        <div
            onClick={hideLocationInfoModalHandler}
            className="fixed inset-0 bg-black/30 top-0 left-0 w-[100%] h-[100%] z-40"
        >
            <div
                ref={locationInfoModalRef}
                onAnimationEnd={runOnAnimationEnd}
                className={`absolute block left-1/2 transform -translate-x-1/2 font-sans tracking-wide bg-white overflow-hidden rounded-xl w-[90%] lg:w-[30%] ${hideLocationInfoModal
                    ? "hide-locationInfoModal"
                    : "show-locationInfoModal"
                    }
                ${shouldOpenLocationModal && "open-location-modal"}`}
            >
                <div className="bg-primary w-full p-2 text-white font-medium flex items-center justify-between">
                    <p className="leading-5">
                        Location blocked. Tap 'Grant' to get nearby results.
                    </p>
                    <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-medium px-3 py-0.5 rounded active:scale-95 transition-all duration-150 ease-in-out shadow-[0_0_10px_2px_rgba(0,0,0,0.3)]">
                        Grant
                    </button>
                </div>

                {/* default city options */}

                {placeArray.map((data, index) => {
                    return <div
                        key={index}
                        onClick={() => placeClickHandler(data)}
                        className={`group cursor-pointer ${index !== placeArray.length - 1 && "border-b-[1px]"}  border-gray-400 py-2 px-3 md:py-3 md:px-4 w-full`}
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

                <div onClick={searchClickHandler} className="w-full bg-gray-200 py-2 px-3 flex items-center justify-between cursor-pointer">
                    <p className="font-semibold">Search for a city</p>
                    <i className="ri-search-2-line text-xl cursor-pointer"></i>
                </div>
            </div>
        </div>
    );
};
export default LocationInfoModal;



// const getDataFOrCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//         const lat1 = position.coords.latitude;
//         const lng1 = position.coords.longitude;

//         try {
//             const data = await triggerLocationByCoordinates({
//                 lat1,
//                 lng1,
//             }).unwrap();

//             updateCurrentCity(data, dispatch);

//             const lat = data?.data?.[0]?.geometry?.location?.lat;
//             const lng = data?.data?.[0]?.geometry?.location?.lng;

//             try {
//                 const res2 = await triggerHomeAPI({ lat, lng }).unwrap();
//                 updateHomeRestaurantData(res2, dispatch, lat, lng);
//             } catch (err) {
//                 alert(err.message);
//                 fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
//             }
//         } catch (err) {
//             console.log("Error fetching current location data.");
//             dispatch(setLocationInfoModal(true))
//             // fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
//         }
//     },
//         err => {
//             console.log("Some error occurred", err.message);
//             dispatch(setLocationInfoModal(true))
//             // fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
//         },
//         {
//             timeout: 5000, // works when user gaive input to fetch location but api took more than given time
//             enableHighAccuracy: false,
//             maximumAge: 20000
//         }
//     );
// }