import { useState } from "react";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch } from "react-redux";
import { closeLogInModal } from "../../features/Login/loginSlice";

const SignUp = () => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] = useState(false);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(false);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(false);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(false);
  const [changeNameIsEntryMade, setChangeNameIsEntryMade] = useState(false);
  const [changeNameHasValue, setChangeNameHasValue] = useState(false);
  const [changeEmailIsEntryMade, setChangeEmailIsEntryMade] = useState(false);
  const [changeEmailHasValue, setChangeEmailHasValue] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [signUpFormData, setSignUpFormData] = useState({
    phone: "",
    name: "",
    email: "",
    opt: "",
  });
  const dispatch = useDispatch();

  const handleSignUp = () => {
    console.log("Sign Up");
  };

  const handleSignUpChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const data = new FormData(e.target);

//     if (!isOtpSend) {
//       if (data.get("phone").length === 0) {
//         setChangePhoneIsEntryMade(true);
//         setChangePhoneHasValue(true);
//       } else if (data.get("phone").length < 10) {
//         setChangePhoneHasValue(true);
//       } else {
//         // handle the OTP sending logic
//         setIsOtpSend(true);
//       }
//     } else {
//       if (data.get("otp").length === 0) {
//         setChangeOtpHasValue(true);
//         setChangeOtpIsEntryMade(true);
//       } else if (data.get("otp").length < 6) {
//         setChangeOtpHasValue(true);
//       } else {
//         // handle the OTP verification logic here
//         console.log("OTP Verified");
//         // Reset the Profile for logged in user
//         dispatch(closeLogInModal());
//         setIsOtpSend(false);
//       }
//     }
//   };

  return (
    <Form
      handleSubmit={handleSignUp}
      buttonText={isOtpSend ? "VERIFY OTP" : "CONTINUE"}
      signingStatement={"By creating an account"}
      isOtpSend={isOtpSend}
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
        isReadOnly={isOtpSend}
      />
      {!isOtpSend && (
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
      {!isOtpSend && (
        <EntryDiv
          type={"email"}
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
      {isOtpSend && (
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
