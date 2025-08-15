import { selectUserDetails } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectDeleteModal, setDeleteModalOpen, setHideDeleteModal } from "../../features/Login/loginSlice";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import { useState } from "react";
import DotBounceLoader from "../../utils/DotBounceLoader";
import OtpEntry from "./OtpEntry";
import { toast } from "react-toastify";

const DeleteModal = () => {
    const deviceId = useSelector(selectDeviceFingerPrint);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [otp, setOtp] = useState([]);

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

                body: {
                    otp: OTP,
                    email: userEmail,
                },
                
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

    return <div onClick={() => {
        dispatch(setHideDeleteModal(true));
    }} className="absolute top-0 left-0 h-full w-full z-60 bg-black/60 flex items-center justify-center">
        <div onAnimationEnd={animationEndHandler} className={`p-3 bg-white dark:bg-gray-800 ${!hideDeleteModal ? "animate-showDeleteModal" : "animate-hideDeleteModal"} w-[80%] lg:w-[25%] rounded-md`}>
            <p className="text-black dark:text-gray-200 text-center">{`OTP is send to your email ${email}`}</p>

            <OtpEntry setOtp={setOtp} verify={verified} count={6} />

            {deleteAccount
                ? <div >
                    <p className="dark:text-gray-200 text-center">OTP verified ✅
                        Are you sure? This action cannot be undone.</p>
                    <div className="flex items-center justify-between mt-1.5">
                        <button
                            // onClick={() => dispatch(setHideDeleteModal(true))}
                            className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-100 ease-linear">
                            Cancel
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteAccount(false)
                            }}
                            className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-100 ease-linear">
                            Delete
                        </button>
                    </div>
                </div>
                : <div className="flex items-center justify-between mt-1.5">
                    <button
                        // onClick={() => dispatch(setHideDeleteModal(true))}
                        className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-100 ease-linear">
                        Cancel
                    </button>

                    <button
                        onClick={verifyClickHandler}
                        className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-100 ease-linear">
                        {verifyLoading ? <DotBounceLoader /> : "Verify"}
                    </button>
                </div>
            }
        </div>
    </div>
}

export default DeleteModal;