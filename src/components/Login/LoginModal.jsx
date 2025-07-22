import Overlay from "../Modal/Overlay";
import ModalContainer from "./ModalContainer";
import { useSelector, useDispatch } from "react-redux";
import { selectLogInModal } from "../../features/Login/loginSlice";
import { memo, useEffect } from "react";
import { setLoginOpened, setModalTrace } from "../../features/Login/loginSlice";

const LoginModel = memo(() => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoginOpened(true));
        dispatch(setModalTrace("login"));
    }, [])

    const isOpen = useSelector(selectLogInModal);
    return <>
        {isOpen && <Overlay />}
        <ModalContainer />
    </>
});

export default LoginModel;

