import Overlay from "../Modal/Overlay";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { selectLocationModal } from "../../features/Login/loginSlice";

const LocationMaodal = () => {
    const isOpen = useSelector(selectLocationModal);
    return ( <>
        <ModalContainer />
        { isOpen && <Overlay /> }
    </>)
}

export default LocationMaodal;

