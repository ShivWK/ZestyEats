import { closeLogInModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";

const Overlay = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(closeLogInModal())
    }

    return <div onClick={handleClick} className="fixed inset-0 top-0 left-0 w-full h-full bg-black opacity-50 z-10 transition-opacity"></div>
}

export default Overlay;

