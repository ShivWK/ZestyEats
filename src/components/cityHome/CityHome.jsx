import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect, lazy } from 'react';
import {
  selectCityLatAndLng,
  setSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import useScrollToTop from '../../utils/useScrollToTop';

import FoodieThoughts from '../Home/FoodieThoughts/FoodieThoughts';
import TopRestaurantChains from '../Home/TopRestaurantChains';

const OnlineDeliveryRestaurant = lazy(
  () => import('../Home/OnlineDeliveryRestaurant'),
);
const PlaceCardsContainer = lazy(() => import('../Home/PlaceCardsContainer'));

import {
  selectCityLoading,
  selectPageData,
  selectSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import BackToTopBtn from '../BackToTopBtn';
import HomeShimmer from '../Home/HomeShimmer';

const MainContent = () => {
  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
  const data = useSelector(selectPageData);
  const secondaryCity = useSelector(selectSecondaryCity);

  const banner_text = data.cityBannerText;
  const foodieThoughtsData = data.cityFoodieData;
  const topRestaurantChainData = data.cityRestaurantChainData;
  const topRestaurantsTitle = data.cityRestaurantChainTitle;
  const onlineDeliveryRestaurantData = data.cityOnlineDeliveryRestaurantData;
  const onlineDeliveryRestaurantTitle = data.cityOnlineDeliveryRestaurantTitle;
  const localitiesTitle = data.cityLocalitiesTitle;
  const localitiesData = data.cityLocalitiesData;
  const whatEatingCuisineTitle = data.cityCuisinesTitle;
  const whatEatingCuisineData = data.cityCuisinesData;
  const restaurantChainInCityTitle = data.restaurantChainInCityTitle;
  const restaurantChainInCityData = data.restaurantChainInCityData;
  const popularDishesTitle = data.popularDishInCityTitle;
  const popularDishesData = data.popularDishInCityData;

  const placeCardClickHandler = async (dispatch, setSecondaryCity) => {
    dispatch(setSecondaryCity(secondaryCity));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="mx-auto w-full overflow-x-hidden pt-20 pb-10 max-md:px-1.5 md:max-w-[1070px] md:pt-28 md:pb-10">
      {/* /Banner Image */}

      <div
        id="banner"
        className="mt-0.5 mb-4 flex h-[30vh] w-full flex-col bg-[url('/images/food-banner.jpg')] bg-cover p-5 pb-3 max-md:rounded-e-3xl max-md:bg-right max-md:pl-2.5 md:mt-1 md:mb-8 md:h-[45vh] md:rounded-t-4xl"
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
          <hr className="mt-8 mb-4 text-gray-400 md:mt-10 md:mb-8" />
        </>
      )}

      {/* Localities */}

      {localitiesData?.length !== 0 && (
        <>
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
                data={localitiesData}
                heading={localitiesTitle}
                targetedCity={secondaryCity}
                path="SetLocality"
                clickHandler={placeCardClickHandler}
              />
            </Suspense>
          </section>
        </>
      )}

      {/* What's city eating */}

      {whatEatingCuisineData?.length !== 0 && (
        <>
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
                clickHandler={placeCardClickHandler}
                path={'SetCuisine'}
              />
            </Suspense>
          </section>
        </>
      )}

      {/* Restaurant Chain in city */}

      {restaurantChainInCityData?.length !== 0 && (
        <>
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
                data={restaurantChainInCityData}
                heading={restaurantChainInCityTitle}
                clickHandler={placeCardClickHandler}
                targetedCity={secondaryCity}
                path="SetRestaurant"
              />
            </Suspense>
          </section>
        </>
      )}

      {/* Popular dishes */}

      {popularDishesData?.length !== 0 && (
        <>
          <section className="mx-auto flex w-full flex-col items-center gap-4 md:max-w-[1000px]">
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
                data={popularDishesData}
                heading={popularDishesTitle}
                targetedCity={secondaryCity}
                path="SetDish"
                clickHandler={placeCardClickHandler}
              />
            </Suspense>
          </section>
        </>
      )}
      <BackToTopBtn />
    </main>
  );
};

const CityHome = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { cityName: city } = useParams();
  const loading = useSelector(selectCityLoading);

  useEffect(() => {
    dispatch(setSecondaryCity(city));
  }, []);

  return loading ? (
    <main className="mx-auto w-full overflow-x-hidden pt-20 pb-8 max-md:px-1.5 md:max-w-[1070px] md:pt-28 md:pb-10">
      <HomeShimmer />
    </main>
  ) : (
    <MainContent />
  );
};

export default CityHome;
