import { selectToEdit, setAppLoading, setHideEditModal } from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails, selectDeviceFingerPrint, setUserDetails } from "../../features/home/homeSlice";
import OtpEntry from "./OtpEntry";
import { useState } from "react";
import DotBounceLoader from "../../utils/DotBounceLoader";
import OtpCounter from "./OtpCounter";

const Verification = () => {
    const type = useSelector(selectToEdit);
    const userDetails = useSelector(selectUserDetails);
    const deviceId = useSelector(selectDeviceFingerPrint);
    const [disableVerify, setDisableVerify] = useState(false);
    const [sendOtpLoading, setSendOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const [warning, setWarning] = useState("");
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();

    const title = type === "phone" ? "Verify your phone number" : "Verify your email";
    const sendTo = type === "email" ? userDetails.userEmail : userDetails.userPhone;

    const sendClickHandle = async () => {
        if (sendOtpLoading) return;
        setSendOtpLoading(true);

        try {
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/editOTP/${type}/verification`, {
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
                    forWhat: sendTo
                }),

                credentials: "include"
            });

            const response = await result.json();
            if (!result.ok) throw new Error(response.message);

            setSendOtpLoading(false);
            setOtpSend(true);
            console.log(response.message);
        } catch (err) {
            console.log("Error in sending OTP", err.message);

            setOtpSend(false);
            setSendOtpLoading(false);
        }
    }

    const verifyClickHandler = async () => {
        if (disableVerify) return;
        if (verifyLoading) return;

        if (otp.length !== 6) {
            setWarning("Please enter six digit OTP");
            return;
        }

        setVerifyLoading(true);

        try {
            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/verification/${type}`, {
                method: "POST",
                headers: {
                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                    "Content-Type": "application/json",
                    "x-user-agent": navigator.userAgent,
                    "x-language": navigator.language,
                    "x-resolution": `${screen.height}x${screen.width}`,
                    "x-device-id": deviceId,
                },
                credentials: "include",
                body: JSON.stringify({
                    otpFor: sendTo,
                    OTP: otp
                })
            });

            const response = await result.json();
            if (!result.ok) throw new Error(response.message);

            console.log("Verified", response);
            setVerifyLoading(false);
            dispatch(setHideEditModal(true));

            dispatch(setAppLoading(true));

            const result2 = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/profile`, {
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
            });

            const user = await result2.json();
            if (!result.ok) throw new Error(response.message);

            const userProfileData = {
                userName: user.data.name,
                userEmail: user.data.email,
                userPhone: user.data.phone,
                isEmailVerified: user.data.isEmailVerified,
                isPhoneVerified: user.data.isNumberVerified,
            }

            dispatch(setUserDetails(userProfileData));
            dispatch(setAppLoading(false));
        } catch (err) {
            console.log("Error in verifying:", err);

            dispatch(setAppLoading(false));
            setSendOtpLoading(false);
            setVerifyLoading(false);
        }
    }

    return <div>
        <h2 className="text-center dark:text-gray-200">{title}</h2>
        {otpSend
            ? <p className="text-sm text-center dark:text-gray-300">{`We sent a code to ${sendTo}.`}</p>
            : <p className="text-sm text-center dark:text-gray-300">{`We’ll send you a 6-digit code to ${sendTo} to complete verification.`}</p>
        }

        {otpSend && <OtpEntry count={6} setOtp={setOtp} />}

        {otpSend && <OtpCounter disableVerify={setDisableVerify} />}

        {(otpSend && warning) && <p className="text-red-500 font-medium text-center mb-3 mt-2 leading-4">{warning}</p>}

        <div className="flex items-center justify-between mt-2 w-full">
            <button onClick={() => dispatch(setHideEditModal(true))} className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-primary/80 dark:bg-darkPrimary/80 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-linear active:scale-95">
                Close
            </button>

            {otpSend
                ? <button onClick={verifyClickHandler} className={`basis-[48%] h-8 text-white font-bold tracking-wider flex items-center rounded-md justify-center ${disableVerify ? "border-2 border-gray-500 bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary/80 dark:bg-darkPrimary/80 cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary active:scale-95"} transition-all duration-100 ease-linear`}>
                    {verifyLoading ? <DotBounceLoader /> : "Verify"}
                </button>
                : <button onClick={sendClickHandle} className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-primary/80 dark:bg-darkPrimary/80 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-linear active:scale-95">
                    {sendOtpLoading ? <DotBounceLoader /> : "Send OTP"}
                </button>
            }
        </div>
    </div >
}

export default Verification;