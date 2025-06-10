import Style from "./Modal.module.css";
import { selectHideModel } from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";
import { setLogInModal, setLocationModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";

const Modal = ({ children, modal, isOpen }) => {
  const { loginHide, locationHide } = useSelector(selectHideModel);
  const dispatch = useDispatch();

  return (
    <div
      onAnimationEnd={(event) => {
        const classList = event.target.classList;

        if (classList.contains(Style["hide-right-model"])) {
          dispatch(setLogInModal(false));
        } else if (classList.contains(Style["hide-left-model"])) {
          dispatch(setLocationModal(false));
        }
      }}
      className={`${Style["model"]} ${modal == "left" ? Style["model-left"] : Style["model-right"]
        } ${loginHide ? Style["hide-right-model"] : locationHide ? Style["hide-left-model"] : ""}`}
    >
      {children}
    </div>
  );
};

export default Modal;
