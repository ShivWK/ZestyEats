import { memo, lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import useScrollToTop from "../../utils/useScrollToTop";

import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import Loader from "../Loader";
const OnlineDeliveryRestaurant = lazy(() =>
  import("./OnlineDeliveryRestaurant")
);
const TopRestaurantChains = lazy(() => import("./TopRestaurantChains"));
const PlaceCardsContainer = lazy(() => import("./PlaceCardsContainer"));
const HomeCities = lazy(() => import("./homeCities"));
import BackToTopBtn from "../BackToTopBtn";
import MobileFooterMenu from "../Footer/MobileFooterMenu";

import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  selectBestCuisionsNearMe,
  selectAvailableCities,
  selectCity,
  selectBottomMenu,
  selectOnlineStatus
} from "../../features/home/homeSlice";

import HomeShimmer from "./HomeShimmer";

const Home = memo(() => {
  useScrollToTop();
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurantData = useSelector(selectOnlineDeliveryRestaurants);
  const bestCuisinesNearMe = useSelector(selectBestCuisionsNearMe);
  const isLoadingMain = useSelector(selectIsLoading);
  const allAvailableCities = useSelector(selectAvailableCities);
  const city = useSelector(selectCity).toLowerCase().replace(/\s/g, "-");
  const online = useSelector(selectOnlineStatus);

  console.log(online);

  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
  const bottomMenuUp = useSelector(selectBottomMenu);

  const cuisineClickHandler = async (data, trigger, setLoading, dataUpdater, dispatch) => {
    const pathname = new URL(data.link).pathname;
    const cuisine = pathname.match(/\/(.*?)\-restaurants/)[1]
    const type = `${cuisine}-cuisine-`;

    dispatch(setLoading(true));

    try {
      const data = await trigger({ city, type }).unwrap();
      dataUpdater(data, dispatch);
    } catch (err) {
      console.log("Some error occurred", err);
      dispatch(setLoading(false));
      throw new Error("Cant fetch city home data");
    }
  }

  return isLoadingMain ? (
    <>
      <Loader size={"large"} />
      <div className="w-full md:max-w-[1070px] mx-auto py-4">
        <HomeShimmer />
      </div>
    </>

  ) : (
    <>
      <main className="w-full md:max-w-[1070px] mx-auto pb-8 md:pb-14 pt-[88px] md:pt-26 overflow-x-hidden max-md:px-1.5">

        {/* dev msg */}

        {/* Home banner */}

        <div className="relative rounded-2xl md:rounded-4xl overflow-hidden max-md:-mt-2 mb-3 w-full h-36 md:h-64 mx-auto">
          <img src="/images/new_banner.jpg" className="h-[100%] md:h-[110%] w-full md:object-cover" alt="Home banner image" />
        </div>

        <div className="rounded-xl bg-red-400 text-white font-semibold p-3 box-border mx-1.5 max-md:-mt-1 mb-3">
          <p className="text-justify">Still building — features may not work as expected.</p>
        </div>

        {/* Foodie thoughts */}

        {foodieThoughtsData?.length !== 0 && (
          <>
            <section className="w-full max-w-[1040px] mx-auto ">
              <FoodieThoughts data={foodieThoughtsData} />
            </section>
            <hr className="my-6 max-md:mb-4 md:mt-10 md:mb-8 text-gray-400" />
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
            <hr className="my-6 max-md:mb-4 md:mt-10 md:mb-8 text-gray-400" />
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
            <hr className="my-6 max-md:mb-4 md:mt-10 md:mb-8 text-gray-400" />
          </>
        )}

        {/* Best cuisines near me */}

        {bestCuisinesNearMe?.length !== 0 && (
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
                <PlaceCardsContainer data={bestCuisinesNearMe} clickHandler={cuisineClickHandler} path={`/cityPage/${city}?mode=cuisine`} />
              </Suspense>
            </section>
            <hr className="my-6 max-md:mb-4 md:mt-10 md:mb-8 text-gray-400" />
          </>
        )}

        {/* All available cities in which we server */}

        {allAvailableCities.length !== 0 && (
          <Suspense
            fallback={
              <div className="flex justify-between">
                {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
              </div>
            }
          >
            <HomeCities />
          </Suspense>
        )}
        <MobileFooterMenu />
      </main>
      <BackToTopBtn extraMargin={bottomMenuUp} />
    </>
  );
});

export default Home;

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.
