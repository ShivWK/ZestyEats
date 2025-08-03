import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";

const HelpMain = lazy(() => import("./components/Help/HelpMain"));
const About = lazy(() => import("./components/About/About"));
const Search = lazy(() => import("./components/Search/Search"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Profile = lazy(() => import("./components/Profile/Profile"));

import { Bounce, ToastContainer } from "react-toastify";
import CloseToastBtn from "./components/CloseToastBtn";

// const RestaurantSearch = lazy(() =>
//   import("./components/RestaurantSpecific/RestraurantSearch")
// );

const RestaurantSpecific = lazy(() => import("./components/RestaurantSpecific/RestaurantSpecific"));
const FoodSpecific = lazy(() => import("./components/FoodSpecific/FoodSpecific"));

import SearchResult from "./components/Search/SearchResult";
import SearchSuggestions from "./components/Search/SearchSuggestion";
import SearchHome from "./components/Search/SearchHome";
import RestaurantResultPage from "./components/Search/RestaurantResultPage";
import DishResultPage from "./components/Search/DishResultPage";
import CityHome from "./components/cityHome/CityHome";

import { specificRestroLoader, specificFoodLoader, profileResponseLoader } from "./loaders/loaders";
import { searchHomeLoader, resultDataLoader } from "./loaders/homeSearchLoaders";
import CuisinesResultPage from "./components/Search/CuisinesResultPage";
import OptionsPage from "./components/MobilePages/OptionsPage";
import ContentPage from "./components/MobilePages/ContentPage";
import OrdersAndWishlist from "./components/MobilePages/OrdersAndWishlist";
import CityCuisines from "./components/cityHome/CityCuisines";
import { cuisineLoader, dishLoader, localityLoader, restaurantLoader } from "./loaders/cityPageLoaders";
import PageNotFound from "./components/PageNotFound";
import CityLocality from "./components/cityHome/CityLocality";
import CityRestaurantPage from "./components/cityHome/CityRestaurantPage";
import PopularDishes from "./components/cityHome/DishPage/PopularDishes";
import CompanyPolicies from "./components/CompanyPolicies";
import ErrorBoundary from "./components/ErrorHandling/ErrorBoundary";
import useOnlineStatus from "./utils/useOnlineStatus";

import {
  selectLocationModal,
  selectLogInModal,
  setHideLocation,
  setHideLogin,
  selectLocationInfoModalReason
} from "./features/Login/loginSlice";

import {
  selectPathHistory,
  setUserFriendlyPathHistory,
  selectCurrentTheme,
  setCurrentTheme,
  setDeviceFingerPrint
} from "./features/home/homeSlice";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { selectMenuModel, setDeviceFingerPrintRestro, toggleMenuModel } from "./features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import MobileProfile from "./components/Profile/MobileProfile";
import MobileProfileResponse from "./components/Profile/MobileProfileResponse";

export default function App() {
  useOnlineStatus();

  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationModelOpen = useSelector(selectLocationModal);
  const isMenuModelOpen = useSelector(selectMenuModel);
  const dispatch = useDispatch();
  let theme = useSelector(selectCurrentTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    dispatch(setCurrentTheme(storedTheme));
  }, [])

  useEffect(() => {
    const handleScapeDown = (e) => {
      if (e.key === "Escape") {
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
    }

    document.addEventListener("keydown", handleScapeDown);
    return () => document.removeEventListener("keydown", handleScapeDown);
  }, [isLoginOpen, isLocationModelOpen, isMenuModelOpen]);

  const pathHistory = useSelector(selectPathHistory);

  useEffect(() => {
    const deviceInfo = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      dispatch(setDeviceFingerPrint(result.visitorId));
      dispatch(setDeviceFingerPrintRestro(result.visitorId));
    }

    deviceInfo();
  }, [])

  // useEffect(() => {
  //   const unloadHandler = () => {
  //     console.log(isLoginOpen, isLocationModelOpen);

  //     if (isLoginOpen || isLocationModelOpen) {
  //       window.history.back();
  //     }
  //   }

  //   window.addEventListener("beforeunload", unloadHandler);
  //   return () => window.removeEventListener("beforeunload", unloadHandler);
  // }, [isLoginOpen, isLocationModelOpen])

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
        return decodeURIComponent(item).split("/")[5];
      } else if (item === "/search/suggestions") return "Suggestions";
      else if (item === "/search/searchResult/dishPage") return "Dishes";
      else if (item === "/search/searchResult/restaurantPage") return "Restaurants";
      else if (item.includes("/cityPage")) {
        const city = decodeURIComponent(item).split("/").at(-1);
        return `${city} City`;
      } else if (item.includes("/cityLocality")) {
        const locality = decodeURIComponent(item).split("/").at(-1);
        return `${locality} Locality`
      } else if (item.includes("/cityDishes")) {
        const dish = decodeURIComponent(item).split("/").at(-1);
        return dish;
      } else if (item.includes("/legalAndPolicies")) return "Legal & Policies";

      return item;
    });

    dispatch(setUserFriendlyPathHistory(history));
  }, [pathHistory]);

  // Important
  useEffect(() => {
    const html = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    function changeStatusBarColor(color) {
      let metaElement = document.querySelector("meta[name=theme-color]");

      if (!metaElement) {
        metaElement = document.createElement("meta");
        metaElement.name = "theme-color";

        document.head.appendChild(metaElement);
      }

      metaElement.setAttribute("content", color);
    }

    if (theme === "dark") {
      html.classList.add("dark");
      changeStatusBarColor("#1e2939");
    } else if (theme === "light") {
      html.classList.remove("dark");
      changeStatusBarColor("#ffffff");
    } else if (theme === "system") {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')

      if (systemTheme.matches) {
        html.classList.add("dark");
        changeStatusBarColor("#1e2939");
      } else {
        html.classList.remove("dark");
        changeStatusBarColor("#ffffff");
      }
    }

    const themeChangeHandler = (e) => {
      const currentTheme = localStorage.getItem("theme");

      if (currentTheme === "system") {
        if (e.matches) {
          html.classList.add("dark");
          changeStatusBarColor("#1e2939");
        } else {
          html.classList.remove("dark");
          changeStatusBarColor("#ffffff");
        }
      }
    }

    systemTheme.addEventListener("change", themeChangeHandler)
    return () => systemTheme.removeEventListener("change", themeChangeHandler)
  }, [theme])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <Search />
            </Suspense>
          }
        >
          <Route index loader={searchHomeLoader} element={<SearchHome />} />
          <Route path="suggestions" element={<SearchSuggestions />} />
          <Route path="searchResult" element={<SearchResult />} >
            <Route path="restaurantPage" loader={resultDataLoader} element={<RestaurantResultPage />} />
            <Route path="dishPage" loader={resultDataLoader} element={<DishResultPage />} />
            <Route path="cuisinesPage" loader={resultDataLoader} element={<CuisinesResultPage />} />
          </Route>
        </Route>

        <Route
          path="help"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <HelpMain />
            </Suspense>
          }
        />

        <Route
          path="profile"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="mobileProfile"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <MobileProfile />
            </Suspense>
          }
        />

        <Route
          path="cart"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="restaurantSpecific/:lat/:lng/:id/:name"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <RestaurantSpecific />
            </Suspense>
          }
          loader={specificRestroLoader}
        />
        {/* <Route
          path="dishSearch"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <RestaurantSearch />
            </Suspense>
          }
        /> */}
        <Route
          path="specificFood/:food"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <FoodSpecific />
            </Suspense>
          }
          loader={specificFoodLoader}
        />
        <Route path="cityPage/:cityName" element={<CityHome />} />
        <Route path="cityCuisines/:cityName" element={<CityCuisines />} loader={cuisineLoader} />
        <Route path="cityRestaurant/:cityName" element={<CityRestaurantPage />} loader={restaurantLoader} />
        <Route path="cityLocality/:cityName/:locality" element={<CityLocality />} loader={localityLoader} />
        <Route path="cityDishes/:cityName/:dish" element={<PopularDishes />} loader={dishLoader} />

        <Route path="support" element={<OptionsPage />} />
        <Route path="mbAbout" element={<OptionsPage />} />
        <Route path="mbStaticData" element={<ContentPage />} />
        <Route path="ordersAndWishlist" element={<OrdersAndWishlist />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path="legalAndPolicies" element={<CompanyPolicies />} />
        <Route path="mobileProfileResponse" loader={profileResponseLoader} element={<MobileProfileResponse />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="dark"
        transition={Bounce}
        icon={false}
        closeButton={CloseToastBtn}
        toastClassName={() =>
          "flex items-center gap-4 rounded lg:rounded-lg shadow-xl px-4 py-3 mt-2 max-lg:mb-4 max-lg:max-w-[70%] dark:bg-[rgba(0,0,0,0.8)] text-medium"
        }
      />
    </>
  );
}
