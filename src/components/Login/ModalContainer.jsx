import { useDispatch, useSelector } from "react-redux";
import ModalSubContainer from "./ModalSubContainer";
import {
  selectlogInModal,
  selectLoginOtp,
  selectIsMember,
  setMember
} from "../../features/Login/loginSlice";
import Login from "./Login";
import SignUp from "./SignUp";
import Modal from "../Modal/Modal";
import { useCallback } from "react";

const ModalContainer = () => {
  const isOpen = useSelector(selectlogInModal);
  const isLoginOtpSend = useSelector(selectLoginOtp);
  const member = useSelector(selectIsMember);
  const dispatch = useDispatch();

  const handleSwitch = useCallback(() => {
    dispatch(setMember(!member));
  }, [dispatch, member, setMember]);

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

