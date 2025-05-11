import { closeLocationInModal, closeLogInModal, selectlogInModal } from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Overlay = () => {
    const dispatch = useDispatch();
    const isLoginOpen = useSelector(selectlogInModal);
    const handleClick = () => {
        if (isLoginOpen) dispatch(closeLogInModal());
        dispatch(closeLocationInModal())
    }

    return <div onClick={handleClick} className="fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-65 z-40 transition-opacity"></div>
}

export default Overlay;

