// Done
import Overlay from "../Modal/Overlay";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { selectLocationModal } from "../../features/Login/loginSlice";

const LocationModal = () => {
    // console.log("LocationModal rendered");
    const isOpen = useSelector(selectLocationModal);
    return ( <>
        <ModalContainer />
        { isOpen && <Overlay /> }
    </>)
};

export default LocationModal;

