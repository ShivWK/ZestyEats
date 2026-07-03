import { useParams, useLoaderData, Await } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect, lazy } from 'react';
import {
  setSecondaryCity,
  selectSecondaryCity,
  setLocalityLatAndLng,
} from '../../features/cityHome/cityHomeSlice';
import useScrollToTop from '../../utils/useScrollToTop';

import FoodieThoughts from '../Home/FoodieThoughts/FoodieThoughts';
import TopRestaurantChains from '../Home/TopRestaurantChains';
const OnlineDeliveryRestaurant = lazy(
  () => import('../Home/OnlineDeliveryRestaurant'),
);
const PlaceCardsContainer = lazy(() => import('../Home/PlaceCardsContainer'));

import BackToTopBtn from '../BackToTopBtn';
import HomeShimmer from '../Home/HomeShimmer';
import cityLocalityDataFetcher from '../../utils/cityLocalityDataFetcher';

const MainContent = ({ data }) => {
  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
  const mainData = cityLocalityDataFetcher(data);
  const dispatch = useDispatch();

  const secondaryCity = useSelector(selectSecondaryCity);

  const banner_text = mainData.bannerText;
  const foodieThoughtsData = mainData.foodieData;
  const topRestaurantChainData = mainData.restaurantChain.data;
  const topRestaurantsTitle = mainData.restaurantChain.title;
  const onlineDeliveryRestaurantData = mainData.onlineRestaurant.data;
  const onlineDeliveryRestaurantTitle = mainData.onlineRestaurant.title;
  const whatEatingCuisineData = mainData.cuisines.data;
  const whatEatingCuisineTitle = mainData.cuisines.title;
  const localityLatAndLng = mainData.localityLatAndLng;

  useEffect(() => dispatch(setLocalityLatAndLng(localityLatAndLng)));

  const whatEatingClickHandler = async (dispatch, setSecondaryCity) => {
    dispatch(setSecondaryCity(secondaryCity));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="mx-auto w-full overflow-x-hidden pt-20 pb-2 max-md:px-1.5 md:max-w-[1070px] md:pt-28 md:pb-4">
      {/* /Banner Image */}

      <div
        id="banner"
        className="mt-0.5 mb-4 flex h-[30vh] w-full flex-col bg-[url('/images/food-banner.jpg')] bg-cover p-5 max-md:rounded-e-3xl max-md:bg-right max-md:pl-2.5 md:mt-1 md:mb-8 md:h-[50vh] md:rounded-t-4xl"
      >
        <h1 className="order-2 mt-auto text-2xl text-white max-md:leading-6 md:text-4xl">
          {banner_text}
        </h1>
        <h2 className="order-1 text-3xl text-white max-md:-mt-2 md:text-4xl">
          ZestyEats
        </h2>
      </div>

      {/* Foodie Thoughts */}

      {foodieThoughtsData?.length !== 0 && (
        <>
          <section className="mx-auto w-full max-w-[1040px]">
            <FoodieThoughts data={foodieThoughtsData} />
          </section>
          <hr className="mt-10 mb-4 text-gray-400 md:mb-8" />
        </>
      )}

      {topRestaurantChainData?.length !== 0 && (
        <>
          <section className="mx-auto w-full max-w-[1040px]">
            <Suspense
              fallback={
                <div className="flex justify-between">
                  {shimmerArray.map((i) => (
                    <div key={i} className="shimmerBg h-44 w-60 rounded-xl" />
                  ))}
                </div>
              }
            >
              <TopRestaurantChains
                data={topRestaurantChainData}
                heading={topRestaurantsTitle}
              />
            </Suspense>
          </section>
          <hr className="mt-10 mb-4 text-gray-400 md:mb-8" />
        </>
      )}

      {onlineDeliveryRestaurantData?.length !== 0 && (
        <>
          <section className="w-full">
            <Suspense
              fallback={
                <div className="flex justify-between">
                  {shimmerArray.map((i) => (
                    <div key={i} className="shimmerBg h-44 w-60 rounded-xl" />
                  ))}
                </div>
              }
            >
              <OnlineDeliveryRestaurant
                data={onlineDeliveryRestaurantData}
                heading={onlineDeliveryRestaurantTitle}
              />
            </Suspense>
          </section>
          <hr className="mt-10 mb-4 text-gray-400 md:mb-8" />
        </>
      )}

      {/* What's city eating */}

      {whatEatingCuisineData?.length !== 0 && (
        <section className="mx-auto mb-7 flex w-full flex-col items-center gap-4 md:max-w-[1000px]">
          <Suspense
            fallback={
              <div className="flex justify-between gap-4">
                {shimmerArray.map((i) => (
                  <div key={i} className="shimmerBg h-20 w-60 rounded-xl" />
                ))}
              </div>
            }
          >
            <PlaceCardsContainer
              data={whatEatingCuisineData}
              heading={whatEatingCuisineTitle}
              targetedCity={secondaryCity}
              clickHandler={whatEatingClickHandler}
              path={'SetCuisine'}
            />
          </Suspense>
        </section>
      )}

      {/* <BackToTopBtn /> */}
    </main>
  );
};

const CityLocality = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { cityName: city } = useParams();
  const { data } = useLoaderData();

  useEffect(() => {
    dispatch(setSecondaryCity(city));
  }, []);

  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full overflow-x-hidden pt-20 pb-8 max-md:px-1.5 md:max-w-[1070px] md:pt-28 md:pb-10">
          <HomeShimmer />
        </main>
      }
    >
      <Await resolve={data}>
        {(data) => {
          const cardData =
            data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
          if (!cardData) {
            return (
              <main className="mx-auto flex min-h-96 w-full flex-col items-center gap-2 overflow-x-hidden pt-28 pb-4 max-md:px-3 md:max-w-[1070px] md:pt-40">
                <p className="text-5xl">😔</p>
                <p className="mt-2 text-center text-2xl font-bold text-gray-900">
                  No data available for this locality right now.
                </p>
                <p className="text-center text-xl font-semibold text-gray-600">
                  We’re working to bring more restaurants and offers to this
                  area. Stay tuned!
                </p>
              </main>
            );
          }
          return <MainContent data={cardData} />;
        }}
      </Await>
    </Suspense>
  );
};

export default CityLocality;
