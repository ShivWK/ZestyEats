import { selectUserDetails } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectDeleteModal, setDeleteModalOpen, setHideDeleteModal } from "../../features/Login/loginSlice";

const DeleteModal = () => {
    const { hideDeleteModal } = useSelector(selectDeleteModal);
    const dispatch = useDispatch();

    const { userEmail }  = useSelector(selectUserDetails);

    const email = `${userEmail.slice(0, 2)}●●●●●●${userEmail.slice(10)}`

    const animationEndHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-hideDeleteModal")) {
            dispatch(setDeleteModalOpen(false));
            dispatch(setHideDeleteModal(false));
        }
    }

    return <div onClick={() => {
        dispatch(setHideDeleteModal(true));
    }} className="absolute top-0 left-0 h-full w-full z-60 bg-black/60 flex items-center justify-center">
        <div onAnimationEnd={animationEndHandler} className={`p-2 bg-white dark:bg-gray-800 ${!hideDeleteModal ? "animate-showDeleteModal" : "animate-hideDeleteModal"} w-[70%] lg:w-[25%] rounded-md`}>
            <p className="text-black dark:text-gray-200 text-center">{`OTP is send to your registered email ${email}`}</p>

            
        </div>
    </div>
}

export default DeleteModal;