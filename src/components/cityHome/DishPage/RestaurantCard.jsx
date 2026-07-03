import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ItemCard from './ItemCard';
import HorizontalCarousel from './../../HorizontalCarousel';
import { addCurrentRestaurant } from '../../../features/home/restaurantsSlice';

const RestaurantCart = ({ data, latLng }) => {
  const dispatch = useDispatch();
  const restaurantData = data.restaurant.info;
  const dishesData = data.dishes.map((data) => data.info);
  const { lat, lng } = latLng;

  let restaurantDataV2 = structuredClone(restaurantData);
  restaurantDataV2.latLong = `${lat},${lng}`;

  const citySmall = restaurantData?.slugs?.city;
  const city = citySmall[0].toUpperCase() + citySmall.slice(1);
  const areaName = restaurantData.areaName;
  const locality = restaurantData.locality;
  let areaOrLocality = locality + ', ' + areaName + ', ' + city;

  if (areaName === locality) areaOrLocality = locality + ', ' + city;

  const clickHandler = () => {
    dispatch(addCurrentRestaurant(restaurantData.name));
  };

  return (
    <section className="m-0.5 my-4 rounded-xl bg-white md:my-4 dark:bg-gray-300">
      <div className="flex w-full flex-col gap-0.5 px-2 py-2">
        <Link
          to={`/restaurantSpecific/${lat}/${lng}/${restaurantData.id}/${restaurantData.name}?mode=dishPage`}
          className="group flex items-center justify-between"
          onClick={clickHandler}
        >
          <p className="basis-[90%] truncate text-xl font-bold select-none md:basis-[96%] dark:text-black">
            {restaurantData.name}
          </p>

          <i className="active:text-primary ri-arrow-right-long-fill basis-[8%] transform cursor-pointer text-2xl text-gray-900 transition-all duration-150 ease-in-out group-hover:translate-x-[6px] md:basis-[3%] dark:text-black"></i>
        </Link>

        <p className="-mt-1 truncate text-xs font-bold text-gray-700 md:text-sm dark:text-gray-950">
          {areaOrLocality}
        </p>

        <div className="flex items-center gap-1 text-sm font-semibold text-gray-600 dark:text-gray-800">
          <i className="ri-star-fill mb-0.5 text-green-700 dark:text-green-400" />
          <p>{restaurantData?.avgRating}</p>
          <p>•</p>
          <p>{restaurantData?.sla?.slaString || '25-30 MINS'}</p>
        </div>
        <hr className="mt-1 text-gray-300 dark:text-gray-600" />
        <div className="">
          <HorizontalCarousel
            showScrollBar={false}
            dataToMap={dishesData}
            Card={ItemCard}
            restaurantData={restaurantDataV2}
          />
        </div>
      </div>
    </section>
  );
};

export default RestaurantCart;
