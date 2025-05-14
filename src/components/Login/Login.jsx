import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { auth, firestoreDB } from "../../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
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
    toast.info("You are logged in Anonymously!", {
      autoClose: 6000,
      style: {
        backgroundColor: "#ff5200",
        color: "white",
        fontWeight: "bold",
      },
      progressClassName: "progress-style",
    });
  };

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
        console.error("Error in resetting recaptcha ", err);
      } finally {
        window.recaptchaVerifier = null;
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setLoading(true));

    const data = new FormData(formRef.current);
    const collectionRef = collection(firestoreDB, "users");
    const q = query(collectionRef, where("phone", "==", data.get("phone")));
    const snapshot = await getDocs(q);

    if (data.get("phone").length === 0) {
      setChangePhoneHasValue(true);
      dispatch(setLoading(false));
    } else if (data.get("phone").length < 10) {
      setChangePhoneIsEntryMade(true);
      setChangePhoneHasValue(true);
      dispatch(setLoading(false));
    } else if (snapshot.empty) {
      // use toast
      alert("User does not exist");
      dispatch(setLoading(false));
    } else {
      resetRecaptcha();
      window.confirmationResult = null;

      window.recaptchaVerifier = new RecaptchaVerifier(auth, "LoginBtn", {
        size: "invisible",
      });

      window.recaptchaVerifier
        .verify()
        .then(() => {
          sendOTP();
        })
        .catch((err) => {
          dispatch(setLoading(false));
          console.log("Recaptcha verification failed", err);
          toast.info("Recaptcha verification failed, please try again.", {
            autoClose: 4000,
            style: {
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
            },
            progressClassName: "progress-style",
          });
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
         toast.info("Error in Sending OTP", {
            autoClose: 4000,
            style: {
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
            },
            progressClassName: "progress-style",
          });
        resetRecaptcha();
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
          dispatch(closeLogInModal());
          dispatch(loginOtpNotSend());
          resetRecaptcha();
          window.confirmationResult = null;
          dispatch(setLoading(false));
          dispatch(setIsLoggedIn(true));
        })
        .catch((err) => {
          setChangeOtpHasValue(true);
          dispatch(setLoading(false));
          resetRecaptcha();
          toast.info("Invalid OTP", {
            autoClose: 4000,
            style: {
              backgroundColor: "rgb(0,0,0,0.8)",
              color: "white",
              fontWeight: "bold",
            },
            progressClassName: "progress-style",
          });
          window.recaptchaVerifier = null;
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
