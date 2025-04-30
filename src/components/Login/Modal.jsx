import { useState } from "react";
import { useSelector } from "react-redux";
import ModalSubContainer from "./ModalSubContainer";
import {
  selectlogInModal,
  selectLoginOtp,
} from "../../features/Login/loginSlice";
import Login from "./Login";
import SignUp from "./SignUp";

const Modal = () => {
  const [member, setMember] = useState(true);
  const isOpen = useSelector(selectlogInModal);
  const isLoginOtpSend = useSelector(selectLoginOtp);

  const handleSwitch = () => {
    setMember(!member);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen modal-slide-out bg-white z-50 flex items-start justify-center transform ${
        isOpen && "w-[35%]"
      } transition-all duration-300 ease-in-out`}
    >
      <ModalSubContainer
        member={member}
        handleSwitch={handleSwitch}
        isOtpSend={isLoginOtpSend}
      >
        {member ? <Login /> : <SignUp />}
      </ModalSubContainer>
    </div>
  );
};

export default Modal;

