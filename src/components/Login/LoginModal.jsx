import Overlay from "../Modal/Overlay";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { selectLogInModal } from "../../features/Login/loginSlice";
import { memo } from "react";

const LoginModel = memo(() => {
    const isOpen = useSelector(selectLogInModal);
    return <>
        {isOpen && <Overlay />}
        <ModalContainer />
    </>
});

export default LoginModel;

