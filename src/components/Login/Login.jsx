import { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector } from "react-redux";

import {
  loginOtpSend,
  selectLoginOtp,
  selectIsLoading,
  setIsLoggedIn,
  setLoading,
  setHideLogin,
  toggleOtpOnPhone,
  selectOtpOnPhone,
  setErrorMessage,
} from "../../features/Login/loginSlice";

import { selectDeviceFingerPrint, setUserDetails } from "../../features/home/homeSlice";

import { Phone, Mail } from "lucide-react";

const Login = ({ recaptchaRef }) => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] = useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeEmailIsEntryMade, setChangeEmailIsEntryMade] = useState(undefined);
  const [changeEmailHasValue, setChangeEmailHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  const [loginFormData, setLOginFormData] = useState({
    phone: "",
    email: "",
    otp: "",
  })

  const otpOnPhone = useSelector(selectOtpOnPhone);
  const dispatch = useDispatch();
  const isOtpSend = useSelector(selectLoginOtp);
  const isLoading = useSelector(selectIsLoading);
  const deviceFingerPrint = useSelector(selectDeviceFingerPrint);
  const formRef = useRef(null);

  const handleChange = (e) => {
    setLOginFormData(prv => {
      return {
        ...prv,
        [e.target.name] : e.target.value,
      }
    })
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setLoading(true));

    const data = new FormData(formRef.current);

    if (otpOnPhone) {
      if (data.get("phone").length === 0) {
        console.log("Called")
        setChangePhoneHasValue(true);
        dispatch(setLoading(false));
      } else if (!/^[2-9]\d{9}$/.test(data.get("phone"))) {
        console.log("Called")

        setChangePhoneIsEntryMade(true);
        setChangePhoneHasValue(true);
        dispatch(setLoading(false));
      } else {
        try {
          recaptchaRef.current.reset();
          const token = await recaptchaRef.current.executeAsync();
          recaptchaRef.current.reset();

          sendOTP(data, token, otpOnPhone);
        } catch (err) {
          console.log("Recaptcha failed", err);
          dispatch(setLoading(false))
          toast.error("Recaptcha failed, please try again.", {
            autoClose: 3000,
            style: {
              backgroundColor: "rgba(0,0,0,0.9)",
              fontWeight: "medium",
              color: "white",
            },
          })
        }
      }
    } else {
      if (data.get("email").length === 0) {
        setChangeEmailHasValue(true);
        dispatch(setLoading(false));
      } else if (!/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.get("email"))) {
        setChangeEmailIsEntryMade(true);
        setChangeEmailHasValue(true);
        dispatch(setLoading(false));
      } else {
        try {
          recaptchaRef.current.reset();
          const token = await recaptchaRef.current.executeAsync();
          recaptchaRef.current.reset();

          sendOTP(data, token, otpOnPhone);
        } catch (err) {
          console.log("Recaptcha failed", err);
          dispatch(setLoading(false))
          toast.error("Recaptcha failed, please try again.", {
            autoClose: 3000,
            style: {
              backgroundColor: "rgba(0,0,0,0.9)",
              fontWeight: "medium",
              color: "white",
            },
          })
        }
      }
    }
  }, [dispatch, formRef, setLoading, otpOnPhone, setChangePhoneHasValue, setChangePhoneIsEntryMade]);

  async function sendOTP(data, token, otpOnPhoneStatus) {
    const mode = otpOnPhoneStatus ? "phone" : "email";
    const otpFor = mode === "phone" ? data.get("phone") : data.get("email");

    try {
      const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/login/sendOtp/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-device-id": deviceFingerPrint,
          "x-user-agent": navigator.userAgent,
        },
        body: JSON.stringify({
          otpFor,
          token
        })
      });

      const response = await resp.json();

      if (!resp.ok) throw new Error(response.message);

      console.log(response);
      dispatch(setLoading(false));
      dispatch(loginOtpSend(true));
    } catch (err) {
      console.log("Error in sending OTP:", err);
      toast.error(err.message, {
        autoClose: 3000,
        style: {
          backgroundColor: "rgba(0,0,0,0.9)",
          fontWeight: "medium",
          color: "white",
        },
      })
      dispatch(setLoading(false))
    }
  }

  async function handleOtpVerification() {
    const data = new FormData(formRef.current);

    if (data.get("otp").length === 0) {
      setChangeOtpHasValue(true);
    } else if (data.get("otp").length < 6) {
      setChangeOtpIsEntryMade(true);
      setChangeOtpHasValue(true);
    } else {
      dispatch(setLoading(true));
      const OTP = data.get("otp");
      const mode = otpOnPhone ? "phone" : "email";
      const otpFor = mode === "phone" ? data.get("phone") : data.get("email");

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/verifyOtp/${mode}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-device-id": deviceFingerPrint,
            "x-user-agent": navigator.userAgent,
          },
          body: JSON.stringify({
            OTP,
            otpFor,
          })
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        console.log("API response", result);
        dispatch(setUserDetails(result.data));
        dispatch(setIsLoggedIn(true))
        dispatch(setLoading(false));
        dispatch(setHideLogin(true));
        dispatch(loginOtpSend(false));
      } catch (err) {
        console.log("Error in verifying OTP:", err);
        dispatch(setLoading(false));
        dispatch(setErrorMessage(err.message));
      }
    }
  }

  const toggleHandler = () => {
    if (isOtpSend) return;
    dispatch(toggleOtpOnPhone());
  }

  return (
    <>
      {!isOtpSend && (
        <div id="toggle" onClick={toggleHandler} className={`relative overflow-hidden border-2 border-gray-200 rounded-full w-16 h-8 flex items-center justify-between ${!isOtpSend && "cursor-pointer"} bg-gray-200`}>
          <Phone size={18} strokeWidth={2} className="text-green-500 ml-1.5" />
          <Mail size={18} strokeWidth={2} className="text-red-500 mr-1.5" />
          <div className={`absolute rounded-full h-full right-0 w-7 transition-all duration-150 ease-linear flex items-center justify-center bg-white dark:bg-black`}
            style={{ left: otpOnPhone ? "0" : "2rem" }}
          >
            {otpOnPhone ? <i className="fa-solid fa-phone text-green-400" />
              : <i className="fa-solid fa-envelope text-red-500" />
            }
          </div>
        </div>
      )}
      <div className="mt-5">
        {!isOtpSend &&  ( otpOnPhone ? (
          <p className="text-xs mt-2 font-bold text-gray-600 dark:text-gray-300 tracking-wide">
            OTP will be sent to {" "}
            <span className="text-black dark:text-white">
              Indian number (+91 only). Use email
            </span>
            {" "}if you're outside India.
          </p>
        )
          : (
            <p className="text-xs mt-2 font-bold text-gray-600 dark:text-gray-300 tracking-wide">
              OTP will be sent to given email inbox.{" "}
              <span className="text-black dark:text-white">
                Check spam if you don’t see it.
              </span>
            </p>
          ))
        }
      </div>
      <Form
        btnId="LoginBtn"
        reference={formRef}
        guestLogin={true}
        handleSubmit={handleSubmit}
        handleOtpVerification={handleOtpVerification}
        signingStatement={"By clicking on Login"}
        isOtpSend={isOtpSend}
        isLoading={isLoading}
      >
        {otpOnPhone ? <EntryDiv
          type="tel"
          value={loginFormData.phone}
          inputMode="numeric"
          purpose={"phone"}
          placeholder="Phone number"
          fallbackPlaceholder="Enter your phone number"
          isReadOnly={isOtpSend}
          changeIsEntryMade={changePhoneIsEntryMade}
          changeHasValue={changePhoneHasValue}
          onChangeHandler={handleChange}
        />
          : <EntryDiv
            type={"text"}
            value={loginFormData.email}
            inputMode={"text"}
            purpose={"email"}
            placeholder="Email"
            fallbackPlaceholder="Invalid email address"
            isReadOnly={isOtpSend}
            changeIsEntryMade={changeEmailIsEntryMade}
            changeHasValue={changeEmailHasValue}
            onChangeHandler={handleChange}
          />
        }
        {isOtpSend && (
          <EntryDiv
            type="text"
            value={loginFormData.otp}
            inputMode="numeric"
            purpose={"otp"}
            placeholder="One Time Password"
            fallbackPlaceholder="One Time Password"
            changeIsEntryMade={changeOtpIsEntryMade}
            changeHasValue={changeOtpHasValue}
            otpFormData={{ phone: loginFormData.phone, email: loginFormData.email}}
            focus="true"
            onChangeHandler={handleChange}
          />
        )}
      </Form>
    </>
  );
};

export default Login;
