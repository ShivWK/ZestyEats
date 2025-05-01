import Modal from "../Modal/Modal"
import ModalSubContainer from "./modalSubContainer";

const ModalContainer = () => {
    return (
        <Modal modal={"left"}>{
            <ModalSubContainer />
        }</Modal>
    )
}

export default ModalContainer;