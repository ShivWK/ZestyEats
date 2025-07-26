import { useEffect, useRef, useState } from "react";
import {
  selectItemsToBeAddedInCart,
  toggleItemsToBeAddedInCart,
  deleteItemFromWishlist,
  setItemToCart,
  selectWishlistItems,
  selectCart
} from "../../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";

const ItemCard = ({ item, restro_id }) => {

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [paraHeight, setParaHeight] = useState(0);
  const paraRef = useRef(null);

  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);
  const wishlist = useSelector(selectWishlistItems);
  const cart = useSelector(selectCart);

  useEffect(() => {
    if (isDescriptionOpen && paraRef.current) {
      setParaHeight(paraRef.current.scrollHeight + 11);
    }
  }, [isDescriptionOpen])

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

  const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
  const finalPrice = item?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="text-sm tracking-tight flex gap-1 items-center font-semibold dark:text-gray-200 text-gray-800">
      <span className="line-through text-gray-500 dark:text-gray-400">₹{defaultPrice} </span>₹
      {finalPrice} {" "}
      <svg className="inline" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z" fill="#05df72"></path></svg>
    </p>
  ) : (
    <p className="text-sm tracking-tight font-semibold dark:text-gray-200 text-gray-800">₹{defaultPrice}</p>
  );

  const isPresentInCart = item.id in cart;

  const checkHandler = (e) => {
    if (e.target.checked) {
      dispatch(
        toggleItemsToBeAddedInCart({
          add: true,
          id: item.id,
          restro_id,
          mode: "dynamic",
        })
      );
    } else {
      dispatch(
        toggleItemsToBeAddedInCart({
          add: false,
          id: item.id,
          restro_id,
          mode: "dynamic",
        })
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
        mode: "dynamic",
      })
    );
  };

  return (
    <div className="border-t-[1px] dark:bg-black border-gray-300 p-0.5">
      <div className="flex justify-between items-center">
        {!isPresentInCart ? <input
          className="h-4 w-4 ml-1 mt-1 mb-1"
          type="checkbox"
          checked={checked}
          onChange={checkHandler}
        /> : (
          <div className="text-xs md:text-sm px-1 py-0.5 border-[1px] border-gray-300 rounded md:rounded-md bg-gray-100 cursor-pointer my-0.5">
                <p className="text-gray-600">Present in Cart <i className="fa-solid fa-cart-shopping text-blue-500"></i></p>
            </div>
        )}
        <div className="cursor-pointer flex items-center justify-center rounded-[9999px] p-0.5 mr-0.5 mt-0.5" onClick={deleteHandler} style={{ backgroundColor: "red" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-5 h-5 wishlist-icon"
          >
            <path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736ZM5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701C17.3397 4.67979 14.9458 4.60806 13.3743 5.98376L9.17157 10.1869L7.75736 8.77264L10.582 5.946L10.5002 5.87701C8.92545 4.61197 6.62322 4.71993 5.17157 6.17157Z"></path>
          </svg>
        </div>
      </div>
      <div className="flex justify-between dark:bg-black bg-white">
        <div className="flex flex-col gap-2 p-1">
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
            <p className="leading-5 line-clamp-2 tracking-tight font-bold dark:text-white">
              {item?.name}
            </p>
          </div>
          <div>{price}</div>
          {item?.description && (
            <div
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              id="moreCities"
              className="flex gap-2.5 cursor-pointer border-[1px] dark:border-gray-300 border-gray-500 px-2 py-0.5 w-fit rounded-2xl items-center transition-all duration-300 linear hover:bg-gray-100 mt-1"
            >
              <p className="font-normal text-sm text-gray-900 dark:text-gray-300 select-none">
                More Details
              </p>
              <i
                className="fa-solid fa-caret-down dark:text-gray-300 text-gray-900 transition-all duration-300 linear"
                style={{
                  transform: isDescriptionOpen ? "rotate(-180deg)" : "",
                }}
              ></i>
            </div>
          )}
        </div>
        <div className="relative h-36 w-36 rounded-xl overflow-hidden shrink-0 m-2">
          <img
            src={isError ? "/images/fallback.png" : imageUrl}
            className="absolute top-0 left-0 h-full w-full object-center object-cover"
            alt={item?.name}
            onError={() => setIsError(true)}
          />
        </div>
      </div>
      
        <div className="px-2 pb-0.5 dark:text-gray-200 text-gray-600 font-medium overflow-hidden transition-all duration-100 ease-linear" style={{
          height: isDescriptionOpen ? `${paraHeight}px` : "0px"
        }}>
          <hr className="text-gray-300 my-1" />
          <p ref={paraRef} className="max-md:text-sm">{item?.description}</p>
        </div>

    </div>
  );
};

export default ItemCard;
