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
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useTrackNavigation from "../utils/useTrackNavigation";
import { updateHomeRestaurantData } from "../utils/updateHomeData";
import { useLazyGetHomePageDataQuery } from "../features/home/homeApiSlice";
import { useLazyLocationByCoordinatesQuery } from "../features/home/searchApiSlice";
import { updateCurrentCity } from "../utils/addCurrentCity";

export default function Layout() {
  const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
  const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const { loginHovered, locationHovered } = useSelector(selectHoverState);
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

    if (HomeData && lat && lng && userPathHistory && pathHistory) {
      console.log("from local", pathHistory)
      updateHomeRestaurantData(HomeData, dispatch, lat, lng, userPathHistory, pathHistory);
      const searchedCity = JSON.parse(localStorage.getItem("searchedCity")) || "";
      const searchedCityAddress = JSON.parse(
        localStorage.getItem("searchedCityAddress")
      ) || "";
      const currentCity = JSON.parse(localStorage.getItem("currentCity")) || "";

      dispatch(
        addSearchedCity(searchedCity === "undefined" ? "" : searchedCity)
      );
      dispatch(
        addSearchedCityAddress(
          searchedCityAddress === "undefined" ? "" : searchedCityAddress
        )
      );
      dispatch(
        addYourCurrentCity(currentCity === "undefined" ? "" : currentCity)
      );
    }  else {
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
      }
      return item;
    });

    dispatch(setUserFriendlyPathHistory(history));
    console.log(history);
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

    if (body.clientHeight >= body.scrollHeight) {
      body.style.paddingRight = "15px";
    }

    if (isLoginOpen || isLocationOpen) {
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
  }, [isLoginOpen, isLocationOpen]);

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
