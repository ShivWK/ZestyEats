import { useState } from "react";
import Form from "./Form";
import EntryDiv from "./EntryDiv";
import { useDispatch, useSelector} from "react-redux";
import { closeLogInModal, loginOtpSend, loginOtpNotSend, selectLoginOtp } from "../../features/Login/loginSlice";

const Login = () => {
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] = useState(undefined);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(undefined);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(undefined);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(undefined);
  const [loginFormData, setLoginFormData] = useState({ phone: "", otp: "" });
  const dispatch = useDispatch();
  const isOtpSend = useSelector(selectLoginOtp);

  const handleGuestLogin = () => {
    console.log("Guest Login");
  };

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData(e.target);

    if (!isOtpSend) {
      if (data.get("phone").length === 0) {
        setChangePhoneHasValue(true);
      } else if (data.get("phone").length < 10) {
        setChangePhoneIsEntryMade(true);
        setChangePhoneHasValue(true);
      } else {
        // handle the OTP sending logic 
        dispatch(loginOtpSend());
      }
    } else {
      if (data.get("otp").length === 0) {
        setChangeOtpHasValue(true);
      } else if (data.get("otp").length < 6) {
        setChangeOtpIsEntryMade(true);
        setChangeOtpHasValue(true);
      } else {
        // handle the OTP verification logic here
        console.log("OTP Verified");
        // Reset the Profile for logged in user
        dispatch(closeLogInModal());
        dispatch(loginOtpNotSend());
      }
    }
  };

  return (
    <Form
      guestLogin={true}
      handleSubmit={handleSignIn}
      handleGuestLogin={handleGuestLogin}
      buttonText={isOtpSend ? "VERIFY OTP" : "LOGIN"}
      signingStatement={"By clicking on Login"}
      isOtpSend={isOtpSend}
    >
      <EntryDiv
        type="tel"
        inputMode="numeric"
        purpose={"phone"}
        value={loginFormData.phone}
        onChangeHandler={handleLoginChange}
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
          value={loginFormData.otp}
          onChangeHandler={handleLoginChange}
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
