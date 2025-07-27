import { useState, useRef, memo, useCallback } from "react";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector } from "react-redux";

import {
  closeLogInModal,
  selectSignUpOtp,
  signUpOtpSend,
  setLoading,
  selectIsLoading,
  selectOtpOnPhone,
  toggleOtpOnPhone,
} from "../../features/Login/loginSlice";

import { Phone, Mail } from "lucide-react"
import { toast } from "react-toastify";

const SignUp = memo(({ recaptchaRef }) => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] = useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  const [changeNameIsEntryMade, setChangeNameIsEntryMade] = useState(undefined);
  const [changeNameHasValue, setChangeNameHasValue] = useState(undefined);
  const [changeEmailIsEntryMade, setChangeEmailIsEntryMade] = useState(undefined);
  const [changeEmailHasValue, setChangeEmailHasValue] = useState(undefined);

  const [signUpFormData, setSignUpFormData] = useState({
    phone: "",
    name: "",
    email: "",
    opt: "",
  });

  const dispatch = useDispatch();
  const isSignUpOtpSend = useSelector(selectSignUpOtp);
  const isLoading = useSelector(selectIsLoading);
  const otpOnPhone = useSelector(selectOtpOnPhone);
  const formRef = useRef(null);

  const handleSignUpChange = useCallback((e) => {
    setSignUpFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, [setSignUpFormData]);

  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setLoading(true));
    const data = new FormData(formRef.current);

    if (data.get("phone").length === 0) {
      setChangePhoneHasValue(true);
      dispatch(setLoading(false));
    }

    if (data.get("name").length === 0) {
      setChangeNameHasValue(true);
      dispatch(setLoading(false));
    }

    if (data.get("email").length === 0) {
      setChangeEmailHasValue(true);
      dispatch(setLoading(false));
      return;
    }

    if (data.get("phone").length < 10) {
      setChangePhoneIsEntryMade(true);
      setChangePhoneHasValue(true);
      dispatch(setLoading(false));
    } else if (/[^a-zA-z\s]/g.test(data.get("name"))) {
      setChangeNameIsEntryMade(true)
      setChangeNameHasValue(true);
      dispatch(setLoading(false));
    } else if (!/^[^.][a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.get("email"))) {
      setChangeEmailIsEntryMade(true);
      setChangeEmailHasValue(true);
      dispatch(setLoading(false));
    } else {
      try {
        recaptchaRef.current.reset();
        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();

        sendOtp(data, token, otpOnPhone);
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
  }, [setSignUpFormData, signUpFormData, setLoading, selectSignUpOtp, selectIsLoading, setChangePhoneHasValue, setChangePhoneIsEntryMade, setChangeNameHasValue, setChangeNameIsEntryMade, setChangeEmailHasValue, setChangeEmailIsEntryMade, otpOnPhone]);

  async function sendOtp(data, token, otpOnPhoneLog) {
    const mode = otpOnPhoneLog ? "phone" : "email"
    const userData = {
      name: data.get("name"),
      phone_number: data.get("phone"),
      email: data.get("email"),
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/signup/sendOtp/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userData,
          token
        })
      })
      const data = await res.json();
      console.log(data)
      dispatch(setLoading(false))
    } catch (err) {
      console.log("Error in sending OTP", err);
      dispatch(setLoading(false))
    }
  }

  const handleOtpVerification = useCallback(() => {
    const data = new FormData(formRef.current);
    dispatch(setLoading(true));

    if (data.get("otp").length === 0) {
      setChangeOtpHasValue(true);
      dispatch(setLoading(false));
    } else if (data.get("otp").length < 6) {
      setChangeOtpIsEntryMade(true);
      setChangeOtpHasValue(true);
      dispatch(setLoading(false));
    } else {
      // call otp verification
    }
  }, [setSignUpFormData, signUpFormData, setLoading, selectSignUpOtp, selectIsLoading, setChangeOtpHasValue, setChangeOtpIsEntryMade, closeLogInModal]);

  const toggleHandler = () => {
    if (isSignUpOtpSend) return;
    dispatch(toggleOtpOnPhone())
  }

  return (
    <>
      {!isSignUpOtpSend && (
        <div className="h-fit w-fit flex items-center gap-2">
        <div id="toggle" onClick={toggleHandler} className="relative overflow-hidden border-2 border-gray-200 rounded-full w-16 h-8 flex items-center justify-between cursor-pointer bg-gray-200">
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

        <div className="text-xs font-bold text-gray-600 tracking-wide">
          {otpOnPhone ? <p className="dark:text-gray-300">OTP to <span className="text-black dark:text-white">Indian number.</span></p>
            : <p className="dark:text-gray-300">OTP to <span className="text-black dark:text-white">email (works globally).</span></p>
          }
        </div>
      </div>
      )}
      <Form
        btnId={"SignUpBtn"}
        reference={formRef}
        handleSubmit={handleSignUp}
        handleOtpVerification={handleOtpVerification}
        signingStatement={"By creating an account"}
        isOtpSend={isSignUpOtpSend}
        isLoading={isLoading}
      >
        <EntryDiv
          type={"tel"}
          inputMode={"numeric"}
          purpose={"phone"}
          value={signUpFormData.phone}
          onChangeHandler={handleSignUpChange}
          placeholder="Phone number"
          fallbackPlaceholder="Enter your phone number"
          changeIsEntryMade={changePhoneIsEntryMade}
          changeHasValue={changePhoneHasValue}
          isReadOnly={isSignUpOtpSend}
        />
        {!isSignUpOtpSend && (
          <EntryDiv
            type={"text"}
            inputMode={"text"}
            purpose={"name"}
            value={signUpFormData.name}
            onChangeHandler={handleSignUpChange}
            placeholder="Name"
            fallbackPlaceholder="Enter a valid name"
            changeIsEntryMade={changeNameIsEntryMade}
            changeHasValue={changeNameHasValue}
          />
        )}
        {!isSignUpOtpSend && (
          <EntryDiv
            type={"text"}
            inputMode={"text"}
            purpose={"email"}
            value={signUpFormData.email}
            onChangeHandler={handleSignUpChange}
            placeholder="Email"
            fallbackPlaceholder="Invalid email address"
            changeIsEntryMade={changeEmailIsEntryMade}
            changeHasValue={changeEmailHasValue}
          />
        )}
        {isSignUpOtpSend && (
          <EntryDiv
            type="text"
            inputMode="numeric"
            purpose={"otp"}
            value={signUpFormData.otp}
            onChangeHandler={handleSignUpChange}
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
});

export default SignUp;
