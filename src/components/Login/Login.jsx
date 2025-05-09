import { useState, useRef, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLogInModal,
  loginOtpSend,
  loginOtpNotSend,
  selectLoginOtp,
  setIsLoggedIn,
} from "../../features/Login/loginSlice";

const Login = () => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] =
    useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const isOtpSend = useSelector(selectLoginOtp);
  const formRef = useRef(null);

  useEffect(() => {
    if (!window.recatchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "LoginBtn", {
        size: "invisible",
      });
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleGuestLogin = () => {
    console.log("Guest Login");
  };

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    window.recaptchaVerifier.verify().then(() => {
      console.log("called");
      sendOTP();
    });
  };

  function handleOtpVerification() {
    const data = new FormData(formRef.current);

    if (data.get("otp").length === 0) {
      setChangeOtpHasValue(true);
    } else if (data.get("otp").length < 6) {
      setChangeOtpIsEntryMade(true);
      setChangeOtpHasValue(true);
    } else {
      const otp = data.get("otp");

      window.confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("OTP Verified");
          console.log(result.user);
          dispatch(closeLogInModal());
          dispatch(loginOtpNotSend());
          window.recatchaVerifier = null;
          window.confirmationResult = null;
          window.recaptchaVerifier.clear();
          dispatch(setIsLoggedIn(true));
        })
        .catch((err) => {
          alert("OTP not verified");
          console.log(err);
        });

      // Reset the Profile for logged in user
    }
  }

  function sendOTP() {
    const data = new FormData(formRef.current);

    if (data.get("phone").length === 0) {
      setChangePhoneHasValue(true);
    } else if (data.get("phone").length < 10) {
      setChangePhoneIsEntryMade(true);
      setChangePhoneHasValue(true);
    } else {
      const appVerifier = window.recaptchaVerifier;
      const number = "+91" + data.get("phone");

      signInWithPhoneNumber(auth, number, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          dispatch(loginOtpSend());
        })
        .catch((err) => {
          console.log("Error in Sending OTP", err);
        });
    }
  }

  return (
    <Form
      btnId="LoginBtn"
      refference={formRef}
      guestLogin={true}
      handleSubmit={handleSubmit}
      handleGuestLogin={handleGuestLogin}
      handleOtpVerification={handleOtpVerification}
      signingStatement={"By clicking on Login"}
      isOtpSend={isOtpSend}
    >
      <EntryDiv
        type="tel"
        inputMode="numeric"
        purpose={"phone"}
        placeholder="Phone number"
        fallbackPlacehoder="Enter your phone number"
        isReadOnly={isOtpSend}
        changeIsEntryMade={changePhoneIsEntryMade}
        changeHasValue={changePhoneHasValue}
        focus="true"
      />
      {isOtpSend && (
        <EntryDiv
          type="text"
          inputMode="numeric"
          purpose={"otp"}
          placeholder="One Time Password"
          fallbackPlacehoder="One Time Password"
          changeIsEntryMade={changeOtpIsEntryMade}
          changeHasValue={changeOtpHasValue}
          focus="true"
        />
      )}
    </Form>
  );
};

export default Login;
