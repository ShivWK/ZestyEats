import Overlay from "../Modal/Overlay";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { selectlogInModal } from "../../features/Login/loginSlice";

const LoginModel = () => {
    const isOpen = useSelector(selectlogInModal);
    return <>
        {isOpen && <Overlay />}
        <ModalContainer />
    </>
}

export default LoginModel;

