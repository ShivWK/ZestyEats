import { selectUserDetails } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectDeleteModal, setDeleteModalOpen, setHideDeleteModal } from "../../features/Login/loginSlice";
import { useState } from "react";
import DotBounceLoader from "../../utils/DotBounceLoader";
import OtpEntry from "./OtpEntry";

const DeleteModal = () => {
    const [verifyLoading, setVErifyLOading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { hideDeleteModal } = useSelector(selectDeleteModal);
    const dispatch = useDispatch();

    const { userEmail } = useSelector(selectUserDetails);

    const email = `${userEmail.slice(0, 2)}●●●●●●${userEmail.slice(10)}`

    const animationEndHandler = (e) => {
        const classList = e.target.classList;

        if (classList.contains("animate-hideDeleteModal")) {
            dispatch(setDeleteModalOpen(false));
            dispatch(setHideDeleteModal(false));
        }
    }

    const cancelClickHandler = () => {

    }

    return <div onClick={() => {
        dispatch(setHideDeleteModal(true));
    }} className="absolute top-0 left-0 h-full w-full z-60 bg-black/60 flex items-center justify-center">
        <div onAnimationEnd={animationEndHandler} className={`p-3 bg-white dark:bg-gray-800 ${!hideDeleteModal ? "animate-showDeleteModal" : "animate-hideDeleteModal"} w-[80%] lg:w-[25%] rounded-md`}>
            <p className="text-black dark:text-gray-200 text-center">{`OTP is send to your email ${email}`}</p>

            <OtpEntry count={6} />

            <div className="flex items-center justify-between mt-1.5">

                <button
                    onClick={() => dispatch(setHideDeleteModal(true))}
                    className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-green-500 rounded-md cursor-pointer hover:bg-green-600 transition-all duration-100 ease-linear">
                    Cancel
                </button>

                <button
                    className="basis-[48%] h-8 text-white font-bold tracking-wider flex items-center justify-center bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-100 ease-linear">
                    {verifyLoading ? <DotBounceLoader /> : "Verify"}
                </button>
            </div>

        </div>
    </div>
}

export default DeleteModal;