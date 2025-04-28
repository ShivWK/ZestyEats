import { useRef, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import EnteryDiv from "./EntryDiv";
import Form from "./Form";
import ModalSubContainer from "./ModalSubContainer";
import { selectlogInModal, closeLogInModal} from "../../features/Login/loginSlice";

const Modal = () => {
  const [member, setMember] = useState(true);
  const [phone1Entry, setPhone1Entry] = useState(false);
  const [phone2Entry, setPhone2Entry] = useState(false);
  const [otp1Entry, setOtp1Entry] = useState(false);
  const [otp2Entry, setOtp2Entry] = useState(false);


  const [isOtpSend, setIsOtpSend] = useState(false);

  const [phone1HasValue, setPhone1HasValue] = useState(false);
  const [otp1HasValue, setOtp1HasValue] = useState(false);

  const phone1InputRef = useRef(null);
  const phone2InputRef = useRef(null);
  const otp1InputRef = useRef(null);
  const otp2InputRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const isOpen = useSelector(selectlogInModal);
  const dispatch = useDispatch();
 
  const handleSwitch = () => {
    setMember(!member);
  };

  // Handle the Login/Verify OTP button click event
  const handleSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOtpSend) {
      // if the OTP is not sent yet
      if (phone1InputRef.current.value.length === 0) {
        setPhone1Entry(false);
        setPhone1HasValue(true);
      } else if (phone1InputRef.current.value.length < 10) {
        setPhone1HasValue(true);
      } else {
        // handle the OTP sending logic here an the isOtpSend state only after the OTP is sent
        setIsOtpSend(true)
      }
    } else {
      // if the OTP is sent
      if (otp1InputRef.current.value.length === 0) {
        setOtp1Entry(false);
        setOtp1HasValue(true);
      } else if (otp1InputRef.current.value.length < 6) {
        setOtp1HasValue(true);
      } else {
        // handle the OTP verification logic here
        console.log("OTP Verified");
        // Reset the Profile for logged in user
        dispatch(closeLogInModal());
        setIsOtpSend(false);
      }
    }

  };

  // Handle the Sign Up button click event
  const handleSignUp = () => {
    console.log("Sign Up");
  };

  const handleGuestLogin = () => {
    console.log("Guest Login");
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    setPhone1Entry(true);
    phone1InputRef.current.focus();
  };

  const handleOtpInputClick = (e) => {
    e.stopPropagation();  
    
    if (member) {
      // will run for login Modal
      setOtp1Entry(true);
      otp1InputRef.current.focus();
    } else {
      // will run for SignUp Modal
      setOtp2Entry(true);
      otp2InputRef.current.focus();
    }
  }

  const handleFocus = () => {
    console.log("Focus");
  };

  // Handle the click event on the modal to check if the input is empty or not
  const handleModelClick = () => {
    if (member) {
      // will run for Login Modal
      if (!isOtpSend) {
        // if the OTP is not sent yet
        if (phone1InputRef.current.value.length > 0) {
          // check if the phone number is valid
          if (phone1InputRef.current.value.length < 10) {
            setPhone1HasValue(true);
          } 
          
        } else {
          setPhone1HasValue(false);
          setPhone1Entry(false);
        }
      } else {
        // if the OTP is sent
        if (otp1InputRef.current.value.length > 0) {
          if (otp1InputRef.current.value.length < 6) {
            setOtp1HasValue(true);
          }

        } else {
          setOtp1HasValue(false);
          setOtp1Entry(false);
        }
      }
      
    } else {
      // will run for Sign Up Modal
     
    }
  };

  // Work for all phone1, phone2 inputs
  // Handle the input event to check if the input is empty or not
  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 10);
  };

  const handleOtpInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 6);
  };

  return (
    <div
      onClick={handleModelClick}
      className={`fixed top-0 right-0 h-screen w-[35%] bg-white z-50 flex items-start justify-center transform 
            ${isOpen ? "modal-slide-enter" : "modal-slide-exit"}`}
    >
      <ModalSubContainer member={member} handleSwitch={handleSwitch} isOtpSend={isOtpSend}>
        {member ? (
          <Form
            guestLogin={true}
            handleClick={handleSignIn}
            handleGuestLogin={handleGuestLogin}
            buttonText={isOtpSend ? "VERIFY OTP" : "LOGIN"}
            signingStatement={"By clicking on Login"}
            isOtpSend={isOtpSend}
          >
            <EnteryDiv
              handleDivClick={handleInputClick}
              hasValue={phone1HasValue}
              inputRef={phone1InputRef}
              handleInput={handlePhoneInput}
              handleFocus={handleFocus}
              placeholder="Phone number"
              fallbackPlacehoder="Enter your phone number"
              focus={phone1Entry}
              isReadOnly={isOtpSend}
            />
            {
              isOtpSend && (
                <EnteryDiv
                  handleDivClick={handleOtpInputClick}
                  hasValue={otp1HasValue}
                  inputRef={otp1InputRef}
                  handleInput={handleOtpInput}
                  handleFocus={handleFocus}
                  placeholder="One Time Password"
                  fallbackPlacehoder="One Time Password"
                  focus={otp1Entry}
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
            {/* <EntryDiv /> */}
          </Form>
        )}
      </ModalSubContainer>
    </div>
  );
};

export default Modal;

// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r
