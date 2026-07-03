import { useEffect } from "react";
import { useDispatch } from "react-redux";
import updateCityHomeData from '../utils/updateCityHomeData';
import { getItemFromLocalStorage } from "../utils/accessLocalStorage";

import {
  setLocationInfoModalReason,
  setLocationInfoModal,
  setIsLoggedIn,
} from '../features/Login/loginSlice';

import {
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
  setUserFriendlyPathHistory,
  setPathHistory
} from '../features/home/homeSlice';

import {
  setRestaurantItems,
  addToWishlistItem,
  toggleItemsToBeAddedInCart,
  setFavoriteRestaurant,
  setItemToCart,
} from '../features/home/restaurantsSlice';

import { setLocalityLatAndLng } from '../features/cityHome/cityHomeSlice';

import { useLazyGetHomePageDataQuery } from '../features/home/homeApiSlice';
import { useLazyLocationByCoordinatesQuery } from '../features/home/searchApiSlice';
import { getDataByCoordinates } from '../utils/getDataByCoordinates';

export const useHomeInitialization = () => {
  const dispatch = useDispatch();

  const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
  const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();

  useEffect(() => {
    const initializeHome = async () => {
      const CityHomeData = getItemFromLocalStorage('CityHomeData');
      const lat = getItemFromLocalStorage('lat');
      const lng = getItemFromLocalStorage('lng');
      const userPathHistory = getItemFromLocalStorage('userFriendlyPathHistory') || "";
      const restaurantAllItems = getItemFromLocalStorage('restaurantAllItems');
      const wishlist = getItemFromLocalStorage('wishlist');
      const itemsToBeAddedToCart = getItemFromLocalStorage('ItemsToBeAddedInCart');
      const localityLatLng = getItemFromLocalStorage('localityLatLng');
      const cartItems = getItemFromLocalStorage('CartItems');
      const pathHistory = getItemFromLocalStorage('pathHistory') || "";

      if (lat && lng) {
        console.log("Called with", lat, lng)

        await getDataByCoordinates(lat, lng, dispatch, triggerLocationByCoordinates, triggerHomeAPI);
        updateCityHomeData(CityHomeData, dispatch);

        dispatch(setPathHistory(pathHistory));
        dispatch(setUserFriendlyPathHistory(userPathHistory));

        const searchedCity = getItemFromLocalStorage('searchedCity');
        const searchedCityAddress = getItemFromLocalStorage('searchedCityAddress');
        const currentCity = getItemFromLocalStorage('currentCity');
        const likedRestaurants = getItemFromLocalStorage('favRestros');
        const auth = getItemFromLocalStorage('auth');

        if (searchedCity != null) dispatch(addSearchedCity(searchedCity));
        if (searchedCityAddress != null) dispatch(addSearchedCityAddress(searchedCityAddress));
        if (currentCity != null) dispatch(addYourCurrentCity(currentCity));

        if (auth != null) {
          if (auth === 'true') dispatch(setIsLoggedIn(true));
          else dispatch(setIsLoggedIn(false));
        }

        if (restaurantAllItems != null) dispatch(setRestaurantItems(restaurantAllItems));
        if (wishlist != null) dispatch(addToWishlistItem({ mode: 'initial', object: wishlist }));

        if (itemsToBeAddedToCart != null) {
          dispatch(
            toggleItemsToBeAddedInCart({
              mode: 'initial',
              object: itemsToBeAddedToCart,
            }),
          );
        }

        if (likedRestaurants != null) {
          dispatch(
            setFavoriteRestaurant({ mode: 'initial', object: likedRestaurants }),
          );
        }

        if (localityLatLng != null) dispatch(setLocalityLatAndLng(localityLatLng));
        if (cartItems != null) dispatch(setItemToCart({ mode: 'initial', object: cartItems }));

      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            await getDataByCoordinates(lat, lng, dispatch, triggerLocationByCoordinates, triggerHomeAPI);
          },
          (err) => {
            console.log("Error in getting location", err)
            if (err.code === err.TIMEOUT) {
              dispatch(setLocationInfoModalReason('error'));
              dispatch(setLocationInfoModal(true));
            } else if (err.code === err.PERMISSION_DENIED) {
              dispatch(setLocationInfoModalReason('permission'));
              dispatch(setLocationInfoModal(true));
            } else if (err.code === err.POSITION_UNAVAILABLE) {
              dispatch(setLocationInfoModalReason('error'));
              dispatch(setLocationInfoModal(true));
            } else {
              dispatch(setLocationInfoModalReason('error'));
              dispatch(setLocationInfoModal(true));
            }
          },
          {
            timeout: 5000,
            enableHighAccuracy: false,
            maximumAge: 20000,
          },
        );
      } else {
        dispatch(setLocationInfoModalReason('error'));
        dispatch(setLocationInfoModal(true));
      }
    }

    initializeHome()
  }, [triggerHomeAPI, triggerLocationByCoordinates, dispatch]);
}
