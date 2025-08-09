import { useLocation } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";

const UserAddress = ({ address }) => {
    const [ delLoading, setDelLOading ] = useState(false);
    const deviceId = useSelector(selectDeviceFingerPrint);

    const removeClickHandler = async (id) => {
        // console.log(id) 
        // return
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

            const result  = await res.json();

            if (!res.ok) throw new Error(result.message);
            setDelLOading(false);
            console.log(result.message)
        } catch (err) {
            console.log("Error in deleting the address", err);
            setDelLOading(false);
            toast.error(err.message);
        }
    }

    const pathName = useLocation().pathname;

    return <div
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-300 w-[85%] mx-auto border border-primary"
    >
        <p className="font-semibold tracking-wide">{address.userName}</p>
        <p className="whitespace-normal">{address.flatNumber}</p>
        <p>{`${address.state}, ${address.pinCode}, ${address.country}.`}</p>
        {address.landmark && <p>Landmark: {address.landmark}</p>}
        <p>{address.userPhone}</p>

        <div className="flex items-center gap-2 text-sm ml-auto mt-2">
            <button className="px-3 py-0.5 text-white font-medium tracking-wide bg-primary dark:bg-darkPrimary rounded active:scale-95 transition-all duration-75 ease-linear">
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
}

export default UserAddress;