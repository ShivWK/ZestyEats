import { useParams, useLoaderData, Await } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
// import useScrollToTop from "../../utils/useScrollToTop";
import CuisineShimmer from './CuisineShimmer';

const OnlineDeliveryRestaurant = lazy(
  () => import('../Home/OnlineDeliveryRestaurant'),
);

import {
  selectCityLatAndLng,
  selectSecondaryCity,
  setSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import ScooterAnimation from '../../utils/ScooterAnimation';

const MainContent = ({ data }) => {
  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
  const secondaryCity = useSelector(selectSecondaryCity);
  const onlineDeliveryCity =
    secondaryCity[0].toUpperCase() + secondaryCity.slice(1);

  const bannerText = data?.find(
    (card) => card?.card?.card?.id === 'best_restaurants_header',
  )?.card?.card?.title;

  const OnlineRestaurantData =
    data?.find((card) => card?.card?.card?.id === 'restaurant_grid_listing_v2')
      ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

  return (
    <>
      <main className="mx-auto w-full overflow-x-hidden pt-20 max-md:px-1.5 md:max-w-[1070px] md:pt-28">
        {/* /Banner Image */}

        <div
          id="banner"
          className="mt-0.5 mb-4 flex h-[30vh] w-full flex-col bg-[url('/images/food-banner.jpg')] bg-cover p-5 max-md:rounded-e-3xl max-md:bg-right max-md:pl-2.5 md:mt-1 md:mb-8 md:h-[50vh] md:rounded-t-4xl"
        >
          <h1 className="order-2 mt-auto text-2xl text-white max-md:leading-6 md:text-4xl">
            {bannerText}
          </h1>
          <h2 className="order-1 text-3xl text-white max-md:-mt-2 md:text-4xl">
            ZestyEats
          </h2>
        </div>

        {OnlineRestaurantData?.length !== 0 && (
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
                  data={OnlineRestaurantData}
                  heading={``}
                />
              </Suspense>
            </section>
          </>
        )}
        <div className="my-5 mb-0 md:hidden">
          <ScooterAnimation />
        </div>
      </main>
      <div className="my-8 hidden md:block">
        <ScooterAnimation />
      </div>
    </>
  );
};

const CityCuisines = () => {
  const dispatch = useDispatch();
  const { data } = useLoaderData();
  const { cityName } = useParams();

  useEffect(() => {
    dispatch(setSecondaryCity(cityName));
  }, []);

  return (
    <Suspense
      fallback={
        <>
          <main className="mx-auto w-full overflow-x-hidden pt-20 max-md:px-1.5 md:max-w-[1070px] md:pt-28">
            <CuisineShimmer />
            <div className="my-5 mb-0 md:hidden">
              <ScooterAnimation />
            </div>
          </main>
          <div className="my-8 hidden max-md:mb-0 md:block">
            <ScooterAnimation />
          </div>
        </>
      }
    >
      <Await resolve={data}>
        {(data) => {
          const dataToSend =
            data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
          return <MainContent data={dataToSend} />;
        }}
      </Await>
    </Suspense>
  );
};

export default CityCuisines;
