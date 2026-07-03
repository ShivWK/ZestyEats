// Done

import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  addCurrentRestaurant,
  setMenuItems,
  setRestaurantItems,
} from '../../features/home/restaurantsSlice';
import { useState } from 'react';
import PureVeg from '../../utils/PureVegSvg';
import VegAndNonVeg from '../../utils/VegAndNonVegSvg';
import textToZestyEats from '../../utils/textToZestyEats';
import calDistance from '../../utils/haversineFormula';
import NotAvailableCardOverlay from './NotAvailableCardOverlay';
import usePageLocation from '../../hooks/usePageLocation';
import RestaurantImageCard from './RestaurantImageCard';

const RestaurantCard = ({ data, from }) => {
  // console.log("Restaurant Card of Home rendered");
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const { lat, lng, mode } = usePageLocation(pathname);
  let { lat: lat1, lng: lng1 } = data;

  const dataToMap = pathname.includes('ordersAndWishlist') ? data.data : data;
  const [disable, setDisable] = useState(false);
  const userDistanceFromRestaurant = calDistance(lat1, lat, lng1, lng);

  const handleClick = (e) => {
    if (pathname.includes('ordersAndWishlist')) {
      if (userDistanceFromRestaurant > 20) e.preventDefault();
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    dispatch(addCurrentRestaurant(dataToMap?.name));
    dispatch(setMenuItems({ mode: 'empty' }));
    dispatch(setRestaurantItems([]));
  };

  let address =
    dataToMap?.locality === dataToMap?.areaName
      ? dataToMap?.locality
      : dataToMap?.locality + ', ' + dataToMap?.areaName;

  return (
    <Link
      to={`/restaurantSpecific/${lat}/${lng}/${dataToMap?.id}/${dataToMap?.name}?mode=${mode}`}
      onClick={handleClick}
      className={`relative flex shrink-0 flex-row items-center rounded-2xl transition-all duration-100 ease-in-out hover:scale-95 max-md:w-full max-md:gap-4 md:flex-col ${
        from === 'online'
          ? 'md:w-[240px]'
          : from === 'specificFood'
            ? 'md:w-[360px]'
            : 'md:w-[275px]'
      }`}
    >
      <NotAvailableCardOverlay
        disable={disable}
        lat={lat}
        lng={lng}
        dataToMap={dataToMap}
      />

      <RestaurantImageCard
        disable={disable}
        dataToMap={dataToMap}
        from={from}
        userDistanceFromRestaurant={userDistanceFromRestaurant}
        setDisable={setDisable}
      />

      <div className="w-[95%] max-md:basis-1/2 max-md:py-2 md:mt-3">
        <p className="line-clamp-3 w-[98%] text-[17px] leading-5 font-bold break-words dark:text-gray-300">
          {textToZestyEats(dataToMap?.name) || ''}
        </p>
        <div className="-mt-0.5 flex items-center gap-1 max-md:text-sm">
          <i className="ri-user-star-fill text-xl text-green-600"></i>
          <p className="font-semibold dark:text-gray-300">
            {dataToMap?.avgRatingString || ''}
          </p>
          <p className="dark:text-gray-300">•</p>
          <p className="font-bold dark:text-gray-300">
            {dataToMap?.sla?.slaString || '25-30 mins'}
          </p>
        </div>
        {dataToMap?.veg ? <PureVeg /> : <VegAndNonVeg />}
        <p
          className={`leading-0.5" mt-0.5 line-clamp-2 max-h-14 text-sm font-semibold break-words whitespace-normal text-gray-700 max-md:w-[85%] dark:text-gray-400 ${
            from === 'online' ? 'max-md:w-[85%]' : 'max-md:w-[75%]'
          }`}
        >
          {dataToMap?.cuisines?.join(', ') || ''}
          {'.'}
        </p>
        <p className="mt-0.5 text-sm font-medium break-words text-black capitalize max-md:line-clamp-2 max-md:max-w-[80%] md:truncate dark:text-gray-300">
          {address}
          {'.'}
        </p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
