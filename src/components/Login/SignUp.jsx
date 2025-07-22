import { useState, useRef, memo, useCallback } from "react";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestoreDB } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import {
  closeLogInModal,
  selectSignUpOtp,
  signUpOtpSend,
  signUpOtpNotSend,
  setLoading,
  selectIsLoading,
} from "../../features/Login/loginSlice";

const SignUp = memo(() => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] =
    useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  const [changeNameIsEntryMade, setChangeNameIsEntryMade] = useState(undefined);
  const [changeNameHasValue, setChangeNameHasValue] = useState(undefined);
  const [changeEmailIsEntryMade, setChangeEmailIsEntryMade] =
    useState(undefined);
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
  const formRef = useRef(null);

  const handleSignUpChange = useCallback( (e) => {
    setSignUpFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, [setSignUpFormData]);

  const resetRecaptchaVerifier = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();

        const recaptchaWidgetId = window.recaptchaVerifier.widgetId;
        if (recaptchaWidgetId && typeof grecaptcha !== "undefined") {
          grecaptcha.reset(recaptchaWidgetId);
        }
      } catch (err) {
        console.error("Error in resetting recaptcha ", err);
      } finally {
        window.recaptchaVerifier = null;
      }
    }
  };

  const setDataToFirestore = async (userId, data) => {
    const docRef = doc(firestoreDB, "users", userId);
    try {
      await setDoc(docRef, {
        phone: signUpFormData.phone,
        name: signUpFormData.name,
        email: signUpFormData.email,
      });
    } catch (err) {
      console.log("Error writing to firebase", err);
    }
  };

  const handleSignUp = useCallback(async (e) => {
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
    } else if (data.get("name").length === 0) {
      setChangeNameHasValue(true);
      dispatch(setLoading(false));
    } else if (data.get("email").length === 0) {
      setChangeEmailHasValue(true);
      dispatch(setLoading(false));
    } else if (
      !/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.get("email"))
    ) {
      setChangeEmailIsEntryMade(true);
      setChangeEmailHasValue(true);
      dispatch(setLoading(false));
    } else if (!snapshot.empty) {
      alert("User already exists");
      dispatch(setLoading(false));
    } else {
      resetRecaptchaVerifier();

      window.recaptchaVerifier = new RecaptchaVerifier(auth, "SignUpBtn", {
        size: "invisible",
      });

      window.recaptchaVerifier
        .verify()
        .then(() => {
          sendOtp();
        })
        .catch((err) => {
          dispatch(setLoading(false));
          console.log("Recaptcha verification failed", err);
          alert("Recaptcha verification failed, please try again.");
        });
    }
  }, [setSignUpFormData, signUpFormData, firestoreDB, auth, setDataToFirestore, resetRecaptchaVerifier, setLoading, selectSignUpOtp, selectIsLoading, setChangePhoneHasValue, setChangePhoneIsEntryMade, setChangeNameHasValue, setChangeNameIsEntryMade, setChangeEmailHasValue, setChangeEmailIsEntryMade]);

  function sendOtp() {
    const data = new FormData(formRef.current);
    const appVerifier = window.recaptchaVerifier;
    const number = "+91" + data.get("phone");

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        dispatch(setLoading(false));
        dispatch(signUpOtpSend());
      })
      .catch((err) => {
        console.log("Error in Sending OTP", err);
        resetRecaptchaVerifier();
      });
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
      window.confirmationResult
        .confirm(data.get("otp"))
        .then((result) => {
          setDataToFirestore(result.user.uid, data);
          dispatch(setLoading(false));
          dispatch(signUpOtpNotSend());
          dispatch(closeLogInModal());
        })
        .catch((err) => {
          console.log("Error", err);
          dispatch(setLoading(false));
          setChangeOtpIsEntryMade(true);
          setChangeOtpHasValue(true);
        });
    }
  }, [setDataToFirestore, setSignUpFormData, signUpFormData, resetRecaptchaVerifier, setLoading, selectSignUpOtp, selectIsLoading, setChangeOtpHasValue, setChangeOtpIsEntryMade, closeLogInModal]);

  return (
    <Form
      btnId={"SignUpBtn"}
      refference={formRef}
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
        focus="true"
      />
      {!isSignUpOtpSend && (
        <EntryDiv
          type={"text"}
          inputMode={"text"}
          purpose={"name"}
          value={signUpFormData.name}
          onChangeHandler={handleSignUpChange}
          placeholder="Name"
          fallbackPlaceholder="Name"
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
  );
});

export default SignUp;
