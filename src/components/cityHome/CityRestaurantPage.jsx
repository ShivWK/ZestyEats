import RestaurantCard from '../Home/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondaryCity } from '../../features/cityHome/cityHomeSlice';
import { selectVegVariant } from '../../features/home/restaurantsSlice';
import { Suspense, useEffect } from 'react';
import BreadcrumbsWrapper from '../BreadcrumbsWrapper';
import Filter from '../Home/Filters';
import ScooterAnimation from '../../utils/ScooterAnimation';
import { Await, useParams, useLoaderData } from 'react-router-dom';
import ShimmerContainer from '../FoodSpecific/ShimmerContainer';
import NoRestaurantSvg from './NoRestaurantSvg';

const MainContainer = ({ data }) => {
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  const restaurantTitle = data?.find(
    (card) => card?.card?.card?.id === 'popular_restaurants_title',
  )?.card?.card?.title;

  const info = data?.find(
    (card) => card?.card?.card?.id === 'restaurant_grid_listing_v2',
  );

  if (!info) {
    return (
      <main className="relative mx-auto flex h-10/12 w-full flex-col items-center justify-center gap-3 overflow-hidden px-4 pt-24 md:max-w-[1210px] md:gap-5 md:pt-32 lg:pb-5">
        <NoRestaurantSvg />
        <p className="text-center font-semibold text-gray-800 dark:text-gray-200">
          Oops! No outlets found right now. This restaurant doesn’t have any
          active locations at the moment.
        </p>
      </main>
    );
  } else {
    const mainData = info?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    const dataToMap = mainData.map((data) => data?.info);

    return (
      <>
        <main className="relative mx-auto flex w-full flex-col gap-3 overflow-hidden p-2 pt-20 pb-0 md:max-w-[1210px] md:gap-5 md:pt-32">
          <div>
            <BreadcrumbsWrapper
              normalTextColor={'#4a5565'}
              mainTextColor={'#101828'}
              delimiterColor={'text-gray-600'}
            />
          </div>
          <h1 className="heading mx-0 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            {restaurantTitle}
          </h1>
          <p className="description -mt-2 mb-2 font-medium text-gray-800 max-md:leading-6 md:-mt-4 md:text-lg dark:text-gray-300">
            Hungry? ZestyEats has you covered. Explore and order from multiple
            outlets in just a few taps.
          </p>
          <div className="-mt-4 -mb-1 md:-mt-5 md:-mb-2">
            <Filter />
          </div>
          <div className="restro-count text-2xl font-bold tracking-tight dark:text-gray-200">
            <p>Where Do You Want to Order From?</p>
          </div>
          <div className="flex justify-center">
            <div className="flex w-full flex-wrap gap-9 p-1">
              {dataToMap.map((item, index) => {
                if (!vegOption && item.veg) return;
                if (!nonVegOption && !item.veg) return;

                return (
                  <RestaurantCard key={index} data={item} from="specificFood" />
                );
              })}
            </div>
          </div>
          <div className="md:hidden">
            <ScooterAnimation />
          </div>
        </main>
        <div className="hidden md:block">
          <ScooterAnimation />
        </div>
      </>
    );
  }
};

const CityRestaurantPage = () => {
  const dispatch = useDispatch();
  const { data } = useLoaderData();
  const { cityName } = useParams();

  useEffect(() => dispatch(setSecondaryCity(cityName)), []);

  return (
    <Suspense fallback={<ShimmerContainer />}>
      <Await resolve={data}>
        {(data) => {
          const dataToMAp =
            data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
          console.log(dataToMAp);

          return <MainContainer data={dataToMAp} />;
        }}
      </Await>
    </Suspense>
  );
};

export default CityRestaurantPage;
