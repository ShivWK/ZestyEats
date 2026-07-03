// Done

import { lazy, Suspense } from 'react';
const OnlineDeliveryRestaurant = lazy(() => import('./OnlineDeliveryRestaurant'));
const TopRestaurantChains = lazy(() => import('./TopRestaurantChains'));
const PlaceCardsContainer = lazy(() => import('./PlaceCardsContainer'));
const NoServiceArea = lazy(() => import('./NoServiceArea'));
const HomeCities = lazy(() => import('./homeCities'));
import FoodieThoughts from './FoodieThoughts/FoodieThoughts';

import MobileFooterMenu from '../Footer/MobileFooterMenu';
import useScrollToTop from '../../utils/useScrollToTop';
import Loader from '../Loader';
import BackToTopBtn from '../BackToTopBtn';
import dummyArray from '../../utils/DummyArray';
import { useSelector } from 'react-redux';

import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  selectBestCuisinesNearMe,
  selectAvailableCities,
  selectCity,
  selectBottomMenu,
  selectIsServiceable,
  selectCurrentTheme,
} from '../../features/home/homeSlice';

import HomeShimmer from './HomeShimmer';
import useModalTrace from './../../utils/useModalTrace';

const Home = () => {
  // console.log("Home rendered");
  useScrollToTop();
  useModalTrace();

  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurantData = useSelector(selectOnlineDeliveryRestaurants);
  const bestCuisinesNearMe = useSelector(selectBestCuisinesNearMe);
  const isLoadingMain = useSelector(selectIsLoading);
  const allAvailableCities = useSelector(selectAvailableCities);
  const city = useSelector(selectCity)?.toLowerCase().replace(/\s/g, '-');
  const service = useSelector(selectIsServiceable);
  const bottomMenuUp = useSelector(selectBottomMenu);
  const SHIMMER_ARRAY = dummyArray(4);
  const theme = useSelector(selectCurrentTheme);

  const cuisineClickHandler = async (
    data,
    trigger,
    setLoading,
    dataUpdater,
    dispatch,
  ) => {
    const pathname = new URL(data.link).pathname;
    const cuisine = pathname.match(/\/(.*?)-restaurants/)[1];
    const type = `${cuisine}-cuisine-`;

    dispatch(setLoading(true));

    try {
      const data = await trigger({ city, type }).unwrap();
      dataUpdater(data, dispatch);
    } catch (err) {
      console.log('Some error occurred', err);
      dispatch(setLoading(false));
      throw new Error('Cant fetch city home data');
    }
  };

  return isLoadingMain ? (
    <>
      <Loader size={'large'} />
      <div className="mx-auto w-full py-4 md:max-w-[1070px]">
        <HomeShimmer />
      </div>
    </>
  ) : (
    <>
      <main className="mx-auto w-full overflow-x-hidden pt-[88px] pb-8 max-md:px-1.5 md:max-w-[1070px] md:pt-26 md:pb-14">
        <div className="relative mx-auto mb-3 h-32 w-full overflow-hidden rounded-2xl max-md:-mt-2 md:rounded-4xl lg:h-80">
          <img
            src={theme === "dark" || theme === "system_dark" ? "/images/dark_home_banner.png" : "/images/light_home_banner.png"}
            className="r h-full w-full"
            alt="Home banner image"
          />
        </div>

        {/* if unserviceable */}
        {service && <NoServiceArea />}

        {/* Foodie thoughts */}
        {foodieThoughtsData?.length !== 0 && (
          <>
            <section className="mx-auto w-full max-w-[1040px]">
              <FoodieThoughts data={foodieThoughtsData} />
            </section>
            <hr className="my-6 text-gray-400 max-md:mb-4 md:mt-10 md:mb-8" />
          </>
        )}

        {/* Top restaurants chain */}
        {topRestaurantsChainsData?.length !== 0 && (
          <>
            <section className="mx-auto w-full max-w-[1040px]">
              <Suspense
                fallback={
                  <div className="flex flex-col max-md:gap-3">
                    <div className="shimmerBg h-6 w-[80%] rounded-md" />

                    <div className="flex justify-between overflow-hidden max-lg:mt-3 max-md:gap-3">
                      {SHIMMER_ARRAY.map((i) => (
                        <div
                          key={i}
                          className="shimmerBg h-48 w-80 shrink-0 rounded-xl md:h-40 md:w-60"
                        />
                      ))}
                    </div>
                  </div>
                }
              >
                <TopRestaurantChains data={topRestaurantsChainsData} />
              </Suspense>
            </section>
            <hr className="my-6 text-gray-400 max-md:mb-4 md:mt-10 md:mb-8" />
          </>
        )}

        {/* Restaurants with online delivery */}
        {onlineDeliveryRestaurantData?.length !== 0 && (
          <>
            <section className="w-full">
              <Suspense
                fallback={
                  <div className="flex flex-col justify-between gap-3 max-md:gap-3 max-md:px-1.5 md:flex-row">
                    {SHIMMER_ARRAY.map((i) => (
                      <div
                        key={i}
                        className="shimmerBg h-48 w-full shrink-0 rounded-xl md:h-44 md:w-60"
                      />
                    ))}
                  </div>
                }
              >
                <OnlineDeliveryRestaurant data={onlineDeliveryRestaurantData} />
              </Suspense>
            </section>
            <hr className="my-6 text-gray-400 max-md:mb-4 md:mt-10 md:mb-8" />
          </>
        )}

        {/* Best cuisines near me */}
        {bestCuisinesNearMe?.length !== 0 && (
          <>
            <section className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-4">
              <Suspense
                fallback={
                  <div className="flex flex-wrap justify-between gap-4">
                    {SHIMMER_ARRAY.map((i) => (
                      <div
                        key={i}
                        className="shimmerBg h-10 w-[98px] rounded-xl md:h-20 md:w-60"
                      />
                    ))}
                  </div>
                }
              >
                <PlaceCardsContainer
                  data={bestCuisinesNearMe}
                  clickHandler={cuisineClickHandler}
                  path={`/cityPage/${city}?mode=cuisine`}
                />
              </Suspense>
            </section>
            <hr className="my-6 text-gray-400 max-md:mb-4 md:mt-10 md:mb-8" />
          </>
        )}

        {/* All available cities in which we server */}
        {allAvailableCities.length !== 0 && (
          <Suspense
            fallback={
              <div className="flex justify-between">
                {SHIMMER_ARRAY.map((i) => (
                  <div key={i} className="shimmerBg h-20 w-60 rounded-xl" />
                ))}
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
