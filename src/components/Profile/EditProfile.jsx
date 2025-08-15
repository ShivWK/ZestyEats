import { selectUserDetails } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, } from "react";
import { setHideEditModal } from "../../features/Login/loginSlice";
import OtpEntry from "./OtpEntry";
import OtpCounter from "./OtpCounter";

const EditProfile = () => {
    const data = useSelector(selectUserDetails);
    const dispatch = useDispatch();

    const [warning, setWarning] = useState("");
    const [otp, setOtp] = useState("");

    const [nameInvalid, setNameInvalid] = useState(false);
    const [phoneInvalid, setPhoneInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

    const [sendOtpLoading, setSendOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [disableVerify, setDisableVerify] = useState(false);

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
                ele.style.borderColor = "green";
                setNameInvalid(false);
            }
        } else if (type === "phone") {
            if (!/^[2-9]\d{9}$/.test(value) || value.length === 0) {
                ele.style.borderColor = "red";
                setPhoneInvalid(true);
            } else {
                ele.style.borderColor = "green";
                setPhoneInvalid(false);
            }
        } else if (type === "email" || value.length === 0) {
            if (!/^[^.][a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || value.length === 0) {
                ele.style.borderColor = "red";
                setEmailInvalid(true);
            } else {
                ele.style.borderColor = "green";
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

    const sendOtpHandler = () => {
        if (sendOtpLoading) return;
        if (nameInvalid || phoneInvalid || emailInvalid) {
            setWarning("Please enter valid data");
            return;
        }

        setSendOtpLoading(true);

        try {

        } catch (err) {

        }
        
    }

    return <div className="">
        <form>
            <div>
                <p className="relative text-sm dark:text-white text-black">
                    Name
                </p>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Enter name"
                    className="p-0.5 px-1 truncate border border-gray-400 rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 mt-1"
                    onChange={inputChangeHandler}
                />
            </div>

            <div className="mt-3">
                <p className="relative text-sm dark:text-white text-black">
                    Phone Number
                </p>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter phone number"
                    className="p-0.5 px-1 truncate border border-gray-400 rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 mt-1"
                    onChange={inputChangeHandler}
                />
            </div>

            <div className="mt-3">
                <p className="relative text-sm dark:text-white text-black">
                    Email
                </p>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter email"
                    className="p-0.5 px-1 truncate border border-gray-400 rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 mt-1"
                    onChange={inputChangeHandler}
                />
            </div>

        </form>

        <p className="text-center dark:text-gray-200 text-sm my-3">
           OTP will be sent to registered email.
        </p>

        {warning && <p className="text-red-500 font-medium text-center mb-1.5 -mt-2">{warning}</p>}

        <div className="flex justify-between items-center">
            <button 
            onClick={() => dispatch(setHideEditModal(true))}
            className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-primary/80 dark:bg-darkPrimary/80 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-linear active:scale-95">
                Close
            </button>
            <button
                onClick={sendOtpHandler}
                className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-primary/80 dark:bg-darkPrimary/80 rounded-md cursor-pointer hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-linear active:scale-95">
                Send OTP
            </button>
        </div>
    </div>
}

export default EditProfile;