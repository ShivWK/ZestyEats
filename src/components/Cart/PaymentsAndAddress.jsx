import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { selectLatAndLng } from "../../features/home/homeSlice";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
import Billing from "./Billing";
import { useSelector, useDispatch } from "react-redux";
import haversineFormula from "./../../utils/haversineFormula";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import { useLazyGetAddressQuery } from "../../features/profile/profileApiSlice";
import AddressEditForm from "../Profile/AddressEditForm";

import {
    setSavedAddress,
    selectSavedAddress,
    selectAddressLoading,
    selectEditAddressModal,
    setEditAddressModal,
    setHideEditAddressModal,
    selectDeliveryAddress,
    selectAddAddressModal,
    setAddAddressModal,
    setDeliveryAddress,
} from "../../features/delivery/deliverySlice";

import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import UserAddress from "../Profile/UserAddress";

const PaymentsAndAddress = () => {
    const shimmerArray = Array.from({ length: 2 });
    const editAddressModal = useSelector(selectEditAddressModal);

    // const deliveryAt = useSelector(selectDeliveryAddress);
    // console.log(deliveryAt);

    const [trigger] = useLazyLocationByCoordinatesQuery();
    const [searchParams] = useSearchParams();
    const [latRestro, lngRestro] = searchParams.get("restroDemographics").split(",")
    const { lat, lng } = useSelector(selectLatAndLng);
    const addAddress = useSelector(selectAddAddressModal);

    const dispatch = useDispatch();
    const [addressLoading, setAddressLoading] = useState(true)
    const [overflowing, setOverflowing] = useState(false);
    const [latDelivery, setLatDelivery] = useState(lat)
    const [lngDelivery, setLngDelivery] = useState(lng);
    const [showDirection, setShowDirection] = useState(false);
    const [isDeliverable, setIsDeliverable] = useState(true);
    
    const [currentLocationLoading, setCurrentLocationLoading] = useState(true);
    const [deliveryToCurrentLocation, setDeliveryToCurrentLocation] = useState(true);

    const savedAddresses = useSelector(selectSavedAddress);
    const [triggerSavedAddress] = useLazyGetAddressQuery();
    const deviceId = useSelector(selectDeviceFingerPrint);
    const storeAddressLoading = useSelector(selectAddressLoading);

    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            const ele = scrollRef.current;
            const overflow = ele.scrollWidth > ele.clientWidth;

            setShowDirection(overflow);
        }
    }, [savedAddresses]);

    useEffect(() => {
        if (navigator.geolocation) {
            let lat = null;
            let lng = null;
            setCurrentLocationLoading(true);

            navigator.geolocation.getCurrentPosition(async (position) => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
            })

            const distance = haversineFormula(latRestro, lat, lngRestro, lng);

            if (distance > 10) {
                setCurrentLocationLoading(false);
                setDeliveryToCurrentLocation(false);
            } else {
                setCurrentLocationLoading(false);
                setDeliveryToCurrentLocation(true);
            }
        }
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const address = await triggerSavedAddress({ deviceId }).unwrap();

                dispatch(setSavedAddress(address.data))
                setAddressLoading(false)
            } catch (err) {
                console.log("Error in fetching address", err);
                setAddressLoading(false)
            }
        }
        fetchAddress()
    }, [])

    useEffect(() => {
        const checkOverflow = () => {
            const htmlELe = document.documentElement;
            const clientHeight = htmlELe.clientHeight;
            const scrollHeight = htmlELe.scrollHeight;

            if (scrollHeight > clientHeight) {
                setOverflowing(true);
            } else {
                setOverflowing(false);
            }
        }

        checkOverflow();

        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [document.documentElement.scrollHeight]);

    useEffect(() => {
        const distance = haversineFormula(latRestro, latDelivery, lngRestro, lngDelivery);

        if (distance > 10) setIsDeliverable(false)
        else setIsDeliverable(true);

    }, [latDelivery, lngDelivery, latRestro, lngRestro]);

    const getCurrentLocation = () => {
        if (!deliveryToCurrentLocation) return
        if (navigator.geolocation) {
            let lat = null;
            let lng = null;
            setCurrentLocationLoading(true);

            navigator.geolocation.getCurrentPosition(async (position) => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;

                setLatDelivery(lat);
                setLngDelivery(lng);

                try {
                    const result = await trigger({
                        lat1: lat,
                        lng1: lng
                    }).unwrap();

                    const mainData = result.data[0].address_components;
                    const deliverAt = {
                        number: mainData[0].long_name,
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
            })
        }
    }

    return <main className={`lg:pt-28 pt-20 w-full min-h-[110%] ${!overflowing && "h-full"} dark:bg-black bg-gray-200`} >
        <div className="w-full flex flex-col max-md:gap-3 md:flex-row justify-between md:max-w-[1070px] max-md:px-1.5 pb-20 mx-auto md:px-3">
            <section className="md:basis-[59%] flex flex-col gap-2 p-2 lg:p-4 dark:bg-gray-300 bg-white rounded">
                <div className=" w-fit mx-auto">
                    <p className="inline font-medium">Delivery Status: </p>
                    {isDeliverable ? (
                        <div className="inline-flex items-center gap-1">
                            <p className="text-green-500 font-medium">
                                Delivering to your area
                            </p>
                            <i className="fas fa-shipping-fast text-black mt-0.5"></i>
                        </div>
                    ) : (
                        <>
                            <p className="text-red-500 font-medium inline leading-4">
                                Not delivering to your current address. Please select different address{" "}
                            </p>
                            <div className="relative inline-flex gap-1.5 items-center">
                                <div id="No delivery" className="relative mt-0.5">
                                    <i className="fas fa-shipping-fast text-black"></i>
                                    <div className="absolute ml-2 rounded bottom-0 h-7 w-0.5 bg-red-500 transform rotate-45"></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800 mt-1">
                    <div className="flex items-center justify-between px-2 py-2 w-full bg-primary dark:bg-darkPrimary">
                        <h2 className="text-white text-lg">SAVED ADDRESS</h2>

                        {(addressLoading || storeAddressLoading) && (
                            <div className="h-6 w-6 border-4 border-t-black border-white animate-spin rounded-full bg-transparent"></div>
                        )}

                        {(showDirection && !addressLoading && !storeAddressLoading)
                            && <i className="ri-arrow-right-double-line text-2xl text-white"></i>}
                    </div>
                    <div ref={scrollRef} className="w-full hide-scrollbar flex flex-nowrap overflow-auto gap-3 h-full p-2">
                        {(addressLoading || storeAddressLoading) ?
                            shimmerArray.map((_, i) => <div key={i} className="flex shrink-0 flex-col gap-2.5 rounded-xl justify-center items-center p-2 border border-gray-400 w-[85%]">
                                <div className="w-[100%] h-4 rounded shimmerBg"></div>
                                <div className="w-[100%] h-4 rounded shimmerBg"></div>
                                <div className="w-[100%] h-4 rounded shimmerBg"></div>
                                <div className="w-[100%] h-4 rounded shimmerBg"></div>
                                <div className="flex self-start gap-2">
                                    <div className="w-18 h-5 rounded shimmerBg"></div>
                                    <div className="w-18 h-5 rounded shimmerBg"></div>
                                </div>
                            </div>)
                            : savedAddresses.map(address => <UserAddress width="w-[90%]" key={address._id} address={address} />)
                        }
                    </div>
                </div>

                <button
                    onClick={() => {
                        dispatch(setAddAddressModal(true));
                        dispatch(setHideEditAddressModal(false));
                        dispatch(setEditAddressModal(true));
                    }}
                    className="bg-primary mx-auto dark:bg-darkPrimary px-3 py-1 rounded-md font-medium text-white block mt-2"
                >
                    Add Address
                </button>

            </section>
            <section className="rounded-md md:basis-[39%] dark:bg-gray-300 bg-white p-2 md:p-5 md:self-start">
                <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                                <i className={`ri-crosshair-2-line text-xl text-gray-500 ${isDeliverable && "group-hover:text-primary"} dark:text-gray-300`}></i>
                                <div>
                                    <p className={`font-medium dark:text-gray-200 ${isDeliverable && "group-hover:text-primary group-active:text-primary"} text-lg select-none`}>
                                        Use my current location
                                    </p>
                                    <p className="text-sm font-semibold select-none text-gray-400 tracking-wide">Using GPS</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="bg-white p-5 w-[86%] mx-auto rounded mb-3">

                    </div> */}
                </div>

                <div className="rounded overflow-hidden mt-4">
                    <div className=" w-fully">
                        <h2 className="text-gray-800 text-xl">Final Billing</h2>
                    </div>
                    <Billing heading={false} checkout={true} latDelivery={latDelivery} lngDelivery={lngDelivery} isDeliverable={isDeliverable} />
                </div>

            </section>
        </div>
        <MobileFooterMenu />
        {(editAddressModal && addAddress) && (
            <div onClick={() => {
                dispatch(setHideEditAddressModal(true));
                dispatch(setAddAddressModal(false));
            }} className="absolute top-0 left-0 h-full w-full bg-black/60 z-50">
                <AddressEditForm forWhat="Add" />
            </div>
        )}
    </main>
}

export default PaymentsAndAddress