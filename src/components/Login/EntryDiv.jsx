import { useState, useRef, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectLoginOtp,
  selectSignUpOtp,
  selectFullDisable,
  selectOtpOnPhone,
  setLoading,
  setErrorMessage,
  setFullDisable,
} from "../../features/Login/loginSlice";

import { selectDeviceFingerPrint } from "../../features/home/homeSlice";

const EntryDiv = memo(({
  type,
  inputMode,
  value = null,
  purpose,
  focus = false,
  placeholder,
  fallbackPlaceholder,
  isReadOnly = false,
  changeIsEntryMade,
  changeHasValue,
  otpFormData = null,
  recaptchaRef = null,
  onChangeHandler = () => { },
}) => {
  const loginOTP = useSelector(selectLoginOtp);
  const signupOTP = useSelector(selectSignUpOtp);
  const fullDisable = useSelector(selectFullDisable);
  const otpOnPhone = useSelector(selectOtpOnPhone);
  const deviceId = useSelector(selectDeviceFingerPrint);
  const dispatch = useDispatch();

  const [isEntryMade, setIsEntryMade] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [fieldValue, setFiledValue] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [disable, setDisable] = useState(true);
  const inputRef = useRef(null);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  let startCounter = null;
  useEffect(() => {
    startCounter = () => {
      const timer = setInterval(() => {
        setSeconds(prev => prev - 1)
        if (seconds === 0) clearInterval(timer);
      }, 1000);
    }

    if (loginOTP || signupOTP) startCounter();
  }, [loginOTP, signupOTP]);

  useEffect(() => {
    if (seconds === 0) setDisable(false);
  }, [seconds]);

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
      setIsEntryMade(true);
    }
  }, [focus]);

  useEffect(() => {
    if (isLoggedIn === true) {
      setFiledValue("");
      setIsEntryMade(false);
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (fieldValue !== "" && fieldValue !== null && fieldValue !== undefined) {
      inputRef.current.focus();
    }
  }, [fieldValue])

  useEffect(() => {
    if (changeHasValue !== undefined) setHasValue(changeHasValue);
    if (changeIsEntryMade !== undefined) setIsEntryMade(changeIsEntryMade);
  }, [changeHasValue, changeIsEntryMade]);

  const handleDivClick = (e) => {
    e.stopPropagation();
    inputRef.current.focus();
  };

  const onPhoneBlur = () => {
    if (
      inputRef.current.value.length > 0 &&
      inputRef.current.value.length < 10
    ) {
      // check if the phone number is valid
      setHasValue(true);
    } else if (inputRef.current.value.length == 0) {
      setHasValue(false);
      setIsEntryMade(false);
    }
  };

  const onOtpBlur = () => {
    if (
      inputRef.current.value.length > 0 &&
      inputRef.current.value.length < 6
    ) {
      setHasValue(true);
    } else if (inputRef.current.value.length == 0) {
      setHasValue(false);
      setIsEntryMade(false);
    }
  };

  const onNameBlur = () => {
    if (inputRef.current.value.length == 0) {
      setIsEntryMade(false);
      setHasValue(false);
    } else if (/[^a-zA-z\s]/g.test(inputRef.current.value)) {
      setHasValue(true);
    }
  };

  const onEmailBlur = () => {
    if (inputRef.current.value.length == 0) {
      setIsEntryMade(false);
      setHasValue(false);
    } else if (!/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputRef.current.value)) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const handlePhoneInput = (e) => {
    setHasValue(false);
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 10);
  };

  const handleOtpInput = (e) => {
    setHasValue(false);
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 6);
  };

  const handleNameInput = (e) => {
    setHasValue(false);
    e.target.value = e.target.value.slice(0, 50);
  };

  const handleGeneralInput = () => {
    setHasValue(false);
  };

  const handleFocus = () => {
    setIsEntryMade(true);
  };

  const handleChange = (e) => {
    setFiledValue(e.target.value);
  }

  const resendClickHandler = async (e) => {
    e.stopPropagation();
    setDisable(true);
    setSeconds(60);
    dispatch(setLoading(true));
    dispatch(setFullDisable(true));

    const mode = otpOnPhone ? "phone" : "email";
    let resendOtpTo = null;

    if (mode === "phone") resendOtpTo = otpFormData.phone;
    else resendOtpTo = otpFormData.email;

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/resendOtp/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-device-id": deviceId,
          "x-user-agent": navigator.userAgent,
        },
        body: JSON.stringify({
          resendOtpTo,
          token
        })
      })

      const response = await res.json();
      
      if (!res.ok) throw new Error(response.message);
      console.log(response);

      dispatch(setErrorMessage("OTP send successfully"))

      dispatch(setLoading(false));
      dispatch(setFullDisable(false));
      startCounter();
    } catch (err) {
      console.log("Error in resending OTP", err);
      
      dispatch(setLoading(false));
      dispatch(setErrorMessage("Error in sending OTP. Please try again."))
    }
  }

  const handleBlur =
    purpose === "phone"
      ? onPhoneBlur
      : purpose === "otp"
        ? onOtpBlur
        : purpose === "name"
          ? onNameBlur
          : onEmailBlur;

  const handleInput =
    purpose === "phone"
      ? handlePhoneInput
      : purpose === "otp"
        ? handleOtpInput
        : purpose === "name"
          ? handleNameInput
          : handleGeneralInput;

  return (
    <>
      <div
        onClick={handleDivClick}
        className="relative p-2.5 border-2 border-gray-300 h-[70px] cursor-text"
      >
        <p
          className={`absolute font-semibold ${hasValue ? "text-red-500" : "text-gray-400 dark:text-gray-300"
            } transform transition-all duration-150 ease-linear ${isEntryMade ? "top-2.5 text-xs" : "top-1/2 -translate-y-1/2 text-lg"
            } tracking-wide`}
        >
          {hasValue ? fallbackPlaceholder : placeholder}
        </p>
        <input
          id="elem"
          name={purpose}
          type={type}
          value={value === "null" ? fieldValue : value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          inputMode={inputMode}
          readOnly={isReadOnly}
          ref={inputRef}
          onChange={(event) => {
            handleInput(event);
            handleChange(event);
            onChangeHandler(event)
          }}
          className={`relative top-5 dark:text-white font-semibold text-lg outline-none w-full bg-transparent`}
        />
      </div>
      {!fullDisable ? (
        purpose === "otp" && <div className="flex justify-between px-0.5 mt-1">
          <button onClick={resendClickHandler} disabled={disable} className={`text-xs font-bold ${disable ? "text-gray-400" : "text-primary cursor-pointer"}  underline underline-offset-2`}>
            Resend OTP
          </button>
          {disable && <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
            <span className="tracking-wide">remaining time: </span>
            <span>{seconds}</span>
          </p>}
        </div>
      ) : (
        purpose === "otp" && <div className="px-0.5 mt-1">
          <p className={`text-xs font-bold text-gray-400 underline underline-offset-2`}>
            Resend OTP
          </p>
        </div>
      )}
    </>
  );
});

export default EntryDiv;
