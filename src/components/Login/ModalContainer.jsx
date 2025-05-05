import { useState } from "react";
import { useSelector } from "react-redux";
import ModalSubContainer from "./ModalSubContainer";
import {
  selectlogInModal,
  selectLoginOtp,
} from "../../features/Login/loginSlice";
import Login from "./Login";
import SignUp from "./SignUp";
import Modal from "../Modal/Modal";

const ModalContainer = () => {
  const [member, setMember] = useState(true);
  const isOpen = useSelector(selectlogInModal);
  const isLoginOtpSend = useSelector(selectLoginOtp);

  const handleSwitch = () => {
    setMember(!member);
  };

  return (
    <Modal modal={"right"} isOpen={isOpen}>
      <ModalSubContainer
        member={member}
        handleSwitch={handleSwitch}
        isOtpSend={isLoginOtpSend}
      >
        {member ? <Login /> : <SignUp />}
      </ModalSubContainer>
    </Modal>
  );
};

export default ModalContainer;

