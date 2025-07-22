import { useSelector, useDispatch } from "react-redux";
import { selectModalTrace, setLoginOpened, setModalTrace } from "../features/Login/loginSlice";
import { useEffect } from "react";

const ModalTrace = () => {
    const modalTrace = useSelector(selectModalTrace);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalTrace[0] === "login" && modalTrace[1] === "terms") {
            setTimeout(() => {
                dispatch(setLoginOpened(false));
                dispatch(setModalTrace({mode: "empty"}))
                window.history.back();
            }, 200)
        }
    }, [])
}

export default ModalTrace