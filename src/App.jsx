import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
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
const RestaurantSpecific = lazy(() =>
  import("./components/RestaurantSpecific/RestaurantSpecific")
);
const FoodSpecific = lazy(() =>
  import("./components/FoodSpecific/FoodSpecific")
);

import SearchResult from "./components/Search/SearchResult";
import SearchSuggestions from "./components/Search/SearchSuggestion";
import SearchHome from "./components/Search/SearchHome";
import RestaurantResultPage from "./components/Search/RestaurantResultPage";
import DishResultPage from "./components/Search/DishResultPage";
import CityHome from "./components/cityHome/CityHome";

import { specificRestroLoader, specificFoodLoader } from "./loaders/loaders";
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

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
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
        <Route path="legalAndPolicies" element={<CompanyPolicies />}/>
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
          "flex items-center gap-4 rounded lg:rounded-lg shadow-xl px-4 py-3 mt-2 max-lg:mb-4 max-lg:max-w-[70%] dark:bg-[rgba(0,0,0,0.8)] text-semibold"
        }
      />
    </>
  );
}
