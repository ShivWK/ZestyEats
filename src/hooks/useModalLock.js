import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectLogInModal,
    selectLocationModal,
    selectLocationInfoModal,
    selectDeleteModal,
    selectEditModal,
} from '../features/Login/loginSlice';

import {
  selectMenuModel,
} from '../features/home/restaurantsSlice';

import { selectEditAddressModal } from '../features/delivery/deliverySlice';

export const useModalLock = () => {
    const isLoginOpen = useSelector(selectLogInModal);
    const isLocationOpen = useSelector(selectLocationModal);
    const menuModel = useSelector(selectMenuModel);
    const { OpenLocationInfoModal } = useSelector(selectLocationInfoModal);
    const editAddressModal = useSelector(selectEditAddressModal);
    const { deleteModal } = useSelector(selectDeleteModal);
    const { openEditModal } = useSelector(selectEditModal);

    useEffect(() => {
        const html = document.documentElement;
        const scrollbarWidth = window.innerWidth - html.clientWidth + 'px';
        const isLargeScreen = window.innerWidth >= 768;

        if (
            isLoginOpen ||
            isLocationOpen ||
            menuModel ||
            OpenLocationInfoModal ||
            editAddressModal ||
            deleteModal ||
            openEditModal
        ) {
            html.classList.add('overflow-hidden');
            html.style.paddingRight = isLargeScreen ? scrollbarWidth : '0px';
        } else {
            html.classList.remove('overflow-hidden');
            html.style.paddingRight = '0px';
        }

        return () => {
            html.classList.remove('overflow-hidden');
            html.style.paddingRight = '0px';
        };
    }, [
        isLoginOpen,
        isLocationOpen,
        menuModel,
        OpenLocationInfoModal,
        editAddressModal,
        deleteModal,
        openEditModal
    ]);
}