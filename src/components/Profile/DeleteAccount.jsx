import { useState } from "react";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { setDeleteModalOpen, setHideDeleteModal } from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";

const DeleteAccount = () => {
    const [OTPLoading, setOTPLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deviceId = useSelector(selectDeviceFingerPrint);

    const sendOtpHandler = async () => {
        if (OTPLoading) return;
        setOTPLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/deleteAccount/sendOTP`, {
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
            setOTPLoading(false);
            dispatch(setDeleteModalOpen(true));
        } catch (err) {
            console.log("Error in sending OTP", err);
            toast.error(err.message);

            setOTPLoading(false)
        }
    }

    return <main className="pt-20 lg:pt24 px-1">
        <i onClick={() => navigate(-1)} className="ri-arrow-left-long-fill dark:text-white mb-2 font-semibold"><span className="ml-1 font-sans">Back</span></i>
        <h1 className="dark:text-white text-2xl">Delete Your Account</h1>
        <p className="dark:text-gray-300">We're sorry to see you go. Before we proceed, please review the details below.</p>
        <div className="bg-red-300 dark:bg-[rgb(87,16,16)] dark:text-gray-100 w-[90%] mx-auto rounded-md p-2 text-justify leading-5 my-3">
            <p className="mb-2">Deleting your account will permanently remove all your order history, saved addresses, and preferences</p>
            <p>You will not be able to recover your account once deleted.</p>
        </div>

        <p className="text-center dark:text-gray-300 mt-1">We will send a <span className="dark:text-gray-100 text-black font font-semibold">one-time password (OTP)</span> to your registered email address.</p>
        <p className="text-center dark:text-gray-300 mt-1"><span className="font-semibold dark:text-gray-100 text-black ">Please make sure you have access to your registered email before proceeding.</span>
            You will need to enter this OTP to confirm deletion.</p>

        <button onClick={sendOtpHandler} className="flex items-center justify-center mx-auto rounded-md w-28 h-8 bg-primary text-white dark:bg-darkPrimary text-semibold tracking-wider mt-5 active:scale-95 transform transition-all duration-100 ease-linear">
            {OTPLoading ? <DotBounceLoader /> : "Send OTP"}
        </button>

        <MobileFooterMenu />
    </main>
}

export default DeleteAccount