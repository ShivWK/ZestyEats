import { memo, useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import useScrollToTop from "../../utils/useScrollToTop";

import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import Loader from "../Loader";
const OnlineDeliveryRestaurant = lazy(() =>
  import("./OnlineDeliveryRestaurants/OnlineDeliveryRestaurant")
);
const TopRestaurantChains = lazy(() => import("./TopRestaurantChains"));
const BestPlacesToEat = lazy(() => import("./BestPlacesToEat"));
const CuisionsNearMe = lazy(() => import("./CuisionsNearMe"));
const NearByRestaurants = lazy(() => import("./NearByRestaurants"));

import { useLazyGetHomePageDataQuery } from "../../features/home/homeApiSlice";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  setLoading,
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
  selectBestPlacesToEat,
  selectBestCuisionsNearMe,
  selectNearByRestaurants,
} from "../../features/home/homeSlice";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { updateCurrentCity } from "../../utils/addCurrentCity";

const Home = memo(() => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurant = useSelector(selectOnlineDeliveryRestaurants);
  const bestPlacesToEaNearMe = useSelector(selectBestPlacesToEat);
  const bestCuisionsNearMe = useSelector(selectBestCuisionsNearMe);
  const nearByRestaurants = useSelector(selectNearByRestaurants);
  const isLoadingMain = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [triggerHomeAPI, { isLoading }] = useLazyGetHomePageDataQuery();
  const [triggerLoactionByCoordinates] = useLazyLocationByCoordinatesQuery();

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
    const userPathHistory = JSON.parse(localStorage.getItem("userFriendlyPathHistory") || "")

    if (HomeData && lat && lng && userPathHistory) {
      updateHomeRestaurantData(HomeData, dispatch, lat, lng, userPathHistory);
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
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;

        try {
          const data = await triggerLoactionByCoordinates({
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
      });
    } else {
      fetchDefaultHomeAPIData();
    }
  }, []);

  return isLoadingMain || isLoading ? (
    <Loader size={"large"} />
  ) : (
    <main className="w-full max-w-[1070px] mx-auto pb-14 pr-1 pt-24 overflow-x-hidden">
      {foodieThoughtsData.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto ">
            <FoodieThoughts />
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}
      {topRestaurantsChainsData.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto">
            <Suspense
              fallback={
                <div className="flex justify-between">
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                </div>
              }
            >
              <TopRestaurantChains />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}
      {onlineDeliveryRestaurant.length !== 0 && (
        <>
          <section className="w-full">
            <Suspense
              fallback={
                <div className="flex justify-between">
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                  <div className=" w-60 h-44 rounded-xl shimmerBg">
                  </div>
                </div>
              }
            >
              <OnlineDeliveryRestaurant />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}
      {bestPlacesToEaNearMe.length !== 0 && (
        <>
          <section
            className="w-full max-w-[1000px] mx-auto flex items-center gap-4
           flex-col"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4">
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                  <div className="w-60 h-20 rounded-xl shimmerBg"></div>
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                </div>
              }
            >
              <BestPlacesToEat />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}
      {bestCuisionsNearMe.length !== 0 && (
        <>
          <section
            className="w-full max-w-[1000px] mx-auto flex items-center gap-4
           flex-col"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4">
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                  <div className="w-60 h-20 rounded-xl shimmerBg">
                  </div>
                </div>
              }
            >
              <CuisionsNearMe />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}
      {nearByRestaurants.length !== 0 && (
        <section
          className="w-full max-w-[1000px] mx-auto flex justify-start gap-4 
         flex-col"
        >
          <Suspense
            fallback={
              <div className="flex justify-between">
                <div className="w-60 h-20 rounded-xl shimmerBg">
                </div>
                <div className="w-60 h-20 rounded-xl shimmerBg">
                </div>
                <div className="w-60 h-20 rounded-xl shimmerBg">
                </div>
                <div className="w-60 h-20 rounded-xl shimmerBg">
                </div>
              </div>
            }
          >
            <NearByRestaurants />
          </Suspense>
        </section>
      )}
    </main>
  );
});

export default Home;

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.
