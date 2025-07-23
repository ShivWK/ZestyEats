import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { auth, firestoreDB } from "../../firebaseConfig";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLogInModal,
  loginOtpSend,
  selectLoginOtp,
  selectIsLoading,
  setIsLoggedIn,
  setLoading,
} from "../../features/Login/loginSlice";
import { Phone, Mail } from "lucide-react";

const Login = () => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] = useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeEmailIsEntryMade, setChangeEmailIsEntryMade] = useState(undefined);
  const [changeEmailHasValue, setChangeEmailHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  const [otpOnPhone, setOtpOnPhone] = useState(true)
  const dispatch = useDispatch();
  const isOtpSend = useSelector(selectLoginOtp);
  const isLoading = useSelector(selectIsLoading);
  const formRef = useRef(null);
  const recatpchaRef = useRef(null);

  function resetRecaptcha() {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();

        const recaptchaWidgetId = window.recaptchaVerifier.widgetId;
        console.log(recaptchaWidgetId);
        if (recaptchaWidgetId && typeof grecaptcha !== "undefined") {
          grecaptcha.reset(recaptchaWidgetId);
        }
      } catch (err) {
        toast("Error in resetting recaptcha", {
          autoClose: 2000,
          style: {
            backgroundColor: "rgba(0,0,0,0.9)",
            fontWeight: "medium",
            color: "white",
          },
        });

        console.log("Error in Recaptcha", err);
      } finally {
        window.recaptchaVerifier = null;
      }
    }
  }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setLoading(true));

    const data = new FormData(formRef.current);
    const exists = true

    if (otpOnPhone) {
      if (data.get("phone").length === 0) {
        setChangePhoneHasValue(true);
        dispatch(setLoading(false));
      } else if (data.get("phone").length < 10) {
        setChangePhoneIsEntryMade(true);
        setChangePhoneHasValue(true);
        dispatch(setLoading(false));
      } else if (exists) {
        toast("User does not exist", {
          autoClose: 3000,
          style: {
            backgroundColor: "rgba(0,0,0,0.9)",
            fontWeight: "medium",
            color: "white",
          },
        });
        dispatch(setLoading(false));
      } else {
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
        // create recaptcha token

        // call otp send end point
        sendOTP();
      }
    }


  }, [dispatch, firestoreDB, auth, formRef, resetRecaptcha, setLoading, setChangePhoneHasValue, setChangePhoneIsEntryMade]);

  function sendOTP() {
    const data = new FormData(formRef.current);
    
    //otp send logic
  }

  function handleOtpVerification() {
    const data = new FormData(formRef.current);

    if (data.get("otp").length === 0) {
      setChangeOtpHasValue(true);
    } else if (data.get("otp").length < 6) {
      setChangeOtpIsEntryMade(true);
      setChangeOtpHasValue(true);
    } else {
      // call otp verification

      dispatch(setLoading(true));
      const otp = data.get("otp");

      toast.info("Invalid OTP ", {
        autoClose: 4000,
        style: {
          backgroundColor: "rgb(0,0,0,0.8)",
          color: "white",
          fontWeight: "bold",
        },
        progressClassName: "progress-style",
      });
    }
  }

  const toggleHandler = () => {
    if (isOtpSend) return;
    setOtpOnPhone(!otpOnPhone);
  }

  return (
    <>
      <div id="toggle" onClick={toggleHandler} className={`relative overflow-hidden border-2 border-gray-200 rounded-full w-16 h-8 flex items-center justify-between ${!isOtpSend && "cursor-pointer"} bg-gray-200`}>
        {isOtpSend && <div className="absolute bg-gray-300/50 h-full w-full z-10" />}
        <Phone size={18} strokeWidth={2} className="text-green-500 ml-1.5" />
        <Mail size={18} strokeWidth={2} className="text-red-500 mr-1.5" />
        <div className={`absolute rounded-full h-full right-0 w-7 transition-all duration-150 ease-linear flex items-center justify-center bg-white`}
          style={{ left: otpOnPhone ? "0" : "2rem" }}
        >
          {otpOnPhone ? <i className="fa-solid fa-phone text-green-400" />
            : <i className="fa-solid fa-envelope text-red-500" />
          }
        </div>
      </div>
      <div className="mt-5">
        {otpOnPhone ? (
          <p className="text-xs mt-2 font-bold text-gray-600 tracking-wide">
            OTP will be sent to {" "}
            <span className="text-black">
              Indian number (+91 only). Use email
            </span>
            {" "}if you're outside India.
          </p>
        )
          : (
            <p className="text-xs mt-2 font-bold text-gray-600 tracking-wide">
              OTP will be sent to given email inbox.{" "}
              <span className="text-black">
                Check spam if you don’t see it.
              </span>
            </p>
          )
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
        recaptchaReference={recatpchaRef}
      >
        {otpOnPhone ? <EntryDiv
          type="tel"
          inputMode="numeric"
          purpose={"phone"}
          placeholder="Phone number"
          fallbackPlaceholder="Enter your phone number"
          isReadOnly={isOtpSend}
          changeIsEntryMade={changePhoneIsEntryMade}
          changeHasValue={changePhoneHasValue}
        />
          : <EntryDiv
            type={"text"}
            inputMode={"text"}
            purpose={"email"}
            placeholder="Email"
            fallbackPlaceholder="Invalid email address"
            isReadOnly={isOtpSend}
            changeIsEntryMade={changeEmailIsEntryMade}
            changeHasValue={changeEmailHasValue}
          />
        }
        {isOtpSend && (
          <EntryDiv
            type="text"
            inputMode="numeric"
            purpose={"otp"}
            placeholder="One Time Password"
            fallbackPlaceholder="One Time Password"
            changeIsEntryMade={changeOtpIsEntryMade}
            changeHasValue={changeOtpHasValue}
            focus="true"
          />
        )}
      </Form>
    </>
  );
};

export default Login;
