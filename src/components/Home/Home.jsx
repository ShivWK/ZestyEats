import { memo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
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

import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  selectBestPlacesToEat,
  selectBestCuisionsNearMe,
  selectNearByRestaurants,
} from "../../features/home/homeSlice";
import HomeShimmer from "./HomeShimmer";

const Home = memo(() => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurant = useSelector(selectOnlineDeliveryRestaurants);
  const bestPlacesToEaNearMe = useSelector(selectBestPlacesToEat);
  const bestCuisionsNearMe = useSelector(selectBestCuisionsNearMe);
  const nearByRestaurants = useSelector(selectNearByRestaurants);
  const isLoadingMain = useSelector(selectIsLoading);
  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);

  return isLoadingMain ? (
    <>
      <Loader size={"large"} />
      <div className="w-full max-w-[1070px] mx-auto">
        <HomeShimmer />
      </div>
    </>

  ) : (
    <main className="w-full md:max-w-[1070px] mx-auto pb-14 pt-24 overflow-x-hidden">
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
                  {shimmerArray.map(i => <div key={i} className=" w-60 h-44 rounded-xl shimmerBg" />)}
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
                  {shimmerArray.map(i => <div key={i} className=" w-60 h-44 rounded-xl shimmerBg" />)}
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
                  {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
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
                  {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
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
                {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
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
