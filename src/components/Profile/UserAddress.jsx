import { useLocation } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";

import {
    selectEditAddressModal,
    setEditAddressModal,
    setHideEditAddressModal,
    setSavedAddress,
    setAddressLoading,
} from "../../features/delivery/deliverySlice";

import { useSelector, useDispatch } from "react-redux";
import AddressEditForm from "./AddressEditForm";

const UserAddress = ({ address, key }) => {
    const [delLoading, setDelLOading] = useState(false);
    const deviceId = useSelector(selectDeviceFingerPrint);
    const dispatch = useDispatch();
    const editAddressModal = useSelector(selectEditAddressModal);

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

    const pathName = useLocation().pathname;

    return <>
        <div
            key={key}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-300 w-[85%] mx-auto border border-primary"
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
                {pathName !== "/mobileProfileResponse" && <button className="px-3 py-0.5 text-white font-medium tracking-wide bg-primary dark:bg-darkPrimary rounded active:scale-95 transition-all duration-75 ease-linear">
                    Use
                </button>}

                {pathName === "/mobileProfileResponse" &&
                    <button onClick={() => removeClickHandler(address._id)} className="flex items-center justify-center w-18 h-6 text-white font-medium tracking-wide bg-primary dark:bg-darkPrimary rounded active:scale-95 transition-all duration-75 ease-linear">
                        {delLoading ? <DotBounceLoader /> : "Remove"}
                    </button>}
            </div>
        </div>
        {editAddressModal && (
            <div onClick={() => dispatch(setHideEditAddressModal(true))} className="absolute top-0 left-0 h-full w-full bg-black/70 z-50">
                <AddressEditForm data={address} />
            </div>
        )}
    </>
}

export default UserAddress;