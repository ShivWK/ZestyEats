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
  selectIsLoading,
  setIsLoggedIn,
  setLoading,
} from "../../features/Login/loginSlice";

const Login = () => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] =
    useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  const dispatch = useDispatch();
  const isOtpSend = useSelector(selectLoginOtp);
  const isLoading = useSelector(selectIsLoading);
  const formRef = useRef(null);

  const handleGuestLogin = () => {
    console.log("Guest Login");
  };

  const handleSubmit = (e) => {
    console.log("Clicked")
    e.preventDefault();
    e.stopPropagation();
    dispatch(setLoading(true));

    const data = new FormData(formRef.current);

    if (data.get("phone").length === 0) {
      setChangePhoneHasValue(true);
      dispatch(setLoading(false));
    } else if (data.get("phone").length < 10) {
      setChangePhoneIsEntryMade(true);
      setChangePhoneHasValue(true);
      dispatch(setLoading(false));
    } else {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear(); // clearing it because if it exists then new recaptcha wont be gerated or u cant resend otp
        window.recaptchaVerifier = null;
      }
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "LoginBtn", {
        size: "invisible",
      });

      window.recaptchaVerifier
        .verify()
        .then(() => {
          dispatch(setLoading(true));
          sendOTP();
        })
        .catch((err) => {
          dispatch(setLoading(false));
          console.log("Recaptcha verification failed", err);
          alert("Recaptcha verification failed, please try again.");
        });
    }
  };

  function sendOTP() {
    const data = new FormData(formRef.current);
    const appVerifier = window.recaptchaVerifier;
    const number = "+91" + data.get("phone");

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        dispatch(setLoading(false));
        dispatch(loginOtpSend());
      })
      .catch((err) => {
        console.log("Error in Sending OTP", err);
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      });
  }

  function handleOtpVerification() {
    const data = new FormData(formRef.current);

    if (data.get("otp").length === 0) {
      setChangeOtpHasValue(true);
    } else if (data.get("otp").length < 6) {
      setChangeOtpIsEntryMade(true);
      setChangeOtpHasValue(true);
    } else {
      dispatch(setLoading(true));
      const otp = data.get("otp");

      window.confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("OTP Verified");
          // console.log(result.user);npm run dev
          dispatch(closeLogInModal());
          dispatch(loginOtpNotSend());
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
          window.confirmationResult = null;
          dispatch(setLoading(false));
          dispatch(setIsLoggedIn(true));

          // const widgetId = window.recaptchaVerifier.widgetId;
          // if (widgetId !== undefined) {
          //   window.recaptchaVerifier.recaptcha.reset(widgetId);
          // }
        })
        .catch((err) => {
          dispatch(setLoading(false));
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
          alert("OTP not verified");
          console.log(err);
        });
      // Reset the Profile for logged in user
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
      isLoading={isLoading}
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
