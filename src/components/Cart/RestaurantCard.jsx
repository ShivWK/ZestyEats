import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  addCurrentRestaurant,
  setDeliveryRestaurantLoading,
} from '../../features/home/restaurantsSlice';
import ItemCard from './ItemCard';
import useCheckStatus from '../../utils/useCheckStatus';
import { useEffect } from 'react';

const RestaurantCard = ({ data }) => {
  const dispatch = useDispatch();
  const restaurantData = data[0].metadata || data[0];
  const items = data.slice(1);

  const [lat, lng] = restaurantData.latLong.split(',');

  const status = useCheckStatus(lat, lng, restaurantData.id);

  const id = restaurantData.id;
  const name = restaurantData.name;

  const areaName = restaurantData.areaName;
  const locality = restaurantData.locality;
  let areaOrLocality = locality + ', ' + areaName;

  if (areaName === locality) areaOrLocality = locality;

  const citySmall = restaurantData?.slugs?.city;
  const city = citySmall[0].toUpperCase() + citySmall.slice(1) + '.';

  const ClickHandler = () => {
    dispatch(addCurrentRestaurant(name));
  };

  useEffect(() => {
    if (!status.loading) {
      dispatch(setDeliveryRestaurantLoading(false));
    }
  }, [status.loading]);

  return (
    <section className="flex flex-col gap-2 md:basis-[59%]">
      <div className="rounded-md bg-white p-2 pb-3 dark:bg-gray-300">
        <div className="flex w-full flex-col gap-1">
          <Link
            to={`/restaurantSpecific/${lat}/${lng}/${id}/${name}`}
            onClick={ClickHandler}
            className="group flex items-center justify-between"
          >
            <p className="basis-[95%] truncate text-xl font-bold select-none">
              {name}
            </p>
            <i className="ri-arrow-right-long-fill basis-[4%] transform cursor-pointer p-0 text-2xl text-gray-800 transition-all duration-200 ease-in-out group-hover:translate-x-[6px]"></i>
          </Link>

          <p className="-mt-1 truncate text-sm font-bold text-gray-700 capitalize dark:text-gray-900">
            {areaOrLocality + ', ' + city}
          </p>

          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-gray-800">
            <i className="ri-star-fill mb-0.5 text-green-700 dark:text-green-400" />
            <p>{restaurantData?.avgRating}</p>
            <p>•</p>
            <p>{restaurantData?.sla?.slaString || '25-30 MINS'}</p>

            {!status.loading ? (
              <>
                <p>•</p>
                <p
                  className={`${
                    status.opened
                      ? 'text-green-500 dark:text-green-400'
                      : 'text-red-600'
                  } font-semibold`}
                >
                  {status.opened ? 'OPEN 😊' : 'CLOSED 😟'}
                </p>
                <p className="hidden md:inline">•</p>
                <div className="hidden items-center gap-1 md:flex">
                  {!status.isDeliverable ? (
                    <>
                      <p className="font-medium text-red-500">
                        Not delivering to your area{' '}
                      </p>
                      <div className="relative flex items-center gap-1.5">
                        <div id="No delivery" className="relative mt-0.5">
                          <i className="fas fa-shipping-fast text-black"></i>
                          <div className="absolute -bottom-0.5 ml-2 h-6 w-0.5 rotate-45 transform bg-red-500"></div>
                        </div>
                        {status.distance && (
                          <p className="font-normal text-gray-600">
                            ({status.distance} kms)
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-green-500">
                        Delivering to your area{' '}
                      </p>
                      <i className="fas fa-shipping-fast mt-0.5 text-black"></i>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="shimmerBg h-4 w-[50%] rounded max-md:hidden" />
                <div className="shimmerBg h-4 w-[22%] rounded md:hidden" />
              </>
            )}
          </div>
          <div className="md:hidden">
            {status.loading ? (
              <div className="shimmerBg my-[3px] h-4 w-[50%] rounded md:hidden" />
            ) : !status.isDeliverable ? (
              <div className="-my-0.5 flex items-center gap-1">
                <p className="text-sm font-medium text-red-500">
                  Not delivering to your area{' '}
                </p>
                <div className="relative flex items-center gap-1.5">
                  <div id="No delivery" className="relative mt-0.5">
                    <i className="fas fa-shipping-fast text-sm text-black"></i>
                    <div className="absolute bottom-0 ml-2 h-6 w-0.5 rotate-45 transform bg-red-500"></div>
                  </div>
                  {status.distance && (
                    <p className="text-sm text-gray-600">
                      ({status.distance} kms)
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="my-[1px] flex items-center gap-1">
                <p className="text-sm font-medium text-green-500">
                  Delivering to your area
                </p>{' '}
                <i className="fas fa-shipping-fast mt-0.5 text-sm text-black"></i>
              </div>
            )}
          </div>
        </div>
        <hr className="my-2 text-gray-400 md:my-3" />
        <div className="flex flex-col gap-2 md:px-1">
          {items.map((data) => (
            <ItemCard
              key={data.item.id}
              data={data}
              restaurantData={restaurantData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantCard;
