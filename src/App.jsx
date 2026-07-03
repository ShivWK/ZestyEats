import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import useOnlineStatus from './utils/useOnlineStatus';

import Layout from './components/Layout';
import Home from './components/Home/Home';

const HelpMain = lazy(() => import('./components/Help/HelpMain'));
const About = lazy(() => import('./components/About/About'));
const Search = lazy(() => import('./components/Search/Search'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Profile = lazy(() => import('./components/Profile/Profile'));

import { Bounce, ToastContainer } from 'react-toastify';
import CloseToastBtn from './components/CloseToastBtn';

const RestaurantSpecific = lazy(() => import('./components/RestaurantSpecific/RestaurantSpecific'));
const FoodSpecific = lazy(() => import('./components/FoodSpecific/FoodSpecific'));

const SearchResult = lazy(() => import('./components/Search/SearchResult'));
const SearchSuggestions = lazy(() => import('./components/Search/SearchSuggestion'));
const SearchHome = lazy(() => import('./components/Search/SearchHome'));
const RestaurantResultPage = lazy(() => import('./components/Search/RestaurantResultPage'));
const DishResultPage = lazy(() => import('./components/Search/DishResultPage'));
const CityHome = lazy(() => import('./components/cityHome/CityHome'));
// const RestaurantSearch = lazy(() => import("./components/RestaurantSpecific/RestraurantSearch"));

const CuisinesResultPage = lazy(() => import('./components/Search/CuisinesResultPage'));
const OptionsPage = lazy(() => import('./components/MobilePages/OptionsPage'));
const ContentPage = lazy(() => import('./components/MobilePages/ContentPage'));
const OrdersAndWishlist = lazy(() => import('./components/MobilePages/OrdersAndWishlist'));
const CityCuisines = lazy(() => import('./components/cityHome/CityCuisines'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));
const CityLocality = lazy(() => import('./components/cityHome/CityLocality'));

const CityRestaurantPage = lazy(() => import('./components/cityHome/CityRestaurantPage'));
const PopularDishes = lazy(() => import('./components/cityHome/DishPage/PopularDishes'));
const CompanyPolicies = lazy(() => import('./components/CompanyPolicies'));
const ErrorBoundary = lazy(() => import('./components/ErrorHandling/ErrorBoundary'));
const PaymentsAndAddress = lazy(() => import('./components/Cart/PaymentsAndAddress'));
const DeleteAccount = lazy(() => import('./components/Profile/DeleteAccount'));
const MobileProfile = lazy(() => import('./components/Profile/MobileProfile'));
const MobileProfileResponse = lazy(() => import('./components/Profile/MobileProfileResponse'),);

import { searchHomeLoader, resultDataLoader } from './loaders/homeSearchLoaders';
import { specificRestroLoader, specificFoodLoader, profileResponseLoader } from './loaders/loaders';
import { cuisineLoader, dishLoader, localityLoader, restaurantLoader } from './loaders/cityPageLoaders';

import { useThemeBootstrap } from './hooks/useThemeBootstrap';
import { useEscapeModalClose } from './hooks/useEscapeModalClose';
import { usePathHistoryFormatter } from './hooks/usePathHistoryFormatter';
import { useDeviceFingerPrint } from './hooks/useDeviceFingerPrint';
import { useThemeManager } from './hooks/useThemeManager';

export default function App() {
  useOnlineStatus();
  useThemeBootstrap();
  useThemeManager();
  useEscapeModalClose();
  useDeviceFingerPrint();
  usePathHistoryFormatter();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <About />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <Search />
            </Suspense>
          }
        >
          <Route
            index
            loader={searchHomeLoader}
            element={
              <Suspense
                fallback={
                  <div className="h-[110vh]">
                    <p>loading...</p>
                  </div>
                }
              >
                <SearchHome />
              </Suspense>
            }
          />
          <Route
            path="suggestions"
            element={
              <Suspense
                fallback={
                  <div className="h-[110vh]">
                    <p>loading...</p>
                  </div>
                }
              >
                <SearchSuggestions />
              </Suspense>
            }
          />
          <Route
            path="searchResult"
            element={
              <Suspense
                fallback={
                  <div className="h-[110vh]">
                    <p>loading...</p>
                  </div>
                }
              >
                <SearchResult />
              </Suspense>
            }
          >
            <Route
              path="restaurantPage"
              loader={resultDataLoader}
              element={
                <Suspense
                  fallback={
                    <div className="h-[110vh]">
                      <p>loading...</p>
                    </div>
                  }
                >
                  <RestaurantResultPage />
                </Suspense>
              }
            />
            <Route
              path="dishPage"
              loader={resultDataLoader}
              element={
                <Suspense
                  fallback={
                    <div className="h-[110vh]">
                      <p>loading...</p>
                    </div>
                  }
                >
                  <DishResultPage />
                </Suspense>
              }
            />
            <Route
              path="cuisinesPage"
              loader={resultDataLoader}
              element={
                <Suspense
                  fallback={
                    <div className="h-[110vh]">
                      <p>loading...</p>
                    </div>
                  }
                >
                  <CuisinesResultPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route
          path="help"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <HelpMain />
            </Suspense>
          }
        />

        <Route
          path="profile"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="mobileProfile"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <MobileProfile />
            </Suspense>
          }
        />

        <Route
          path="cart"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="restaurantSpecific/:lat/:lng/:id/:name"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
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
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <FoodSpecific />
            </Suspense>
          }
          loader={specificFoodLoader}
        />
        <Route
          path="cityPage/:cityName"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <CityHome />
            </Suspense>
          }
        />
        <Route
          path="cityCuisines/:cityName"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <CityCuisines />
            </Suspense>
          }
          loader={cuisineLoader}
        />
        <Route
          path="cityRestaurant/:cityName"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <CityRestaurantPage />
            </Suspense>
          }
          loader={restaurantLoader}
        />
        <Route
          path="cityLocality/:cityName/:locality"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <CityLocality />
            </Suspense>
          }
          loader={localityLoader}
        />
        <Route
          ath="cityDishes/:cityName/:dish"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <PopularDishes />
            </Suspense>
          }
          loader={dishLoader}
        />

        <Route
          path="support"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <OptionsPage />
            </Suspense>
          }
        />
        <Route
          path="mbAbout"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <OptionsPage />
            </Suspense>
          }
        />
        <Route
          path="mbStaticData"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <ContentPage />
            </Suspense>
          }
        />
        <Route
          path="ordersAndWishlist"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <OrdersAndWishlist />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <PageNotFound />
            </Suspense>
          }
        />
        <Route
          path="legalAndPolicies"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <CompanyPolicies />
            </Suspense>
          }
        />
        <Route
          path="mobileProfileResponse"
          loader={profileResponseLoader}
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <MobileProfileResponse />
            </Suspense>
          }
        />
        <Route
          path="paymentsAndAddresses"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <PaymentsAndAddress />
            </Suspense>
          }
        />
        <Route
          path="deleteAccount"
          element={
            <Suspense
              fallback={
                <div className="h-[110vh]">
                  <p>loading...</p>
                </div>
              }
            >
              <DeleteAccount />
            </Suspense>
          }
        />
      </Route>,
    ),
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
          'flex items-center gap-4 rounded lg:rounded-lg shadow-xl px-4 py-3 mt-2 max-lg:mb-4 max-lg:max-w-[70%] dark:bg-[rgba(0,0,0,0.8)] text-medium'
        }
      />
    </>
  );
}
