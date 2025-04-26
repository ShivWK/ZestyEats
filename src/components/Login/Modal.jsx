import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import EnteryDiv from "./EntryDiv";
import Form from "./form";
import ModalSubContainer from "./ModalSubContainer";
import {
  selectlogInModal,
} from "../../features/Login/loginSlice";

const Modal = () => {
  const [member, setMember] = useState(true);
  const [phone, setPhone] = useState(false);
  const [signInPhone, setSignInPhone] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);
  const isOpen = useSelector(selectlogInModal);

  const handleSwitch = () => {
    setMember(!member);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current.value.length === 0) {
      setPhone(false);
      setHasValue(true);
    } else if (inputRef.current.value.length < 10) {
      setHasValue(true);
    } else {
      console.log("Sign In");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up");
  };

  const handleGuestLogin = () => {
    console.log("Guest Login");
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
    setPhone(true);
    inputRef.current.focus();
  };

  const handleFocus = () => {
    console.log("Focus");
  };

  const handleModelClick = () => {
    if (inputRef.current.value.length > 0) {
      setHasValue(true);
    } else {
      setHasValue(false);
      setPhone(false);
    }
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
  };

  return (
    <div
      onClick={handleModelClick}
      className={`fixed top-0 right-0 h-screen w-[35%] bg-white z-50 flex items-start justify-center transform 
            ${isOpen ? "modal-slide-enter" : "modal-slide-exit"}`}
    >
      <ModalSubContainer member={member} handleSwitch={handleSwitch}>
        {member ? (
          <Form
            guestLogin={true}
            handleClick={handleSignIn}
            handleGuestLogin={handleGuestLogin}
            buttonText="LOGIN"
            signingStatement={"By clicking on Login"}
          >
            <EnteryDiv
              handleDivClick={handleInputClick}
              hasValue={hasValue}
              inputRef={inputRef}
              handleInput={handleInput}
              handleFocus={handleFocus}
              placeholder="Phone number"
              fallbackPlacehoder="Enter your phone number"
              focus={phone}
            />
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
