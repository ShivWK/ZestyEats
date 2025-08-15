import { selectEditModal, setOpenEditModal, setHideEditModal } from "../../features/Login/loginSlice";
import { useSelector, useDispatch } from "react-redux";

const EditModal = ({ Component }) => {
    const { hideEditModal } = useSelector(selectEditModal);
    const dispatch = useDispatch();

    const animationEndHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-hideDeleteModal")) {
            dispatch(setOpenEditModal(false));
            dispatch(setHideEditModal(false));
        }
    }

    return <div onClick={() => dispatch(setHideEditModal(true))} className="absolute top-0 left-0 h-full w-full z-60 bg-black/60 flex items-center justify-center">
        <div
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={animationEndHandler}
            className={`p-3 bg-white dark:bg-gray-800 ${!hideEditModal ? "animate-showDeleteModal" : "animate-hideDeleteModal"} w-[80%] lg:w-[25%] rounded-md`}>
            {<Component />}
        </div>
    </div>
}

export default EditModal;