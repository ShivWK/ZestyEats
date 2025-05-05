import Modal from "../Modal/Modal"
import ModalSubContainer from "./LocationModalSubContainer";
import { useSelector } from "react-redux";
import { selectLocationModal } from "../../features/Login/loginSlice";

const ModalContainer = () => {
    const isOpen = useSelector(selectLocationModal);
    return (
        <Modal modal={"left"} isOpen={isOpen}>{
            <ModalSubContainer />
        }</Modal>
    )
}

export default ModalContainer;