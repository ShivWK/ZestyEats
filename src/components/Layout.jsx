import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
const LoginModal = lazy(() => import("./Login/LoginModal"));
const LocationModal = lazy(() => import("./Location/LocationModal"));
import { toast } from "react-toastify";
import {
  selectLogInModal,
  selectLocationModal,
  selectHoverState,
} from "../features/Login/loginSlice";
import {
  setOnline,
  setLoading,
  selectPathHistory,
  setUserFriendlyPathHistory,
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
} from "../features/home/homeSlice";
import { selectMenuModel } from "../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useTrackNavigation from "../utils/useTrackNavigation";
import { updateHomeRestaurantData } from "../utils/updateHomeData";
import { useLazyGetHomePageDataQuery } from "../features/home/homeApiSlice";
import { useLazyLocationByCoordinatesQuery } from "../features/home/searchApiSlice";
import { updateCurrentCity } from "../utils/addCurrentCity";
// import { useGetDishInCityDataQuery, useGetDataForCityLocalityCuisineQuery } from "../features/cityHome/cityHomeApiSlice";

export default function Layout() {
  const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
  const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const { loginHovered, locationHovered } = useSelector(selectHoverState);
  const menuModel = useSelector(selectMenuModel)
  const dispatch = useDispatch();
  useTrackNavigation();

  const fetchDefaultHomeAPIData = async () => {
    try {
      let apiResponse = await triggerHomeAPI({
        lat: 12.9715987,
        lng: 77.5945627,
      }).unwrap();
      if (!apiResponse) return;
      updateHomeRestaurantData(apiResponse, dispatch, 12.9715987, 77.5945627);
    } catch (err) {
      dispatch(setLoading(false));
      alert(err.error);
    }
  };

  useEffect(() => {
    const HomeData = JSON.parse(localStorage.getItem("HomeAPIData"));
    const lat = JSON.parse(localStorage.getItem("lat"));
    const lng = JSON.parse(localStorage.getItem("lng"));
    const rawUserPathHistory = localStorage.getItem("userFriendlyPathHistory");
    let userPathHistory = '';
    if (rawUserPathHistory !== "undefined") {
      userPathHistory = JSON.parse(rawUserPathHistory);
    }
    const pathHistory = JSON.parse(localStorage.getItem("pathHistory"));

    if (HomeData && lat && lng) {
      updateHomeRestaurantData(HomeData, dispatch, lat, lng, userPathHistory, pathHistory);
      const searchedCity = JSON.parse(localStorage.getItem("searchedCity"));
      const searchedCityAddress = JSON.parse(localStorage.getItem("searchedCityAddress"));
      const currentCity = JSON.parse(localStorage.getItem("currentCity"));

      // when asked data is not present in the local storage the it will null instead of undefined

      if (searchedCity !== undefined && searchedCity !== null) dispatch(addSearchedCity(searchedCity));
      if (searchedCityAddress !== undefined && searchedCityAddress !== null) dispatch(addSearchedCityAddress(searchedCityAddress));
      if (currentCity !== undefined && currentCity !== null) dispatch(addYourCurrentCity(currentCity));

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
            fetchDefaultHomeAPIData();
          }
        } catch (err) {
          console.log("Error fetching current location data.");
          fetchDefaultHomeAPIData();
        }
      },
        err => {
          console.log("Some error occured", err.message);
          fetchDefaultHomeAPIData();
        },
        {
          timeout: 5000, //didn't worked
          enableHighAccuracy: false,
          maximumAge: 20000
        }
      );
    } else {
      fetchDefaultHomeAPIData();
    }
  }, []);

  const pathHistory = useSelector(selectPathHistory);

  useEffect(() => {
    const history = pathHistory.map((item) => {
      if (item === "/") return "Home";
      else if (item === "/offers-dinouts") return "Offers";
      else if (item === "/about") return "About";
      else if (item === "/search") return "Search";
      else if (item === "/help") return "Help";
      else if (item === "/cart") return "Cart";
      else if (item === "/dishSearch") return "DishSearch";
      else if (item.includes("specificFood")) {
        return decodeURIComponent(item).split("/")[2];
      } else if (item?.includes("restaurantSpecific")) {
        // console.log(decodeURIComponent(item).split("/")[5])
        return decodeURIComponent(item).split("/")[5];
      } else if (item === "/search/suggestions") return "Suggestions";
      else if (item === "/search/searchResult/dishPage") return "Dishes";
      else if (item === "/search/searchResult/restaurantPage") return "Restaurants";
      return item;
    });

    dispatch(setUserFriendlyPathHistory(history));
    // console.log(history);
  }, [pathHistory]);

  useEffect(() => {
    if (locationHovered) {
      import("./Location/LocationModal");
    } else if (loginHovered) {
      import("./Login/LoginModal");
    }
  }, [loginHovered, locationHovered]);

  useEffect(() => {
    const scrollbarWidth = "15px";
    const body = document.body;

    const isLargeScreen = window.innerWidth >= 768;
    console.log(menuModel)

    if (isLargeScreen || true) {
      if (body.clientHeight >= body.scrollHeight) {
        body.style.paddingRight = "15px";
      }

      if (isLoginOpen || isLocationOpen || menuModel) {
        body.classList.add("overflow-hidden");
        body.style.paddingRight = scrollbarWidth;
      } else {
        body.classList.remove("overflow-hidden");
        body.style.paddingRight = "0px";
      }
      // Hard coded for now, but we can use a library to get the scrollbar width dynamically.
      return () => {
        body.classList.remove("overflow-hidden");
        body.style.paddingRight = "0px";
      };
    }
  }, [isLoginOpen, isLocationOpen, menuModel]);

  useEffect(() => {
    const onlineHandler = () => {
      dispatch(setOnline(true));
      toast("Back Online", {
        autoClose: 2000,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          fontWeight: "bold",
          color: "white",
        },
        progressClassName: "progress-style",
      });
    };

    const offlineHandler = () => {
      dispatch(setOnline(false));
      toast("Lost Connection", {
        autoClose: 2000,
        style: {
          backgroundColor: "rgba(0,0,0,0.9)",
          fontWeight: "bold",
          color: "white",
        },
        // progressClassName: "progress-style"
      });
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <>
      <PageHeader />
      <Outlet />
      {isLoginOpen && (
        <Suspense fallback={<p>Loading...</p>}>
          <LoginModal />
        </Suspense>
      )}
      {isLocationOpen && (
        <Suspense fallback={<p>Loading...</p>}>
          <LocationModal />
        </Suspense>
      )}
      <PageFooter />
    </>
  );
}
