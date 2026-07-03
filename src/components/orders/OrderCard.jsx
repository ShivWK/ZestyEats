// Done
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addCurrentRestaurant } from '../../features/home/restaurantsSlice';
import { Copy, CheckCheck, ChevronDown, Store } from 'lucide-react';
import { useState } from 'react';
import calFinalPrice from '../../utils/calFinalPrice';
import VegSvg from '../../utils/VegSvg';
import NonVegSvg from '../../utils/NonVegSvg';
import BillingCard from './BillingCard';
import AddressCard from './AddressCard';
import humanReadableDate from '../../utils/humanReadableDate';

const OrderCard = ({ data, orderId }) => {
  // console.log("orders/OrderCard rendered");
  const [copied, setCopied] = useState(false);
  const [openDetails, setOPendDetails] = useState(false);

  const mainData = Object.values(data.items);
  const dataToMap = mainData.map((items) => ({
    item: items.item,
    quantity: items.quantity,
  }));
  const restaurantMetadata =
    mainData[0].restaurantData.metadata || mainData[0].restaurantData;
  const dispatch = useDispatch();

  const [lat, lng] = restaurantMetadata.latLong.split(',');

  const id = restaurantMetadata.id;
  const name = restaurantMetadata.name;

  let areaOrLocality =
    restaurantMetadata.areaName !== restaurantMetadata.locality
      ? restaurantMetadata.locality + ', ' + restaurantMetadata.areaName
      : restaurantMetadata.locality;

  const citySmall = restaurantMetadata?.slugs?.city;
  const city = citySmall[0].toUpperCase() + citySmall.slice(1) + '.';

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(addCurrentRestaurant(name));
  };

  const copyClickHandler = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (err) {
      console.log('Failed to copy', err);
    }
  };

  return (
    <div className="rounded-t-md bg-white p-2 dark:bg-gray-300">
      <div className="flex w-full flex-col gap-1">
        <Link
          to={`/restaurantSpecific/${lat}/${lng}/${id}/${name}`}
          onClick={clickHandler}
          className="group flex items-center gap-1"
        >
          <Store size={20} strokeWidth={2} />
          <p className="basis-[95%] truncate text-xl font-bold select-none">
            {name}
          </p>
          <i className="ri-arrow-right-long-fill ml-auto basis-[4%] transform cursor-pointer p-0 text-2xl text-gray-800 transition-all duration-200 ease-in-out group-hover:translate-x-[6px]"></i>
        </Link>

        <p className="-mt-1 truncate text-sm font-bold text-gray-700 capitalize dark:text-gray-900">
          {areaOrLocality + ', ' + city}
        </p>
        <hr className="my-1 text-gray-500" />
      </div>

      <div className="mt-2">
        <h2 className="flex items-center gap-1 text-sm font-semibold tracking-wider text-gray-600">
          <span>Order ID:</span>
          <span>{`#${orderId}`}</span>
          {copied ? (
            <CheckCheck
              size={17}
              strokeWidth={3}
              className="ml-1 text-green-500"
            />
          ) : (
            <button onClick={copyClickHandler}>
              <Copy size={15} strokeWidth={3} className="ml-1" />
            </button>
          )}
        </h2>

        <div className="mt-3 mb-1 flex flex-col justify-center gap-1.5">
          {dataToMap.map((item) => {
            const price = calFinalPrice({
              quantity: item.quantity,
              item: item.item,
            });

            return (
              <div className="flex w-full items-center gap-2">
                {item.item?.itemAttribute?.vegClassifier === 'VEG' ? (
                  <VegSvg />
                ) : (
                  <NonVegSvg />
                )}
                <span className="line-clamp-2 w-[78%] text-sm text-black">
                  {`${item.quantity} x ${item.item.name}`}
                </span>
                {openDetails && (
                  <span className="ml-auto text-sm font-bold">
                    {`₹${price}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {!openDetails && (
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-semibold tracking-wider text-gray-600">
              {`Placed on: ${humanReadableDate(data.createdAt)}`}
            </span>
            <span className="bg-primary dark:bg-darkPrimary rounded-md px-2 py-1 font-semibold tracking-wider text-white">{`₹${data.billing.grandTotal}`}</span>
          </div>
        )}

        <button
          onClick={() => setOPendDetails(!openDetails)}
          className={`bg-primary dark:bg-darkPrimary mx-auto flex items-center gap-1.5 rounded-md px-4 py-0.5 font-bold tracking-wider text-white ${openDetails ? 'mt-4' : 'mt-2'}`}
        >
          <span>Details</span>
          <ChevronDown
            size={15}
            strokeWidth={4}
            className={`m-0 transform p-0 transition-all duration-200 ease-linear ${openDetails && '-rotate-180'}`}
          />
        </button>

        <div
          className={`mt-1 flex flex-col gap-1 ${openDetails ? 'h-[32rem]' : 'h-0'} overflow-hidden transition-all duration-100 ease-in-out`}
        >
          <hr className="my-3 mt-4 text-gray-500" />
          <BillingCard data={data} />
          <hr className="my-3 mt-4 text-gray-500" />
          <AddressCard data={data} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
