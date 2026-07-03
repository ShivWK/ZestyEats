import { useEffect, useRef, useState } from 'react';
import {
  selectItemsToBeAddedInCart,
  toggleItemsToBeAddedInCart,
  deleteItemFromWishlist,
  selectCart,
} from '../../../features/home/restaurantsSlice';

import { useSelector, useDispatch } from 'react-redux';
import VegSvg from './VegSvg';
import NonVegSvg from './NonVegSvg';
import OfferSvg from './WishListSvg';
import WishListSvg from './WishListSvg';

const ItemCard = ({ item, restro_id }) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [paraHeight, setParaHeight] = useState(0);
  const paraRef = useRef(null);

  const [isError, setIsError] = useState(false);
  const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDescriptionOpen && paraRef.current) {
      setParaHeight(paraRef.current.scrollHeight + 11);
    }
  }, [isDescriptionOpen]);

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

  const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
  const finalPrice = item?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="flex items-center gap-1 text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-200">
      <span className="text-gray-500 line-through dark:text-gray-400">
        ₹{defaultPrice}
      </span>
      ₹{finalPrice} <OfferSvg />
    </p>
  ) : (
    <p className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-200">
      ₹{defaultPrice}
    </p>
  );

  const isPresentInCart = item.id in cart;

  const checkHandler = (e) => {
    if (e.target.checked) {
      dispatch(
        toggleItemsToBeAddedInCart({
          add: true,
          id: item.id,
          restro_id,
          mode: 'dynamic',
        }),
      );
    } else {
      dispatch(
        toggleItemsToBeAddedInCart({
          add: false,
          id: item.id,
          restro_id,
          mode: 'dynamic',
        }),
      );
    }
  };

  const checked = itemsToAddInCart[restro_id]?.includes(item.id);

  const deleteHandler = () => {
    dispatch(deleteItemFromWishlist(item.id));
    dispatch(
      toggleItemsToBeAddedInCart({
        add: false,
        id: item.id,
        restro_id,
        mode: 'dynamic',
      }),
    );
  };

  return (
    <div className="border-t-[1px] border-gray-300 p-0.5 pl-1 dark:bg-black">
      <div className="flex items-center justify-between">
        {!isPresentInCart ? (
          <input
            className="mt-1 mb-1 ml-1 h-4 w-4"
            type="checkbox"
            checked={checked}
            onChange={checkHandler}
          />
        ) : (
          <div className="my-0.5 cursor-pointer rounded border-[1px] border-gray-300 bg-gray-100 px-1 py-0.5 text-xs md:rounded-md md:text-sm">
            <p className="text-gray-600">
              Present in Cart{' '}
              <i className="fa-solid fa-cart-shopping text-blue-500"></i>
            </p>
          </div>
        )}
        <div
          className="mt-0.5 mr-0.5 flex cursor-pointer items-center justify-center rounded-[9999px] p-0.5"
          onClick={deleteHandler}
          style={{ backgroundColor: 'red' }}
        >
          <WishListSvg />
        </div>
      </div>

      <div className="flex justify-between bg-white dark:bg-black">
        <div className="flex flex-col gap-2 p-1">
          {item.isVeg === 1 ? <VegSvg /> : <NonVegSvg />}
          <div className="w-[100%]">
            <p className="line-clamp-2 leading-5 font-bold tracking-tight dark:text-white">
              {item?.name}
            </p>
          </div>
          <div>{price}</div>
          {item?.description && (
            <div
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              id="moreCities"
              className="linear mt-1 flex w-fit cursor-pointer items-center gap-2.5 rounded-2xl border-[1px] border-gray-500 px-2 py-0.5 transition-all duration-300 hover:bg-gray-100 dark:border-gray-300"
            >
              <p className="text-sm font-normal text-gray-900 select-none dark:text-gray-300">
                More Details
              </p>
              <i
                className="fa-solid fa-caret-down linear text-gray-900 transition-all duration-300 dark:text-gray-300"
                style={{
                  transform: isDescriptionOpen ? 'rotate(-180deg)' : '',
                }}
              ></i>
            </div>
          )}
        </div>
        <div className="relative m-2 h-36 w-36 shrink-0 overflow-hidden rounded-xl">
          <img
            src={isError ? '/images/fallback.png' : imageUrl}
            className="absolute top-0 left-0 h-full w-full object-cover object-center"
            alt={item?.name}
            onError={() => setIsError(true)}
          />
        </div>
      </div>

      <div
        className="overflow-hidden px-2 pb-0.5 font-medium text-gray-600 transition-all duration-100 ease-linear dark:text-gray-200"
        style={{
          height: isDescriptionOpen ? `${paraHeight}px` : '0px',
        }}
      >
        <hr className="my-1 text-gray-300" />
        <p ref={paraRef} className="max-md:text-sm">
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
