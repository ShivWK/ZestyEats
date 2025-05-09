import { useState, useRef } from "react";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLogInModal,
  selectSignUpOtp,
  signUpOtpSend,
  signUpOtpNotSend,
} from "../../features/Login/loginSlice";

const SignUp = () => {
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
  const formRef = useRef(null);

  const handleSignUpChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  function handleOtpVerification() {
    
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData(formRef);

    if (!isSignUpOtpSend) {
      if (data.get("phone").length === 0) {
        // setChangePhoneIsEntryMade(true);
        setChangePhoneHasValue(true);

      } else if (data.get("phone").length < 10) {
        setChangePhoneIsEntryMade(true);
        setChangePhoneHasValue(true);

      } else if (data.get("name").length === 0) {
        // setChangeNameIsEntryMade(true);
        setChangeNameHasValue(true);

      } else if (data.get("email").length === 0) {
        // setChangeEmailIsEntryMade();
        setChangeEmailHasValue(true);

      } else if (!/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.get("email"))) {
        setChangeEmailIsEntryMade(true);
        setChangeEmailHasValue(true);

      } else {
        // handle the OTP sending logic
        dispatch(signUpOtpSend());
      }
    } else {
      if (data.get("otp").length === 0) {
        setChangeOtpHasValue(true);
        // setChangeOtpIsEntryMade(true);
      } else if (data.get("otp").length < 6) {
        setChangeOtpIsEntryMade(true);
        setChangeOtpHasValue(true);
      } else {
        // handle the OTP verification logic here
        console.log("OTP Verified");
        // Reset the Profile for logged in user
        dispatch(signUpOtpNotSend());
        dispatch(closeLogInModal());
      }
    }
  };

  return (
    <Form
      btnId={"SignUpBtn"}
      refference={formRef}
      handleSubmit={handleSignUp}
      handleOtpVerification={handleOtpVerification}
      signingStatement={"By creating an account"}
      isOtpSend={isSignUpOtpSend}
    >
      <EntryDiv
        type={"tel"}
        inputMode={"numeric"}
        purpose={"phone"}
        value={signUpFormData.phone}
        onChangeHandler={handleSignUpChange}
        placeholder="Phone number"
        fallbackPlacehoder="Enter your phone number"
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
          fallbackPlacehoder="Name"
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
          fallbackPlacehoder="Invaid email address"
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
          fallbackPlacehoder="One Time Password"
          changeIsEntryMade={changeOtpIsEntryMade}
          changeHasValue={changeOtpHasValue}
          focus="true"
        />
      )}
    </Form>
  );
};

export default SignUp;
