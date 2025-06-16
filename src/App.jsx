import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import { useSelector } from "react-redux";
import { selectPathHistory } from "./features/home/homeSlice";
const HelpMain = lazy(() => import("./components/Help/HelpMain"));
const About = lazy(() => import("./components/About/About"));
const Search = lazy(() => import("./components/Search/Search"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const Offers_Dinouts = lazy(() =>
  import("./components/Offers_Dinouts/Offers_Dinouts")
);
import { Bounce, ToastContainer } from "react-toastify";
import CloseToastBtn from "./components/CloseToastBtn";
const RestaurantSearch = lazy(() =>
  import("./components/RestaurantSpecific/RestraurantSearch")
);
const RestaurantSpecific = lazy(() =>
  import("./components/RestaurantSpecific/RestaurantSpecific")
);
const FoodSpecific = lazy(() =>
  import("./components/FoodSpecific/FoodSpecific")
);

import SearchResult from "./components/Search/SearchResult";
import SearchSuggestions from "./components/Search/SearchSuggestion";
import SearchHome from "./components/Search/SearchHome";


import { specificRestroLoader, specificFoodLoader } from "./loaders/loaders";

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
          <Route index element={<SearchHome />} />
          <Route path="suggestions" element={<SearchSuggestions />} />
          <Route path="searchResult" element={<SearchResult />} />
        </Route>
        <Route
          path="offers-dinouts"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <Offers_Dinouts />
            </Suspense>
          }
        />
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
        <Route
          path="dishSearch"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <RestaurantSearch />
            </Suspense>
          }
        />
        <Route
          path="specificFood/:food"
          element={
            <Suspense fallback={<div className="h-[110vh]"><p>loading...</p></div>}>
              <FoodSpecific />
            </Suspense>
          }
          loader={specificFoodLoader}
        />
      </Route>
    )
  );

  const userPath = useSelector(selectPathHistory);
  console.log(userPath);

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
