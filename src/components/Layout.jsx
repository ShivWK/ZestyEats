import { Suspense, lazy } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
const LoginModal = lazy(() => import("./Login/LoginModal"));
const LocationModal = lazy(() => import("./Location/LocationModal"));
import { toast } from "react-toastify";

import {
  selectLogInModal,
  selectLocationModal,
  selectHoverState,
  setHideLocation,
  setHideLogin
} from "../features/Login/loginSlice";

import {
  setOnline,
  setLoading,
  selectPathHistory,
  setUserFriendlyPathHistory,
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
  selectDpModel,
  setDpModelHide
} from "../features/home/homeSlice";

import { selectMenuModel, setRestaurantItems, addToWishlistItem, toggleItemsToBeAddedInCart, setFavoriteRestro, setItemToCart, setHideMenu, toggleMenuModel } from "../features/home/restaurantsSlice";
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
  const { loginHovered, locationHovered } = useSelector(selectHoverState);
  const isLocationModelOpen = useSelector(selectLocationModal);
  const menuModel = useSelector(selectMenuModel)
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useTrackNavigation();

  useEffect(() => {
    const HomeData = JSON.parse(localStorage.getItem("HomeAPIData"));
    const CityHomeData = JSON.parse(localStorage.getItem("CityHomeData"))
    const lat = JSON.parse(localStorage.getItem("lat"));
    const lng = JSON.parse(localStorage.getItem("lng"));
    const rawUserPathHistory = localStorage.getItem("userFriendlyPathHistory");
    const restaurantAllItems = JSON.parse(localStorage.getItem("RestaurantAllItems"));
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    const itemsToBeAddedToCart = JSON.parse(localStorage.getItem("ItemsToBeAddedInCart"));
    const localityLatLng = JSON.parse(localStorage.getItem("localityLatLng"));
    const cartItems = JSON.parse(localStorage.getItem("CartItems"));

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
      const favRestros = JSON.parse(localStorage.getItem("favRestros"));

      // when asked data is not present in the local storage the it will null instead of undefined

      if (searchedCity !== undefined && searchedCity !== null) dispatch(addSearchedCity(searchedCity));
      if (searchedCityAddress !== undefined && searchedCityAddress !== null) dispatch(addSearchedCityAddress(searchedCityAddress));
      if (currentCity !== undefined && currentCity !== null) dispatch(addYourCurrentCity(currentCity));
      if (restaurantAllItems !== undefined && restaurantAllItems !== null) dispatch(setRestaurantItems(restaurantAllItems))
      if (wishlist !== undefined && wishlist !== null) dispatch(addToWishlistItem({ mode: "initial", object: wishlist }));
      if (itemsToBeAddedToCart !== undefined && itemsToBeAddedToCart !== null) dispatch(toggleItemsToBeAddedInCart({ mode: "initial", object: itemsToBeAddedToCart }));
      if (favRestros !== undefined && favRestros !== null) dispatch(setFavoriteRestro({ mode: "initial", object: favRestros }));
      if (localityLatLng !== undefined && localityLatLng !== null) dispatch(setLocalityLatAndLng(localityLatLng));
      if (cartItems !== undefined && cartItems !== null) dispatch(setItemToCart({ mode: "initial", object: cartItems }));

    } else if (navigator.geolocation) {
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
            alert(err.message);
            fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
          }
        } catch (err) {
          console.log("Error fetching current location data.");
          fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
        }
      },
        err => {
          console.log("Some error occured", err.message);
          fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
        },
        {
          timeout: 5000, //didn't worked
          enableHighAccuracy: false,
          maximumAge: 20000
        }
      );
    } else {
      fetchDefaultHomeAPIData(triggerHomeAPI, dispatch, isLocationModelOpen);
    }

    const deviceId = `${navigator.userAgent} | ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

    const handleGuestSession = async () => {
      try {
        // 1: create the guest session
        const res = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/session", {
          method: "POST",
          body: JSON.stringify({ deviceId }),
          headers: {
            "Content-Type" : "application/json"
          },
          credentials: "include"
        });

        const data = await res.json();
        console.log(data.data.sessionId);

        // 2: get the guest session data
        const result = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/session", {
          method: "GET",
          credentials: "include"
        });

        const sessionData = await result.json();
        console.log("Session data", sessionData)

      } catch (err) {
        console.error("Session error", err)
      }
    }

    handleGuestSession();
  }, []);

  useEffect(() => {
    if (locationHovered) {
      import("./Location/LocationModal");
    } else if (loginHovered) {
      import("./Login/LoginModal");
    }
  }, [loginHovered, locationHovered]);

  useEffect(() => {
    const html = document.documentElement;
    const scrollbarWidth = (window.innerWidth - html.clientWidth) + "px";

    const isLargeScreen = window.innerWidth >= 768;

    if (isLoginOpen || isLocationOpen || menuModel || dpModel) {
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

  }, [isLoginOpen, isLocationOpen, menuModel, dpModel]);

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
      {isLoginOpen && (
        <Suspense >
          <LoginModal />
        </Suspense>
      )}
      {isLocationOpen && (
        <Suspense >
          <LocationModal />
        </Suspense>
      )}
      <PageFooter />
    </>
  );
}

