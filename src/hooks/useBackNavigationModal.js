import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    selectLogInModal,
    selectLocationModal,
    setHideLocation,
    setHideLogin,
} from '../features/Login/loginSlice';

import { selectMenuModel, toggleMenuModel } from '../features/home/restaurantsSlice';

export const useBackNavigationModal = () => {
    const isLoginOpen = useSelector(selectLogInModal);
    const isLocationOpen = useSelector(selectLocationModal);
    const menuModel = useSelector(selectMenuModel);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleModelClose = () => {
            if (isLoginOpen) {
                dispatch(setHideLogin(true));
            } else if (isLocationOpen) {
                dispatch(setHideLocation(true));
            } else if (menuModel) {
                dispatch(toggleMenuModel());
            }
        };

        window.addEventListener('popstate', handleModelClose);
        return () => window.removeEventListener('popstate', handleModelClose);
    }, [isLoginOpen, isLocationOpen, menuModel, dispatch]);
}