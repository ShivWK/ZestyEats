import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
// import HelpMain from "./components/Help/HelpMain";
const HelpMain = lazy(() => import("./components/Help/HelpMain"));
// import About from "./components/About/About";
const About = lazy(() => import("./components/About/About"));
// import Search from "./components/Search/Search";
const Search = lazy(() => import("./components/Search/Search"));
// import Cart from "./components/Cart/Cart";<Suspense>
const Cart = lazy(() => import("./components/Cart/Cart"));
// import Profile from "./components/Profile/Profile";
const Profile = lazy(() => import("./components/Profile/Profile"));
// import Offers_Dinouts from "./components/Offers_Dinouts/Offers_Dinouts";
const Offers_Dinouts = lazy(() =>
  import("./components/Offers_Dinouts/Offers_Dinouts")
);
import { Bounce, ToastContainer } from "react-toastify";
import CloseToastBtn from "./components/CloseToastBtn";
// import RestaurantSearch from "./components/RestaurantSpecific/RestraurantSearch";
const RestaurantSearch = lazy(() =>
  import("./components/RestaurantSpecific/RestraurantSearch")
);
// import RestaurantSpecific from "./components/RestaurantSpecific/RestaurantSpecific";
const RestaurantSpecific = lazy(() =>
  import("./components/RestaurantSpecific/RestaurantSpecific")
);
// import FoodSpecific from "./components/FoodSpecific/FoodSpecific";
const FoodSpecific = lazy(() =>
  import("./components/FoodSpecific/FoodSpecific")
);
import { specificRestroLoader, specificFoodLoader } from "./loaders/loaders";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="offers-dinouts"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Offers_Dinouts />
            </Suspense>
          }
        />
        <Route
          path="help"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <HelpMain />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="restaurantSpecific/:lat/:lng/:id"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <RestaurantSpecific />
            </Suspense>
          }
          loader={specificRestroLoader}
        />
        <Route
          path="dishSearch"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <RestaurantSearch />
            </Suspense>
          }
        />
        <Route
          path="specificFood"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <FoodSpecific />
            </Suspense>
          }
          loader={specificFoodLoader}
        />
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
          "flex items-center gap-4 rounded-lg shadow-xl px-4 py-3 mt-2"
        }
      />
    </>
  );
}
