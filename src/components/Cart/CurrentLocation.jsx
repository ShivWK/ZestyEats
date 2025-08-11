import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryAddress, setDeliveryLat, setDeliveryLng } from "../../features/delivery/deliverySlice";
import haversineFormula from "./../../utils/haversineFormula";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import { selectUserDetails } from "../../features/home/homeSlice";

const CurrentLocation = ({ latRestro, lngRestro }) => {
    const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
    const [deliveryToCurrentLocation, setDeliveryToCurrentLocation] = useState(true);
    const [trigger] = useLazyLocationByCoordinatesQuery();
    const userDetails = useSelector(selectUserDetails);
    const dispatch = useDispatch();

    const getCurrentLatLong = (method) => {
        setCurrentLocationLoading(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (method) method(lat, lng);
        })
    }

    useEffect(() => {
        if (navigator.geolocation) {
            const call = (lat, lng) => {
                const distance = haversineFormula(latRestro, lat, lngRestro, lng);

                if (distance > 10) {
                    setCurrentLocationLoading(false);
                    setDeliveryToCurrentLocation(false);
                } else {
                    setCurrentLocationLoading(false);
                    setDeliveryToCurrentLocation(true);
                }
            }

            getCurrentLatLong(call)
        }
    }, []);

    const getCurrentLocation = () => {
        if (!deliveryToCurrentLocation) return
        if (navigator.geolocation) {
            const call = async (lat, lng) => {
                dispatch(setDeliveryLat(lat));
                dispatch(setDeliveryLng(lng));

                try {
                    const result = await trigger({
                        lat1: lat,
                        lng1: lng
                    }).unwrap();

                    const mainData = result.data[0].address_components;
                    const deliverAt = {
                        userName: userDetails.userName,
                        userPhone: userDetails.userPhone,
                        flatNumber: mainData[0].long_name,
                        locality: mainData[1].long_name,
                        district: mainData[2].long_name,
                        state: mainData[4].long_name,
                        country: mainData[5].long_name,
                        pinCode: mainData[6].long_name,
                    }

                    dispatch(setDeliveryAddress(deliverAt));
                    setCurrentLocationLoading(false);
                } catch (err) {
                    console.log("Error fetching location data. Please try again later.", err);
                    setCurrentLocationLoading(false)
                }
            }

            getCurrentLatLong(call)
        }
    }

    return <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="px-2 py-2 w-full bg-primary dark:bg-darkPrimary">
            <h2 className="text-white text-lg">CURRENT LOCATION</h2>
        </div>
        <div className="w-[90%] mx-auto items-center px-2 py-3 overflow-hidden">
            <div
                onClick={getCurrentLocation}
                className={`relative group border-[1px] dark:border-gray-400 border-black ${deliveryToCurrentLocation && "active:border-primary cursor-pointer"} py-2 px-3 md:py-2 md:px-5`}
            >
                {(!deliveryToCurrentLocation || currentLocationLoading) &&
                    <div className="absolute flex items-center justify-center top-0 left-0 h-full w-full dark:bg-gray-400/60 bg-black/60">
                        {currentLocationLoading ?
                            (<div className="rounded-full border-4 h-7 w-7 border-t-primary border-white animate-spin" />)
                            : (<p className="font-semibold text-white select-none">Not deliverable</p>)}
                    </div>}

                <div className="flex gap-2.5">
                    <i className={`ri-crosshair-2-line text-xl text-gray-500 ${deliveryToCurrentLocation && "group-hover:text-primary"} dark:text-gray-300`}></i>
                    <div>
                        <p className={`font-medium dark:text-gray-200 ${deliveryToCurrentLocation && "group-hover:text-primary group-active:text-primary"} text-lg select-none`}>
                            Use my current location
                        </p>
                        <p className="text-sm font-semibold select-none text-gray-400 tracking-wide">Using GPS</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CurrentLocation;