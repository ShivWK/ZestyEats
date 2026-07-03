import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLogInModal, selectLocationModal, setHideLogin, setHideLocation } from "../features/Login/loginSlice";
import { selectMenuModel, toggleMenuModel } from "../features/home/restaurantsSlice";


export const useEscapeModalClose = () => {
    const isLoginOpen = useSelector(selectLogInModal);
    const isLocationModelOpen = useSelector(selectLocationModal);
    const isMenuModelOpen = useSelector(selectMenuModel);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScapeDown = (e) => {
            if (e.key === 'Escape') {
                if (isLoginOpen) {
                    dispatch(setHideLogin(true));
                }
                if (isLocationModelOpen) {
                    dispatch(setHideLocation(true));
                }
                if (isMenuModelOpen) {
                    dispatch(toggleMenuModel());
                }

                window.history.back();
            }
        };

        document.addEventListener('keydown', handleScapeDown);
        return () => document.removeEventListener('keydown', handleScapeDown);
    }, [isLoginOpen, isLocationModelOpen, isMenuModelOpen, dispatch]);
}