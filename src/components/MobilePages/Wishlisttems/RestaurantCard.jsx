import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectItemsToBeAddedInCart,
  selectWishlistItems,
  setItemToCart,
  selectCart,
  deleteItemFromWishlist,
  toggleItemsToBeAddedInCart,
  setMenuItems,
} from '../../../features/home/restaurantsSlice';
import useCheckStatus from './../../../utils/useCheckStatus';
import { triggerToast } from '../../../utils/triggerToast';

const RestaurantCard = ({ data }) => {
  // console.log("RestaurantCard rendered");

  const metadata = data.restro.metadata;
  const [lat, lng] =
    metadata?.latLong.split(',') || data.restro.latLong.split(',');

  const restro_id = metadata?.id || data.restro.id;
  const status = useCheckStatus(lat, lng, restro_id);

  const name = metadata?.name || data.restro.name;
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlistItems);
  const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);
  const restroItemsArray = itemsToAddInCart[restro_id] || [];

  const [itemsCount, setItemsCount] = useState(restroItemsArray.length);

  const areaName = data.restro.metadata?.areaName || data.restro.areaName;
  const locality = data.restro.metadata?.locality || data.restro.locality;
  let areaOrLocality = locality + ', ' + areaName;

  if (areaName === locality) areaOrLocality = locality;

  const citySmall = data.restro.metadata?.slugs?.city || data.restro.slugs.city;
  const city = citySmall[0].toUpperCase() + citySmall.slice(1) + '.';

  useEffect(() => {
    setItemsCount(itemsToAddInCart[restro_id]?.length || 0);
    localStorage.setItem(
      'ItemsToBeAddedInCart',
      JSON.stringify(itemsToAddInCart),
    );
  }, [itemsToAddInCart, restro_id]);

  const addItemsToCart = () => {
    if (restroItemsArray.length === 0) {
      triggerToast("You haven't selected any items to move.", '#ff5200');
      return;
    }

    const [firstKey] = Object.keys(cart);
    const presentRestaurant =
      cart[firstKey]?.restaurantData?.metadata?.id ||
      cart[firstKey]?.restaurantData?.id;

    if (presentRestaurant && presentRestaurant !== restro_id) {
      triggerToast('Clear cart to add items from this restaurant.', 'red');
      return;
    }

    for (const element of restroItemsArray) {
      dispatch(
        setItemToCart({
          add: true,
          id: element,
          data: wishlist[element],
        }),
      );

      dispatch(deleteItemFromWishlist(element));
      dispatch(
        toggleItemsToBeAddedInCart({
          add: false,
          id: element,
          restro_id,
        }),
      );
    }
  };

  const ClickHandler = () => {
    dispatch(setMenuItems({ mode: 'empty' }));
  };

  return (
    <section className="m-0.5 my-2 rounded border-2 border-gray-300 dark:bg-gray-300">
      <div className="flex w-full flex-col gap-0.5 p-1.5">
        <Link
          to={`/restaurantSpecific/${lat}/${lng}/${restro_id}/${name}`}
          onClick={ClickHandler}
          className="flex items-center justify-between"
        >
          <p className="basis-[90%] truncate text-xl font-bold select-none">
            {name}
          </p>
          <div className="active:text-primary basis-[8%]">
            <i className="ri-arrow-right-long-fill transform cursor-pointer p-0 text-2xl text-gray-800 transition-all duration-150 ease-in-out group-hover:translate-x-[6px] dark:text-black"></i>
          </div>
        </Link>

        <p className="-mt-1 truncate text-xs font-bold text-gray-700 capitalize dark:text-gray-900">
          {areaOrLocality + ', ' + city}
        </p>

        {status.loading ? (
          <div className="shimmerBg mb-0.5 h-4 w-[45%] rounded"></div>
        ) : (
          <div className="-mt-0.5 flex items-center gap-1.5">
            <p
              className={`${
                status.opened ? 'text-green-500' : 'text-red-600'
              } text-sm font-semibold`}
            >
              {status.opened ? 'OPEN 😊' : 'CLOSED 😟'}
            </p>
            {!status.isDeliverable ? (
              <div className="relative flex items-center gap-1.5 text-sm">
                <p>•</p>
                <div id="No delivery" className="relative">
                  <i className="fas fa-shipping-fast text-black"></i>
                  <div className="absolute -bottom-0.5 ml-2 h-6 w-0.5 rotate-45 transform rounded bg-red-500"></div>
                </div>
                {status.distance && (
                  <p className="text-gray-600 dark:text-gray-700">
                    ({status.distance} kms)
                  </p>
                )}
              </div>
            ) : (
              <div className="relative flex items-center gap-1.5 text-sm">
                <p>•</p>
                <div id="delivery" className="relative">
                  <i className="fas fa-shipping-fast text-black"></i>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="basis-[43%]">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-500 dark:text-gray-800">
              <i className="ri-star-fill mb-0.5 text-green-500" />
              <p>{metadata?.avgRating || data.restro.avgRating}</p>
              <p>•</p>
              <p>
                {metadata?.sla?.slaString ||
                  data.restro.sla.slaString ||
                  '25-30 MINS'}
              </p>
            </div>
          </div>
          <div className="flex basis-[57%]">
            <button
              onClick={addItemsToCart}
              className="ml-auto inline-block rounded bg-green-500 px-2 py-0.5 font-semibold text-white transition-all duration-100 ease-linear active:scale-95"
            >{`Move ${
              itemsCount !== 0
                ? itemsCount > 1
                  ? `${itemsCount} items`
                  : `${itemsCount} item`
                : ''
            } to cart`}</button>
          </div>
        </div>
      </div>
      {data?.item.map((item) => (
        <ItemCard key={item.id} item={item} restro_id={restro_id} />
      ))}
    </section>
  );
};

export default RestaurantCard;
