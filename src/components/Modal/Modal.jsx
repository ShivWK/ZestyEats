import Style from "./Modal.module.css";
import { loginOtpSend, selectHideModel, setErrorMessage, signUpOtpSend } from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";
import { setLogInModal, setLocationModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";

const Modal = ({ children, modal }) => {
  const { loginHide, locationHide } = useSelector(selectHideModel);
  const dispatch = useDispatch();

  return (
    <div
      onAnimationEnd={(event) => {
        const classList = event.target.classList;

        if (classList.contains(Style["hide-right-model"])) {
          dispatch(setLogInModal(false));
          dispatch(loginOtpSend(false));
        } else if (classList.contains(Style["hide-left-model"])) {
          dispatch(setLocationModal(false));
          dispatch(signUpOtpSend(false))
        }
        dispatch(setErrorMessage(null));
      }}
      className={`dark:bg-gray-800 bg-white ${Style["model"]} ${modal == "left" ? Style["model-left"] : Style["model-right"]
        } ${loginHide ? Style["hide-right-model"] : locationHide ? Style["hide-left-model"] : ""}`}
    >
      {children}
    </div>
  );
};

export default Modal;
