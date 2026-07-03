import { useDispatch } from 'react-redux';
import {
  addCurrentRestaurant,
  setMenuItems,
} from '../../features/home/restaurantsSlice';
import { Link, Await, useLoaderData, useSearchParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import Ui4Shimmer from './Ui4Shimmer';
import useScrollToTop from '../../utils/useScrollToTop';

const Card = ({ data, lat, lng }) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${data?.cloudinaryImageId}`;
  const path = `/restaurantSpecific/${lat}/${lng}/${data?.id}/${data?.name}`;

  const handleClick = (name) => {
    dispatch(addCurrentRestaurant(name));
    dispatch(setMenuItems({ mode: 'empty' }));
  };

  return (
    <Link
      to={path}
      onClick={() => handleClick(data?.name)}
      className="flex w-1/2 basis-full cursor-pointer gap-3 rounded-md bg-white px-4 pt-3 pb-8 md:basis-[49%] dark:bg-gray-300"
    >
      <div className="relative shrink-0">
        <img
          src={isError ? '/images/fallback.png' : imageUrl}
          alt="dish image"
          className="h-28 rounded-md object-cover"
          height={90}
          width={100}
          onError={() => setIsError(true)}
        />
        {data?.aggregatedDiscountInfoV3 && (
          <div className="absolute top-[80%] left-1/2 flex max-w-[100%] -translate-x-1/2 transform flex-col items-center justify-center gap-0 rounded-md bg-white px-1.5 py-0.5 text-sm shadow-[0_0_10px_1px_#1e2939] max-md:text-sm">
            <p className="text-primary font-bold tracking-tight whitespace-nowrap">
              {data?.aggregatedDiscountInfoV3?.header}
            </p>
            <p className="text-primary -mt-0.5 text-xs font-semibold tracking-tight whitespace-nowrap">
              {data?.aggregatedDiscountInfoV3?.subHeader}
            </p>
          </div>
        )}
      </div>
      <div className="flex w-[65%] flex-col justify-center gap-1 md:w-[70%]">
        <p className="w-full truncate font-bold text-gray-800 dark:text-black">
          {data?.name}
        </p>
        <div className="flex flex-col items-center gap-1 text-sm font-semibold text-gray-500 max-md:items-start md:flex-row">
          <div className="flex flex-row items-center gap-1 dark:text-gray-700">
            <i className="ri-star-fill mb-0.5 text-green-700" />
            <p>{data?.avgRating}</p>
            <p>•</p>
            <p>{data?.sla?.slaString}</p>
          </div>
          <div className="flex flex-row items-center gap-1 dark:text-gray-700">
            <p className="hidden md:block">•</p>
            <p>{data?.costForTwoMessage}</p>
          </div>
        </div>
        <div className="line-clamp-2">
          <p className="text-sm font-medium tracking-wide">
            {data?.cuisines?.join(', ')}
          </p>
        </div>
      </div>
    </Link>
  );
};

const MainContent = ({ data, lat, lng, mode }) => {
  useScrollToTop();
  const cards =
    mode === 'parent'
      ? data?.data?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
          ?.cards
      : data?.data?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.RESTAURANT
          ?.cards;

  const clickedRestro = cards?.[0]?.card?.card?.info;

  const moreRestrosCardContainer = cards?.[1]?.card?.card;

  const moreText = moreRestrosCardContainer?.title;
  const moreRestros = moreRestrosCardContainer?.restaurants?.map(
    (data) => data.info,
  );

  const tabRestaurantData = cards?.map((data) => data?.card?.card?.info);

  return (
    <div className="flex w-full flex-col rounded-md bg-gray-200 p-3 pt-18 dark:bg-gray-800">
      {mode === 'parent' ? (
        <>
          {clickedRestro && (
            <div className="flex w-full">
              <Card data={clickedRestro} lat={lat} lng={lng} />
            </div>
          )}
          {moreText && (
            <p className="mt-8 mb-6 font-bold dark:text-white">{moreText}</p>
          )}
          <div className="flex flex-wrap justify-between gap-1 gap-y-3">
            {moreRestros &&
              moreRestros.map((data) => (
                <Card key={data?.id} data={data} lat={lat} lng={lng} />
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap justify-between gap-1 gap-y-3">
          {tabRestaurantData ? (
            tabRestaurantData.map((data) => (
              <Card key={data?.id} data={data} lat={lat} lng={lng} />
            ))
          ) : (
            <p className="py-4 text-center font-semibold dark:text-gray-200">
              Sorry no data for this restaurant
            </p>
          )}
        </div>
      )}
      {mode === 'parent' && !clickedRestro && !moreRestros && (
        <p className="py-4 text-center font-semibold dark:text-gray-200">
          Sorry no data for this restaurant
        </p>
      )}
    </div>
  );
};

const RestaurantResultPage = () => {
  const { data } = useLoaderData();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const mode = searchParams.get('mode');

  return (
    <Suspense fallback={<Ui4Shimmer />}>
      <Await resolve={data}>
        {(data) => <MainContent data={data} lat={lat} lng={lng} mode={mode} />}
      </Await>
    </Suspense>
  );
};

export default RestaurantResultPage;
