import { useSelector } from "react-redux";
import Style from "./Modal.module.css";
import {
  selectLocationModal,
  selectlogInModal,
} from "../../features/Login/loginSlice";

const Modal = ({ children, modal }) => {
  const isLoginOpen = useSelector(selectlogInModal);
  const isLocationOpen = useSelector(selectLocationModal);

  return (
    <div
      className={`${
        modal == "left" ? Style["modal-left"] : Style["modal-right"]
      } ${(isLoginOpen || isLocationOpen) && Style["show-modal"]}`}
    >
        {children}
    </div>
  );
};

export default Modal;
