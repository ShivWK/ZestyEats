import { memo, lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import useScrollToTop from "../../utils/useScrollToTop";

import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import Loader from "../Loader";
const OnlineDeliveryRestaurant = lazy(() =>
  import("./OnlineDeliveryRestaurants/OnlineDeliveryRestaurant")
);
const TopRestaurantChains = lazy(() => import("./TopRestaurantChains"));
const PlaceCardsContainer = lazy(() => import("./PlaceCardsContainer"));

import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  selectBestCuisionsNearMe,
  selectCity
} from "../../features/home/homeSlice";

import HomeShimmer from "./HomeShimmer";


const Home = memo(() => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurantData = useSelector(selectOnlineDeliveryRestaurants);
  const bestCuisionsNearMe = useSelector(selectBestCuisionsNearMe);
  const isLoadingMain = useSelector(selectIsLoading);
  const city = useSelector(selectCity).toLowerCase().replace(/\s/g, "-");

  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);

  const getPlaceCardsPath = data => {
    const pathname = new URL(data.link).pathname;
    const cuisine = pathname.match(/\/(.*?)\-restaurants/)[1]
    const path = `/cityPage?city=${city}&type=${cuisine}-cuisine-`;

    return path;
  }

  return isLoadingMain ? (
    <>
      <Loader size={"large"} />
      <div className="w-full md:max-w-[1070px] mx-auto">
        <HomeShimmer />
      </div>
    </>

  ) : (
    <main className="w-full md:max-w-[1070px] mx-auto pb-14 pt-[88px] md:pt-26 overflow-x-hidden max-md:px-1.5">

      {/* dev msg */}

      <div className="rounded-xl bg-red-400 text-white font-semibold p-3 box-border mx-1.5 mb-3">
        <p className="text-justify">This site is under active development. Features are being added and improved continuously, so some parts may not work as expected right now.</p>
      </div>

      {/* Foodie thoughts */}

      {foodieThoughtsData?.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto ">
            <FoodieThoughts data={foodieThoughtsData} />
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {/* Top restaurants chain */}

      {topRestaurantsChainsData?.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto">
            <Suspense
              fallback={
                <div className="flex justify-between max-md:gap-3 overflow-hidden max-md:px-1.5">
                  {shimmerArray.map(i => <div key={i} className="w-56 md:w-60 h-40 rounded-xl shimmerBg shrink-0" />)}
                </div>
              }
            >
              <TopRestaurantChains data={topRestaurantsChainsData} />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {/* Restaurants with online delivery */}

      {onlineDeliveryRestaurantData?.length !== 0 && (
        <>
          <section className="w-full">
            <Suspense
              fallback={
                <div className="flex justify-between md:flex-row flex-col max-md:gap-3 max-md:px-1.5">
                  {shimmerArray.map(i => <div key={i} className="w-full md:w-60 h-40 md:h-44 rounded-xl shimmerBg shrink-0" />)}
                </div>
              }
            >
              <OnlineDeliveryRestaurant data={onlineDeliveryRestaurantData} />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {/* Best cuisines near me */}

      {bestCuisionsNearMe?.length !== 0 && (
        <>
          <section
            className="w-full max-w-[1000px] mx-auto flex items-center gap-4
           flex-col"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4 flex-wrap">
                  {shimmerArray.map(i => <div key={i} className="w-[98px] h-10 md:w-60 md:h-20 rounded-xl shimmerBg" />)}
                </div>
              }
            >
              <PlaceCardsContainer data={bestCuisionsNearMe} pathLogic={getPlaceCardsPath} />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {/* All available cities in which we server */}

      {/* {nearByRestaurants.length !== 0 && (
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
      )} */}

    </main>
  );
});

export default Home;

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.
