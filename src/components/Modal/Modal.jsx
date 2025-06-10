import Style from "./Modal.module.css";

const Modal = ({ children, modal, isOpen }) => {

  return (
    <div
      className={`${modal == "left" ? Style["modal-left"] : Style["modal-right"]
        }`}
    >
      {children}
    </div>
  );
};

export default Modal;
