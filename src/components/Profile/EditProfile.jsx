import { selectUserDetails, selectDeviceFingerPrint, setUserDetails } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, } from "react";
import { setAppLoading, setHideEditModal } from "../../features/Login/loginSlice";
import OtpEntry from "./OtpEntry";
import OtpCounter from "./OtpCounter";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { toast } from "react-toastify";

const EditProfile = () => {
    const data = useSelector(selectUserDetails);
    const deviceId = useSelector(selectDeviceFingerPrint);

    const dispatch = useDispatch();

    const [warning, setWarning] = useState("");
    const [otp, setOtp] = useState("");

    const [nameInvalid, setNameInvalid] = useState(false);
    const [phoneInvalid, setPhoneInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

    const [sendOtpLoading, setSendOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [disableVerify, setDisableVerify] = useState(false);
    const [OtpSend, setOtpSend] = useState(false);

    const [formData, setFormData] = useState({
        username: data.userName,
        phone: data.userPhone,
        email: data.userEmail,
    })

    const inputChangeHandler = (e) => {
        const ele = e.target;
        const type = ele.name;
        const value = ele.value;

        if (type === "username") {
            if (/[^a-zA-z\s]/g.test(value) || value.length === 0) {
                ele.style.borderColor = "red";
                setNameInvalid(true)
            } else {
                ele.style.borderColor = "#05df72";
                setNameInvalid(false);
            }
        } else if (type === "phone") {
            if (!/^[2-9]\d{9}$/.test(value) || value.length === 0) {
                ele.style.borderColor = "red";
                setPhoneInvalid(true);
            } else {
                ele.style.borderColor = "#05df72";
                setPhoneInvalid(false);
            }
        } else if (type === "email" || value.length === 0) {
            if (!/^[^.][a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || value.length === 0) {
                ele.style.borderColor = "red";
                setEmailInvalid(true);
            } else {
                ele.style.borderColor = "#05df72";
                setEmailInvalid(false);
            }
        }

        setFormData(pre => {
            return {
                ...pre,
                [type]: value
            }
        })
    }

    const sendOtpHandler = async () => {
        if (sendOtpLoading) return;
        if (nameInvalid || phoneInvalid || emailInvalid) {
            setWarning("Please enter valid data");
            return;
        }

        const isNameChanged = formData.username !== data.userName;
        const isEmailChanged = formData.email !== data.userEmail;
        const isPhoneChanged = formData.phone !== data.userPhone;

        if (isNameChanged || isEmailChanged || isPhoneChanged) {
            setSendOtpLoading(true);

            try {
                const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/editOTP/email/editProfile`, {
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
                        forWhat: data.userEmail
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
        } else {
            toast.info("Update details before requesting OTP or close.");
        }
    }

    const verifyAndSaveHandler = async () => {
        if (disableVerify) return;
        if (verifyLoading) return;

        if (otp.length !== 6) {
            toast.info("Please enter six digit OTP");
            return;
        };

        try {
            const isEmailChanged = formData.email !== data.userEmail;
            const isPhoneChanged = formData.phone !== data.userPhone;

            setVerifyLoading(true);

            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/profile`, {
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
                    OTP: otp,
                    data: {
                        name: formData.username,
                        email: formData.email,
                        phone: formData.phone,
                        oldEmail: data.userEmail,
                    },
                    isEmailChanged,
                    isPhoneChanged,
                }),

                credentials: "include"
            });

            const response = await result.json();
            if (!result.ok) throw new Error(response.message);

            setVerifyLoading(false);
            dispatch(setHideEditModal(true));
            console.log("Profile updated successfully");

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
            toast.info(err.message);
            console.log("Error in updating profile", err.message);

            dispatch(setAppLoading(false));
            setVerifyLoading(false);
        }
    }

    const inputArray = [
        {
            text: "Name",
            type: "text",
            name: "username",
            value: formData.username
        },

        {
            text: "Phone Number",
            type: "tel",
            name: "phone",
            value: formData.phone
        },

        {
            text: "Email",
            type: "email",
            name: "email",
            value: formData.email
        }
    ]

    return <div className="">
        <form>
            {inputArray.map((data, index) => <div key={index} className={`${index !== 0 && "mt-3"}`}>
                <p className="relative text-sm dark:text-white text-black">
                    {data.text}
                </p>
                <input
                    type={data.type}
                    name={data.name}
                    value={data.value}
                    placeholder="Enter name"
                    // readOnly={OtpSend}
                    className="p-0.5 px-1 truncate border-2 border-gray-400 rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 mt-1"
                    onChange={inputChangeHandler}
                />
            </div>)

            }
        </form>

        {OtpSend
            ? <>
                <OtpEntry count={6} setOtp={setOtp} />
                <OtpCounter disableVerify={setDisableVerify} />
            </>
            : <>
                <p className="text-center dark:text-gray-200 text-sm my-3">
                    OTP will be sent to registered email.
                </p>
                {warning && <p className="text-red-500 font-medium text-center mb-1.5 -mt-2">{warning}</p>}
            </>
        }

        <div className="flex justify-between items-center mt-2">
            {OtpSend
                ? <button onClick={verifyAndSaveHandler} className={`w-full h-8 text-white font-bold tracking-wider flex items-center rounded-md justify-center ${disableVerify ? "border-2 border-gray-500 bg-gray-300 dark:text-gray-500 text-gray-400 cursor-not-allowed" : "bg-primary/80 dark:bg-darkPrimary/80 cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary active:scale-95"} transition-all duration-100 ease-linear`}>
                    {verifyLoading ? <DotBounceLoader /> : "Verify and Save"}
                </button>
                : <>
                    <button
                        onClick={() => dispatch(setHideEditModal(true))}
                        className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-primary/80 dark:bg-darkPrimary/80 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-linear active:scale-95">
                        Close
                    </button>
                    <button
                        onClick={sendOtpHandler}
                        className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-primary/80 dark:bg-darkPrimary/80 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-linear active:scale-95">
                        {sendOtpLoading ? <DotBounceLoader /> : "Send OTP"}
                    </button>
                </>}
        </div>
    </div>
}

export default EditProfile;