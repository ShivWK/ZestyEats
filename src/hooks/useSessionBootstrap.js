import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAppLoading, setIsLoggedIn } from '../features/Login/loginSlice';

import {
    addRecentLocations,
    setUserDetails,
    setIsLoggedInHome,
    selectDeviceFingerPrint
} from '../features/home/homeSlice';

import {
    addToWishlistItem,
    toggleItemsToBeAddedInCart,
    setFavoriteRestaurant,
    setItemToCart,
    setIsLoggedInRestro,
} from '../features/home/restaurantsSlice';

import UpdateStorage from '../utils/UpdateStorage';

export const useSessionBootstrap = () => {
    const deviceFingerPrint = useSelector(selectDeviceFingerPrint);

    const dispatch = useDispatch();

    useEffect(() => {
        const createGuestSession = async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/user/session`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-device-id': deviceFingerPrint,
                        'x-user-agent': navigator.userAgent,
                        'x-language': navigator.language,
                        'x-resolution': `${screen.height}x${screen.width}`,
                    },
                    credentials: 'include',
                },
            );

            const data = await res.json();
            console.log(data.data.sessionId);
        };

        const handleGuestSession = async () => {
            try {
                //get the guest session data
                dispatch(setAppLoading(true));
                const result = await fetch(
                    `${import.meta.env.VITE_BASE_URL}/api/user/session`,
                    {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-device-id': deviceFingerPrint,
                            'x-user-agent': navigator.userAgent,
                            'x-language': navigator.language,
                            'x-resolution': `${screen.height}x${screen.width}`,
                        },
                    },
                );

                const sessionData = await result.json();

                if (sessionData.auth === false) {
                    dispatch(setIsLoggedIn(false));
                    dispatch(setIsLoggedInHome(false));
                    dispatch(setIsLoggedInRestro(false));

                    const data = sessionData.data.data;

                    UpdateStorage({
                        data,
                        dispatch,
                        setItemToCart,
                        toggleItemsToBeAddedInCart,
                        setFavoriteRestro: setFavoriteRestaurant,
                        addRecentLocations,
                        addToWishlistItem,
                    });
                } else if (sessionData.auth === true) {
                    dispatch(setIsLoggedIn(true));
                    dispatch(setIsLoggedInHome(true));
                    dispatch(setIsLoggedInRestro(true));

                    const userData = sessionData.data;

                    const userProfileData = {
                        userName: userData.name,
                        userEmail: userData.email,
                        userPhone: userData.phone,
                        isEmailVerified: userData.isEmailVerified,
                        isPhoneVerified: userData.isNumberVerified,
                    };

                    dispatch(setUserDetails(userProfileData));
                    dispatch(setAppLoading(false));

                    try {
                        const response = await fetch(
                            `${import.meta.env.VITE_BASE_URL}/api/userActivity/userActivityData`,
                            {
                                method: 'GET',
                                headers: {
                                    'x-device-id': deviceFingerPrint,
                                    'x-user-agent': navigator.userAgent,
                                    'x-language': navigator.language,
                                    'x-resolution': `${screen.height}x${screen.width}`,
                                },
                                credentials: 'include',
                            },
                        );

                        const respData = await response.json();

                        if (!response.ok) throw new Error(respData.message);
                        const data = respData.data;

                        UpdateStorage({
                            data,
                            dispatch,
                            setItemToCart,
                            toggleItemsToBeAddedInCart,
                            setFavoriteRestro: setFavoriteRestaurant,
                            addRecentLocations,
                            addToWishlistItem,
                        });
                    } catch (err) {
                        console.log('Failed get user Activity data', err);
                    }
                }
            } catch (err) {
                console.error('Session error', err);
            }
        };

        createGuestSession();
        handleGuestSession();
    }, [deviceFingerPrint, dispatch]);

}