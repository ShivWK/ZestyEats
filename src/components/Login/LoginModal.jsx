import Overlay from "../Modal/Overlay";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { selectlogInModal } from "../../features/Login/loginSlice";
import { memo } from "react";

const LoginModel = memo(() => {
    const isOpen = useSelector(selectlogInModal);
    return <>
        {isOpen && <Overlay />}
        <ModalContainer />
    </>
});

export default LoginModel;

