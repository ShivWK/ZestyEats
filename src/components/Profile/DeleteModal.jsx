import { selectUserDetails } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectDeleteModal, setDeleteModalOpen, setHideDeleteModal } from "../../features/Login/loginSlice";
import { setIsLoggedIn } from "../../features/Login/loginSlice";
import { setIsLoggedInHome } from "../../features/home/homeSlice";

import {
    setIsLoggedInRestro,
    setItemToCart,
    toggleItemsToBeAddedInCart,
    setFavoriteRestro,
    addToWishlistItem
} from "../../features/home/restaurantsSlice";

import { addRecentLocations } from "../../features/home/homeSlice";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import { useState } from "react";
import DotBounceLoader from "../../utils/DotBounceLoader";
import OtpEntry from "./OtpEntry";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import cleanOnLogout from "../../utils/logoutCleaner";

const DeleteModal = () => {
    const deviceId = useSelector(selectDeviceFingerPrint);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [otp, setOtp] = useState([]);
    const navigate = useNavigate();

    const { hideDeleteModal } = useSelector(selectDeleteModal);
    const dispatch = useDispatch();

    const { userEmail } = useSelector(selectUserDetails);

    const email = `${userEmail.slice(0, 2)}●●●●●●${userEmail.slice(10)}`

    const animationEndHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-hideDeleteModal")) {
            dispatch(setDeleteModalOpen(false));
            dispatch(setHideDeleteModal(false));
        }
    }

    const verifyClickHandler = async (e) => {
        e.stopPropagation();

        setVerifyLoading(true)
        const OTP = otp.join("");

        try {
            const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/deleteOTP`, {
                method: "POST",

                headers: {
                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                    "Content-Type": "application/json",
                    "x-user-agent": navigator.userAgent,
                    "x-language": navigator.language,
                    "x-resolution": `${screen.height}x${screen.width}`,
                    "x-device-id": deviceId,
                },

                body: JSON.stringify({
                    otp: OTP,
                    email: userEmail,
                }),

                credentials: "include"
            })

            const result = await resp.json();
            if (!resp.ok) throw new Error(result.message);

            setVerified(true);
            setDeleteAccount(true);
            setVerifyLoading(false);
        } catch (err) {
            console.log("Error in verifying OTP", err);
            toast.error(err.message);

            setVerifyLoading(false);
        }
    }

    const deleteHandler = async (e) => {
        e.stopPropagation();
        setDeleteLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/deleteAccount/deleteAccount`, {
                method: "POST",
                headers: {
                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                    "Content-Type": "application/json",
                    "x-user-agent": navigator.userAgent,
                    "x-language": navigator.language,
                    "x-resolution": `${screen.height}x${screen.width}`,
                    "x-device-id": deviceId,
                },
                credentials: "include"
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            console.log(data.message);
            setDeleteLoading(false);
            dispatch(setHideDeleteModal(true));
            navigate("/");
            dispatch(setIsLoggedIn(false));
            dispatch(setIsLoggedInHome(false));
            dispatch(setIsLoggedInRestro(false));
            localStorage.setItem("auth", "false");
            cleanOnLogout({
                dispatch,
                setItemToCart,
                toggleItemsToBeAddedInCart,
                setFavoriteRestro,
                addRecentLocations,
                addToWishlistItem
            })
        } catch (err) {
            console.log("Error in sending OTP", err);
            toast.error(err.message);

            setOTPLoading(false)
        }
    }

    return <div onClick={() => {
        dispatch(setHideDeleteModal(true));
    }} className="absolute top-0 left-0 h-full w-full z-60 bg-black/60 flex items-center justify-center">
        <div onAnimationEnd={animationEndHandler} className={`p-3 bg-white dark:bg-gray-800 ${!hideDeleteModal ? "animate-showDeleteModal" : "animate-hideDeleteModal"} w-[80%] lg:w-[25%] rounded-md`}>
            <p className="text-black dark:text-gray-200 text-center">{`OTP is sent to your email ${email}`}</p>

            <OtpEntry setOtp={setOtp} verify={verified} count={6} />


            <div >
                {deleteAccount && <p className="dark:text-gray-200 text-center">OTP verified ✅
                    Are you sure? This action cannot be undone.</p>}
                <div className="flex items-center justify-between mt-1.5">
                    <button
                        className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-100 ease-linear">
                        Cancel
                    </button>

                    {deleteAccount ? <button
                        onClick={deleteHandler}
                        className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-100 ease-linear">
                        {deleteLoading ? <DotBounceLoader /> : "Delete"}
                    </button>

                        : <button
                            onClick={verifyClickHandler}
                            className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-100 ease-linear">
                            {verifyLoading ? <DotBounceLoader /> : "Verify"}
                        </button>}
                </div>
            </div>
        </div>
    </div>
}

export default DeleteModal;