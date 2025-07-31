import { Suspense, lazy } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
import LoginModal from "./Login/LoginModal";
import LocationInfoModal from "./Location/LocationInfoModal";

import LocationModal from "./Location/LocationModal";
import { toast } from "react-toastify";

import {
  selectLogInModal,
  selectLocationModal,
  setHideLocation,
  setHideLogin,
  selectLocationInfoModal,
  setLocationInfoModalReason,
  setLocationInfoModal
} from "../features/Login/loginSlice";

import {
  setOnline,
  setLoading,
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
  selectDpModel,
  setDpModelHide,
  addRecentLocations,
  setCurrentTheme,
  selectDeviceFingerPrint
} from "../features/home/homeSlice";

import {
  selectMenuModel,
  setRestaurantItems,
  addToWishlistItem,
  toggleItemsToBeAddedInCart,
  setFavoriteRestro,
  setItemToCart,
  setHideMenu,
  toggleMenuModel
} from "../features/home/restaurantsSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useTrackNavigation from "../utils/useTrackNavigation";
import { updateHomeRestaurantData } from "../utils/updateHomeData";
import { useLazyGetHomePageDataQuery } from "../features/home/homeApiSlice";
import { useLazyLocationByCoordinatesQuery } from "../features/home/searchApiSlice";
import { updateCurrentCity } from "../utils/addCurrentCity";
import updateCityHomeData from "../utils/updateCityHomeData";
import { setLocalityLatAndLng } from "../features/cityHome/cityHomeSlice";
import useOnlineStatus from "../utils/useOnlineStatus";

export const fetchDefaultHomeAPIData = async (triggerHomeAPI, dispatch, isLocationModelOpen) => {
  try {
    let apiResponse = await triggerHomeAPI({
      lat: 12.9715987,
      lng: 77.5945627,
    }).unwrap();
    if (!apiResponse) return;
    if (isLocationModelOpen) dispatch(setHideLocation(true))
    updateHomeRestaurantData(apiResponse, dispatch, 12.9715987, 77.5945627);
  } catch (err) {
    if (isLocationModelOpen) dispatch(setHideLocation(true))
    dispatch(setLoading(false));
    alert(err.error);
  }
};

export default function Layout() {
  const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
  const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const dpModel = useSelector(selectDpModel);
  const isLocationModelOpen = useSelector(selectLocationModal);
  const menuModel = useSelector(selectMenuModel)
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { OpenLocationInfoModal } = useSelector(selectLocationInfoModal)
  const deviceFingerPrint = useSelector(selectDeviceFingerPrint);

  useTrackNavigation();

  useEffect(() => {
    const createGuestSession = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-device-id": deviceFingerPrint,
          "x-user-agent": navigator.userAgent,
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data.data.sessionId);
    }

    setTimeout(createGuestSession, 1000)
  }, [])

  useEffect(() => {
    const HomeData = JSON.parse(localStorage.getItem("HomeAPIData"));
    const CityHomeData = JSON.parse(localStorage.getItem("CityHomeData"))
    const lat = JSON.parse(localStorage.getItem("lat"));
    const lng = JSON.parse(localStorage.getItem("lng"));
    const rawUserPathHistory = localStorage.getItem("userFriendlyPathHistory");
    const restaurantAllItems = JSON.parse(localStorage.getItem("RestaurantAllItems"));
    // const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    // const itemsToBeAddedToCart = JSON.parse(localStorage.getItem("ItemsToBeAddedInCart"));
    const localityLatLng = JSON.parse(localStorage.getItem("localityLatLng"));
    const theme = localStorage.getItem("theme");
    // const cartItems = JSON.parse(localStorage.getItem("CartItems"));

    let userPathHistory = '';

    if (rawUserPathHistory !== "undefined") {
      userPathHistory = JSON.parse(rawUserPathHistory);
    }

    const pathHistory = JSON.parse(localStorage.getItem("pathHistory"));

    if (HomeData && lat && lng) {
      updateHomeRestaurantData(HomeData, dispatch, lat, lng, userPathHistory, pathHistory);
      updateCityHomeData(CityHomeData, dispatch);

      const searchedCity = JSON.parse(localStorage.getItem("searchedCity"));
      const searchedCityAddress = JSON.parse(localStorage.getItem("searchedCityAddress"));
      const currentCity = JSON.parse(localStorage.getItem("currentCity"));
      // const favRestros = JSON.parse(localStorage.getItem("favRestros"));

      // when asked data is not present in the local storage the it will null instead of undefined

      if (searchedCity !== undefined && searchedCity !== null) dispatch(addSearchedCity(searchedCity));
      if (searchedCityAddress !== undefined && searchedCityAddress !== null) dispatch(addSearchedCityAddress(searchedCityAddress));
      if (currentCity !== undefined && currentCity !== null) dispatch(addYourCurrentCity(currentCity));

      if (restaurantAllItems !== undefined && restaurantAllItems !== null) dispatch(setRestaurantItems(restaurantAllItems));

      if (theme !== undefined && theme !== null) dispatch(setCurrentTheme(theme));

      // if (wishlist !== undefined && wishlist !== null) dispatch(addToWishlistItem({ mode: "initial", object: wishlist }));

      // if (itemsToBeAddedToCart !== undefined && itemsToBeAddedToCart !== null) dispatch(toggleItemsToBeAddedInCart({ mode: "initial", object: itemsToBeAddedToCart }));

      // if (favRestros !== undefined && favRestros !== null) dispatch(setFavoriteRestro({ mode: "initial", object: favRestros }));

      if (localityLatLng !== undefined && localityLatLng !== null) dispatch(setLocalityLatAndLng(localityLatLng));

      // if (cartItems !== undefined && cartItems !== null) dispatch(setItemToCart({ mode: "initial", object: cartItems }));

    } else if (navigator.geolocation) {
      toast.info("Please allow location to show nearby results.", {
        autoClose: 1000,
        style: {
          backgroundColor: "#ff5200",
          fontWeight: "semibold",
          color: "white",
        },
        progressClassName: "progress-style",
      });
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;

        try {
          const data = await triggerLocationByCoordinates({
            lat1,
            lng1,
          }).unwrap();

          updateCurrentCity(data, dispatch);

          const lat = data?.data?.[0]?.geometry?.location?.lat;
          const lng = data?.data?.[0]?.geometry?.location?.lng;

          try {
            const res2 = await triggerHomeAPI({ lat, lng }).unwrap();
            updateHomeRestaurantData(res2, dispatch, lat, lng);
          } catch (err) {
            console.error("ERROR in fetching data", err);
            dispatch(setLocationInfoModalReason("error"))
            dispatch(setLocationInfoModal(true))
          }
        } catch (err) {
          console.log("Error fetching current location data.", err);
          dispatch(setLocationInfoModalReason("error"))
          dispatch(setLocationInfoModal(true))
        }
      },
        err => {
          if (err.code === err.TIMEOUT) {
            dispatch(setLocationInfoModalReason("error"))
            dispatch(setLocationInfoModal(true))
          } else if (err.code === err.PERMISSION_DENIED) {
            dispatch(setLocationInfoModalReason("permission"))
            dispatch(setLocationInfoModal(true))
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            dispatch(setLocationInfoModalReason("error"))
            dispatch(setLocationInfoModal(true))
          } else {
            dispatch(setLocationInfoModalReason("error"))
            dispatch(setLocationInfoModal(true))
          }
        },
        {
          timeout: 5000, // works when user give input to fetch location but api took more than given time
          enableHighAccuracy: false,
          maximumAge: 20000
        }
      );
    } else {
      dispatch(setLocationInfoModalReason("error"))
      dispatch(setLocationInfoModal(true))
    }

    // const deviceId = `${navigator.userAgent} | ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

    const handleGuestSession = async () => {
      try {
        //get the guest session data
        const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/session`, {
          method: "GET",
          credentials: "include"
        });

        const sessionData = await result.json();
        const mainData = sessionData.data.data;

        const cartItems = mainData?.cartItems;
        if (cartItems !== undefined && cartItems !== null) dispatch(setItemToCart({ mode: "initial", object: cartItems }));

        const itemsToBeAddedInCart = mainData?.itemsToBeAddedInCart;
        if (itemsToBeAddedInCart !== undefined && itemsToBeAddedInCart !== null) dispatch(toggleItemsToBeAddedInCart({ mode: "initial", object: itemsToBeAddedInCart }));

        const favRestaurants = mainData?.favRestaurants;
        if (favRestaurants !== undefined && favRestaurants !== null && favRestaurants.length !== 0) dispatch(setFavoriteRestro({ mode: "initial", object: favRestaurants }));

        const recentLocations = mainData?.recentLocations;
        if (recentLocations !== undefined && recentLocations !== null) dispatch(addRecentLocations(recentLocations));

        const wishlist = mainData?.wishListedItems;
        if (wishlist !== undefined && wishlist !== null) dispatch(addToWishlistItem({ mode: "initial", object: wishlist }));

        // console.log("Session data", mainData);
        // console.log("cartItems", cartItems);
        // console.log("itemsToBeAddedToCart", itemsToBeAddedInCart);
        // console.log("favRestaurants", favRestaurants);
        // console.log("recentLocation", recentLocations);
        // console.log("wishlist", wishlist);

      } catch (err) {
        console.error("Session error", err)
      }
    }

    handleGuestSession();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const scrollbarWidth = (window.innerWidth - html.clientWidth) + "px";

    const isLargeScreen = window.innerWidth >= 768;

    if (isLoginOpen || isLocationOpen || menuModel || OpenLocationInfoModal) {
      html.classList.add("overflow-hidden");
      html.style.paddingRight = isLargeScreen ? scrollbarWidth : "0px";
    } else {
      html.classList.remove("overflow-hidden");
      html.style.paddingRight = "0px";
    }

    return () => {
      html.classList.remove("overflow-hidden");
      html.style.paddingRight = "0px";
    };

  }, [isLoginOpen, isLocationOpen, menuModel, OpenLocationInfoModal]);

  useEffect((e) => {
    const handleModelClose = (e) => {
      if (isLoginOpen) {
        dispatch(setHideLogin(true))
      } else if (isLocationOpen) {
        dispatch(setHideLocation(true));
      } else if (menuModel) {
        dispatch(toggleMenuModel());
      }
    }

    window.addEventListener("popstate", handleModelClose);
    return () => window.removeEventListener("popstate", handleModelClose);

  }, [isLoginOpen, isLocationOpen, menuModel])

  return (
    <>
      <PageHeader />
      <Outlet />

      {isLoginOpen && (<LoginModal />)}
      {isLocationOpen && (<LocationModal />)}

      <PageFooter />

      {OpenLocationInfoModal && <LocationInfoModal />}
    </>
  );
}

