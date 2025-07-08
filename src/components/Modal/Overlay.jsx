import {selectLogInModal, setHideLocation, setHideLogin} from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Overlay = () => {
    const dispatch = useDispatch();
    const isLoginOpen = useSelector(selectLogInModal);
    const handleClick = () => {
        if (isLoginOpen) dispatch(setHideLogin(true));
        dispatch(setHideLocation(true));

        // window.history.back();
    }

    return <div onClick={handleClick} className="fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-65 z-40"></div>
}

export default Overlay;

