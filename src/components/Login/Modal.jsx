import { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import EntryDiv from "./EntryDiv";
import Form from "./Form";
import ModalSubContainer from "./ModalSubContainer";
import { selectlogInModal, closeLogInModal} from "../../features/Login/loginSlice";

const Modal = () => {
  const [member, setMember] = useState(true);
  const [changePhoneIsEntryMade, setChangePhoneIsEntryMade] = useState(false);
  const [changePhoneHasValue, setChangePhoneHasValue] = useState(false);
  const [changeOtpIsEntryMade, setChangeOtpIsEntryMade] = useState(false);
  const [changeOtpHasValue, setChangeOtpHasValue] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);

  const isOpen = useSelector(selectlogInModal);
  const dispatch = useDispatch();
 
  const handleSwitch = () => {
    setMember(!member);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData(e.target);

    if (!isOtpSend) {
      // if the OTP is not sent yet
      
      if (data.get("phone").length === 0) {
        setChangePhoneIsEntryMade(true);
        setChangePhoneHasValue(true);
      } else if (data.get("phone").length < 10) {
        setChangePhoneHasValue(true);
      } else {
        // handle the OTP sending logic here an the isOtpSend state only after the OTP is sent
        setIsOtpSend(true)
      }
    } else {
      // if the OTP is sent
      if (data.get("otp").length === 0) {
        setChangeOtpHasValue(true);
        setChangeOtpIsEntryMade(true);
      } else if (data.get("otp").length < 6) {
        setChangeOtpHasValue(true);
      } else {
        // handle the OTP verification logic here
        console.log("OTP Verified");
        // Reset the Profile for logged in user
        dispatch(closeLogInModal());
        setIsOtpSend(false);
      }
    }
  }
  
  // Handle the Sign Up button click event
  const handleSignUp = () => {
    console.log("Sign Up");
  };

  const handleGuestLogin = () => {
    console.log("Guest Login");
  };

  const handleFocus = () => {
    console.log("Focus");
  };

  return (
    <div
      // onClick={handleModelClick}
      className={`fixed top-0 right-0 h-screen modal-slide-out bg-white z-50 flex items-start justify-center transform
            ${isOpen && "w-[35%]"} transition-all duration-300 ease-in-out`}  
    >
      <ModalSubContainer member={member} handleSwitch={handleSwitch} isOtpSend={isOtpSend}>
        {member ? (
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
              handleFocus={handleFocus}
              placeholder="Phone number"
              fallbackPlacehoder="Enter your phone number"
              isReadOnly={isOtpSend}
              changeIsEntryMade={changePhoneIsEntryMade}
              changeHasValue={changePhoneHasValue}
            />
            {
              isOtpSend && (
                <EntryDiv
                  type="text"
                  inputMode="numeric"
                  purpose={"otp"}
                  handleFocus={handleFocus}
                  placeholder="One Time Password"
                  fallbackPlacehoder="One Time Password"
                  changeIsEntryMade={changeOtpIsEntryMade}
                  changeHasValue={changeOtpHasValue}
                />
              )
            }

          </Form>
        ) : (
          <Form
            guestLogin={false}
            handleClick={handleSignUp}
            buttonText="CONTINUE"
            signingStatement={"By creating an account"}
          >
            {/* <EntryDiv
                  handleDivClick={handleInputClick}
                  type={"tel"}
                  inputMode={"numeric"}
                  hasValue={otp1HasValue}
                  inputRef={otp1InputRef}
                  handleInput={handleOtpInput}
                  handleFocus={handleFocus}
                  placeholder="One Time Password"
                  fallbackPlacehoder="One Time Password"
                  focus={otp1Entry}
                />
            <EntryDiv
                  handleDivClick={handleOtpInputClick}
                  type={"text"}
                  inputMode={"text"}
                  hasValue={otp1HasValue}
                  inputRef={otp1InputRef}
                  handleInput={handleOtpInput}
                  handleFocus={handleFocus}
                  placeholder="One Time Password"
                  fallbackPlacehoder="One Time Password"
                  focus={otp1Entry}
                />
            <EntryDiv
                  handleDivClick={handleOtpInputClick}
                  type={"email"}
                  inputMode={"text"}
                  hasValue={otp1HasValue}
                  inputRef={otp1InputRef}
                  handleInput={handleOtpInput}
                  handleFocus={handleFocus}
                  placeholder="One Time Password"
                  fallbackPlacehoder="One Time Password"
                  focus={otp1Entry}
                /> */}
          </Form>
        )}
      </ModalSubContainer>
    </div>
  );
};

export default Modal;

// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r
