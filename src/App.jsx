import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import Layout from "./components/Layout";
import Home from "./components/Home/Home";

const HelpMain = lazy(() => import("./components/Help/HelpMain"));
const About = lazy(() => import("./components/About/About"));
const Search = lazy(() => import("./components/Search/Search"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Profile = lazy(() => import("./components/Profile/Profile"));

import { Bounce, ToastContainer } from "react-toastify";
import CloseToastBtn from "./components/CloseToastBtn";

// const RestaurantSearch = lazy(() => import("./components/RestaurantSpecific/RestraurantSearch"));

const RestaurantSpecific = lazy(() => import("./components/RestaurantSpecific/RestaurantSpecific"));
const FoodSpecific = lazy(() => import("./components/FoodSpecific/FoodSpecific"));

// import SearchResult from "./components/Search/SearchResult";
const SearchResult = lazy(() => import("./components/Search/SearchResult"));
// import SearchSuggestions from "./components/Search/SearchSuggestion";
const SearchSuggestions = lazy(() => import("./components/Search/SearchSuggestion"));
// import SearchHome from "./components/Search/SearchHome";
const SearchHome = lazy(() => import("./components/Search/SearchHome"));
// import RestaurantResultPage from "./components/Search/RestaurantResultPage";
const RestaurantResultPage = lazy(() => import("./components/Search/RestaurantResultPage"));
// import DishResultPage from "./components/Search/DishResultPage";
const DishResultPage = lazy(() => import("./components/Search/DishResultPage"));
// import CityHome from "./components/cityHome/CityHome";
const CityHome = lazy(() => import("./components/cityHome/CityHome"));

// import CuisinesResultPage from "./components/Search/CuisinesResultPage";
const CuisinesResultPage = lazy(() => import("./components/Search/CuisinesResultPage"))
// import OptionsPage from "./components/MobilePages/OptionsPage";
const OptionsPage = lazy(() => import("./components/MobilePages/OptionsPage"));
// import ContentPage from "./components/MobilePages/ContentPage";
const ContentPage = lazy(() => import("./components/MobilePages/ContentPage"));
// import OrdersAndWishlist from "./components/MobilePages/OrdersAndWishlist";
const OrdersAndWishlist = lazy(() => import("./components/MobilePages/OrdersAndWishlist"));
// import CityCuisines from "./components/cityHome/CityCuisines";
const CityCuisines = lazy(() => import("./components/cityHome/CityCuisines"));
// import PageNotFound from "./components/PageNotFound";
const PageNotFound = lazy(() => import("./components/PageNotFound"));
// import CityLocality from "./components/cityHome/CityLocality";
const CityLocality = lazy(() => import("./components/cityHome/CityLocality"));
// import CityRestaurantPage from "./components/cityHome/CityRestaurantPage";
const CityRestaurantPage = lazy(() => import("./components/cityHome/CityRestaurantPage"));
// import PopularDishes from "./components/cityHome/DishPage/PopularDishes";
const PopularDishes = lazy(() => import("./components/cityHome/DishPage/PopularDishes"));
// import CompanyPolicies from "./components/CompanyPolicies";
const CompanyPolicies = lazy(() => import("./components/CompanyPolicies"));
// import ErrorBoundary from "./components/ErrorHandling/ErrorBoundary";
const ErrorBoundary = lazy(() => import("./components/ErrorHandling/ErrorBoundary"));
import useOnlineStatus from "./utils/useOnlineStatus";
// const useOnlineStatus = lazy(() => import("./utils/useOnlineStatus"));
// import PaymentsAndAddress from "./components/Cart/PaymentsAndAddress";
const PaymentsAndAddress = lazy(() => import("./components/Cart/PaymentsAndAddress"));
// import DeleteAccount from "./components/Profile/DeleteAccount";
const DeleteAccount = lazy(() => import("./components/Profile/DeleteAccount"));
// import MobileProfile from "./components/Profile/MobileProfile";
const MobileProfile = lazy(() => import("./components/Profile/MobileProfile"));
// import MobileProfileResponse from "./components/Profile/MobileProfileResponse";
const MobileProfileResponse = lazy(() => import("./components/Profile/MobileProfileResponse"));

import { searchHomeLoader, resultDataLoader } from "./loaders/homeSearchLoaders";
import { specificRestroLoader, specificFoodLoader, profileResponseLoader } from "./loaders/loaders";
import { cuisineLoader, dishLoader, localityLoader, restaurantLoader } from "./loaders/cityPageLoaders";

import {
  selectLocationModal,
  selectLogInModal,
  setHideLocation,
  setHideLogin,
} from "./features/Login/loginSlice";

import {
  selectPathHistory,
  setUserFriendlyPathHistory,
  selectCurrentTheme,
  setCurrentTheme,
  setDeviceFingerPrint
} from "./features/home/homeSlice";

import {
  selectMenuModel,
  setDeviceFingerPrintRestro,
  toggleMenuModel
} from "./features/home/restaurantsSlice";

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
          <Route index
            loader={searchHomeLoader}
            element={
              <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
                <SearchHome />
              </Suspense>
            }
          />
          <Route
            path="suggestions"
            element={
              <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
                <SearchSuggestions />
              </Suspense>} />
          <Route
            path="searchResult"
            element={
              <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
                <SearchResult />
              </Suspense>
            }
          >
            <Route
              path="restaurantPage"
              loader={resultDataLoader} element={
                <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
                  <RestaurantResultPage />
                </Suspense>
              } />
            <Route
              path="dishPage"
              loader={resultDataLoader}
              element={
                <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
                  <DishResultPage />
                </Suspense>
              } />
            <Route
              path="cuisinesPage"
              loader={resultDataLoader}
              element={
                <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
                  <CuisinesResultPage />
                </Suspense>
              } />
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
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <FoodSpecific />
            </Suspense>
          }
          loader={specificFoodLoader}
        />
        <Route
          path="cityPage/:cityName"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <CityHome />
            </Suspense>
          } />
        <Route
          path="cityCuisines/:cityName"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <CityCuisines />
            </Suspense>
          }
          loader={cuisineLoader}
        />
        <Route
          path="cityRestaurant/:cityName"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <CityRestaurantPage />
            </Suspense>
          }
          loader={restaurantLoader} />
        <Route
          path="cityLocality/:cityName/:locality"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <CityLocality />
            </Suspense>
          }
          loader={localityLoader} />
        <Route
          ath="cityDishes/:cityName/:dish"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <PopularDishes />
            </Suspense>
          }
          loader={dishLoader} />

        <Route
          path="support"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <OptionsPage />
            </Suspense>
          } />
        <Route
          path="mbAbout"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <OptionsPage />
            </Suspense>
          } />
        <Route
          path="mbStaticData"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <ContentPage />
            </Suspense>
          } />
        <Route
          path="ordersAndWishlist"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <OrdersAndWishlist />
            </Suspense>
          } />
        <Route
          path='*'
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <PageNotFound />
            </Suspense>
          } />
        <Route
          path="legalAndPolicies"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <CompanyPolicies />
            </Suspense>
          } />
        <Route
          path="mobileProfileResponse"
          loader={profileResponseLoader}
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <MobileProfileResponse />
            </Suspense>
          } />
        <Route
          path="paymentsAndAddresses"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <PaymentsAndAddress />
            </Suspense>
          } />
        <Route
          path="deleteAccount"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>} >
              <DeleteAccount />
            </Suspense>
          } />
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
