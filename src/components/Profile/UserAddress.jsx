import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import { setIsDeliverable } from "../../features/delivery/deliverySlice";
import haversineFormula from "./../../utils/haversineFormula";

import {
    selectEditAddressModal,
    setEditAddressModal,
    setHideEditAddressModal,
    setSavedAddress,
    setAddressLoading,
    setDeliveryAddress,
    selectDeliveryAddress,
    selectAddAddressModal
} from "../../features/delivery/deliverySlice";

import { useSelector, useDispatch } from "react-redux";
import AddressEditForm from "./AddressEditForm";
import { CircleCheckBig, CircleX } from "lucide-react";

const UserAddress = ({ address, width = "w-[85%]", latRestro = null, lngRestro = null }) => {

    const [delLoading, setDelLOading] = useState(false);
    const [isDeliverableCompo, setIsDeliverableCompo] = useState(true);
    const deviceId = useSelector(selectDeviceFingerPrint);
    const dispatch = useDispatch();
    const editAddressModal = useSelector(selectEditAddressModal);
    const deliverAt = useSelector(selectDeliveryAddress);
    const addAddressModal = useSelector(selectAddAddressModal);
    const pathName = useLocation().pathname;
    const addressLat = address.latLong.lat;
    const addressLng = address.latLong.lng;

    console.log("stored", deliverAt);
    console.log("Given", address);

    useEffect(() => {
        // what if address doesn't have latLong

        if (latRestro && lngRestro) {
            if (pathName === "/paymentsAndAddresses") {
                const distance = haversineFormula(latRestro, addressLat, lngRestro, addressLng);

                if (distance <= 10) {
                    dispatch(setIsDeliverable(true));
                    setIsDeliverableCompo(true);
                } else {
                    setIsDeliverableCompo(false);
                }
            }
        }

    }, [latRestro, lngRestro])

    const removeClickHandler = async (id) => {
        setDelLOading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/userAddress`, {
                method: "DELETE",
                headers: {
                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                    "Content-Type": "application/json",
                    "x-user-agent": navigator.userAgent,
                    "x-language": navigator.language,
                    "x-resolution": `${screen.height}x${screen.width}`,
                    "x-device-id": deviceId,
                },
                body: JSON.stringify({ addressId: id }),
                credentials: "include",
            })

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);
            console.log(result.message);

            dispatch(setAddressLoading(true));

            const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/userAddress`, {
                method: "GET",
                headers: {
                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                    "Content-Type": "application/json",
                    "x-user-agent": navigator.userAgent,
                    "x-language": navigator.language,
                    "x-resolution": `${screen.height}x${screen.width}`,
                    "x-device-id": deviceId,
                },
                credentials: "include"
            })

            const addresses = await resp.json();
            if (!resp.ok) throw new Error(addresses.message)

            dispatch(setAddressLoading(false));
            setDelLOading(false);

            console.log("new address", addresses);
            dispatch(setSavedAddress(addresses.data));
        } catch (err) {
            console.log("Error in deleting the address", err);
            setDelLOading(false);
            dispatch(setAddressLoading(false));
            toast.error(err.message);
        }
    }

    const useClickHandler = () => {
        dispatch(setDeliveryAddress(address))
    }

    return <>
        <div
            className={`p-2 shrink-0 self-start rounded-xl bg-gray-100 ${width} lg:w-[55%] dark:bg-gray-300  mx-auto border border-primary`}
        >
            <p className="font-semibold tracking-wide">{address.userName}</p>
            <p className="whitespace-normal">{address.flatNumber}</p>
            <p>{`${address.state}, ${address.pinCode}, ${address.country}.`}</p>
            {address.landmark && <p>Landmark: {address.landmark}</p>}
            <p>{address.userPhone}</p>

            <div className="flex items-center gap-2 text-sm ml-auto mt-2">
                <button onClick={() => {
                    dispatch(setHideEditAddressModal(false));
                    dispatch(setEditAddressModal(true));
                }} className="px-3 py-0.5 text-white font-medium tracking-wide bg-primary dark:bg-darkPrimary rounded active:scale-95 transition-all duration-75 ease-linear">
                    Edit
                </button>
                {pathName === "/paymentsAndAddresses"
                    && (isDeliverableCompo ? (
                        (deliverAt?.latLong?.lat === address?.latLong?.lat && deliverAt?.latLong?.lng === address?.latLong?.lng) ?
                            <div className="flex items-center gap-1">
                                <CircleCheckBig size={16} strokeWidth={3} className="text-lg text-green-500 p-0" />
                                <span className="text-green-500 font-sans text-sm font-semibold tracking-wider">Deliver here</span>
                            </div>
                            : <button onClick={useClickHandler} className="px-3 py-0.5 text-white font-medium tracking-wide bg-primary dark:bg-darkPrimary rounded active:scale-95 transition-all duration-75 ease-linear">
                                Use
                            </button>
                    )
                        : <div className="flex items-center gap-1">
                            <CircleX size={16} strokeWidth={3} className="text-lg text-red-500 p-0" />
                            <span className="text-red-500 font-sans text-sm font-semibold tracking-wider">Not Deliverable</span>
                        </div>
                    )
                }

                {pathName === "/mobileProfileResponse" &&
                    <button onClick={() => removeClickHandler(address._id)} className="flex items-center justify-center w-18 h-6 text-white font-medium tracking-wide bg-primary dark:bg-darkPrimary rounded active:scale-95 transition-all duration-75 ease-linear">
                        {delLoading ? <DotBounceLoader /> : "Remove"}
                    </button>}

            </div>
        </div>
        {(editAddressModal && !addAddressModal) && (
            <div onClick={() => dispatch(setHideEditAddressModal(true))} className="absolute top-0 left-0 h-full w-full bg-black/60 z-50">
                <AddressEditForm data={address} forWhat="edit" />
            </div>
        )}
    </>
}

export default UserAddress;