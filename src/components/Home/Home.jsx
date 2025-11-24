// Done

import { lazy, Suspense } from "react";
const OnlineDeliveryRestaurant = lazy(() =>import("./OnlineDeliveryRestaurant"));
const TopRestaurantChains = lazy(() => import("./TopRestaurantChains"));
const PlaceCardsContainer = lazy(() => import("./PlaceCardsContainer"));
const NoServiceArea = lazy(() => import("./NoServiceArea"));
const HomeCities = lazy(() => import("./homeCities"));
import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";

import MobileFooterMenu from "../Footer/MobileFooterMenu";
import useScrollToTop from "../../utils/useScrollToTop";
import Loader from "../Loader";
import BackToTopBtn from "../BackToTopBtn";
import dummyArray from "../../utils/DummyArray";
import { useSelector } from "react-redux";

import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  selectBestCuisinesNearMe,
  selectAvailableCities,
  selectCity,
  selectBottomMenu,
  selectIsServiceable
} from "../../features/home/homeSlice";

import HomeShimmer from "./HomeShimmer";
import useModalTrace from "./../../utils/useModalTrace";

const Home = () => {
  useScrollToTop();
  useModalTrace();
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurantData = useSelector(selectOnlineDeliveryRestaurants);
  const bestCuisinesNearMe = useSelector(selectBestCuisinesNearMe);
  const isLoadingMain = useSelector(selectIsLoading);
  const allAvailableCities = useSelector(selectAvailableCities);
  const city = useSelector(selectCity)?.toLowerCase().replace(/\s/g, "-");
  const service = useSelector(selectIsServiceable);
  const bottomMenuUp = useSelector(selectBottomMenu);
  const SHIMMER_ARRAY = dummyArray(4)

  const cuisineClickHandler = async (data, trigger, setLoading, dataUpdater, dispatch) => {
    const pathname = new URL(data.link).pathname;
    const cuisine = pathname.match(/\/(.*?)-restaurants/)[1]
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

        <div className="relative rounded-2xl md:rounded-4xl overflow-hidden max-md:-mt-2 mb-3 w-full h-32 lg:h-80 mx-auto">
          <img src="/images/new_banner.jpg" className="h-full w-full r" alt="Home banner image" />
        </div>

        {/* if unserviceable */}
        {service && <NoServiceArea />}

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
                  <div className="flex flex-col max-md:gap-3 ">
                    <div className="w-[80%] h-6 rounded-md shimmerBg" />

                    <div className="flex justify-between max-md:gap-3 overflow-hidden max-lg:mt-3">
                      {SHIMMER_ARRAY.map(i => <div key={i} className="w-80 h-48 md:w-60 md:h-40 rounded-xl shimmerBg shrink-0" />)}
                    </div>
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
                  <div className="flex justify-between md:flex-row flex-col gap-3 max-md:gap-3 max-md:px-1.5">
                    {SHIMMER_ARRAY.map(i => <div key={i} className="w-full md:w-60 h-48 md:h-44 rounded-xl shimmerBg shrink-0" />)}
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
                    {SHIMMER_ARRAY.map(i => <div key={i} className="w-[98px] h-10 md:w-60 md:h-20 rounded-xl shimmerBg" />)}
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
                {SHIMMER_ARRAY.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
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
};

export default Home;
