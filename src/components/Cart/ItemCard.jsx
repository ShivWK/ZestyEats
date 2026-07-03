import { useEffect, useRef, useState } from 'react';
import {
  setItemQuantity,
  selectWishlistItems,
  addToWishlistItem,
} from '../../features/home/restaurantsSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddToCartBtn from './../AddToCartBtn';

const ItemCard = ({ data, restaurantData }) => {
  const [paraHeight, setParaHeight] = useState(0);
  const paraRef = useRef(null);

  const dispatch = useDispatch();
  const { item, quantity } = data;
  const Wishlist = useSelector(selectWishlistItems);
  const isPresentInWishlist = item.id in Wishlist;

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

  const deleteHandler = () => {
    dispatch(setItemQuantity({ id: item.id, type: 'delete' }));
  };

  useEffect(() => {
    if (isDescriptionOpen && paraRef.current) {
      setParaHeight(paraRef.current.scrollHeight + 10);
    }
  }, [isDescriptionOpen]);

  const defaultPrice =
    (quantity * item?.price) / 100 ||
    (quantity * item?.defaultPrice) / 100 ||
    0;
  const finalPrice = (quantity * item?.finalPrice) / 100;
  const price = finalPrice ? (
    <p className="flex items-center gap-1 text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-200">
      <span className="text-gray-500 line-through dark:text-gray-400">
        ₹{''}
        {defaultPrice}{' '}
      </span>
      ₹{''}
      {finalPrice}{' '}
      <svg
        className="inline"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z"
          fill="#05df72"
        ></path>
      </svg>
    </p>
  ) : (
    <p className="text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-200">
      ₹{''}
      {defaultPrice}
    </p>
  );

  const moveToWishlistHandler = () => {
    dispatch(addToWishlistItem({ restaurantData, item, quantity: 1 }));
    deleteHandler();
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border-[1px] border-gray-300 bg-white p-1 pt-2 dark:bg-black">
      <div className="flex items-center justify-between">
        <i
          onClick={deleteHandler}
          className="fa-solid fa-trash-can ml-auto cursor-pointer text-red-400"
        ></i>
      </div>
      <div className="flex justify-between pl-1">
        <div className="flex flex-col gap-1.5">
          {item.isVeg === 1 ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="5"
                width="90"
                height="90"
                fill="none"
                stroke="#05df72"
                strokeWidth="8"
              />
              <circle cx="50" cy="50" r="25" fill="#05df72" />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="5"
                width="90"
                height="90"
                fill="none"
                stroke="red"
                strokeWidth="8"
              />
              <polygon points="50,20 78.86,70 21.14,70" fill="red" />
            </svg>
          )}
          <div className="w-[100%]">
            <p className="mt-1 line-clamp-2 leading-5 font-bold tracking-tight dark:text-white">
              {item?.name}
            </p>
          </div>
          <div>{price}</div>
          <button
            disabled={isPresentInWishlist}
            onClick={moveToWishlistHandler}
            className="w-fit cursor-pointer rounded border-[1px] border-gray-300 bg-gray-100 px-1 text-xs md:rounded-md md:text-xs"
          >
            {isPresentInWishlist ? (
              <p className="text-gray-500">
                Present in Wishlist{' '}
                <i className="ri-heart-2-fill text-red-500"></i>
              </p>
            ) : (
              <p>
                Move to Wishlist{' '}
                <i className="ri-heart-2-fill text-red-500"></i>
              </p>
            )}
          </button>
          {item?.description && (
            <div
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              id="moreCities"
              className="group linear mt-1 flex w-fit cursor-pointer items-center gap-2.5 rounded-2xl border-[1px] border-gray-500 px-1.5 py-0.5 transition-all duration-300 hover:bg-gray-100 dark:border-gray-300"
            >
              <p className="text-xs font-normal text-gray-900 select-none lg:text-sm dark:text-gray-300 dark:group-hover:text-gray-800">
                More Details
              </p>
              <i
                className="fa-solid fa-caret-down linear text-gray-900 transition-all duration-300 dark:text-gray-300 dark:group-hover:text-gray-800"
                style={{
                  transform: isDescriptionOpen ? 'rotate(-180deg)' : '',
                }}
              ></i>
            </div>
          )}
        </div>
        <div className="relative m-2 h-32 w-32 shrink-0 overflow-hidden rounded-xl">
          <img
            src={isError ? '/images/fallback.png' : imageUrl}
            className="absolute top-0 left-0 h-full w-full object-cover object-center"
            alt={item?.name}
            onError={() => setIsError(true)}
          />
          <div className="absolute top-[75%] left-1/2 -translate-x-1/2 transform">
            <AddToCartBtn
              data={{ restaurantData, item, quantity }}
              quantityBtnPadding="p-1"
              number_width="w-8"
            />
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden px-2 pb-0.5 font-medium text-gray-600 transition-all duration-100 ease-linear dark:text-gray-200"
        style={{ height: isDescriptionOpen ? `${paraHeight}px` : '0px' }}
      >
        <hr className="my-1 mt-0.5 text-gray-300" />
        <p ref={paraRef} className="text-sm break-words">
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
