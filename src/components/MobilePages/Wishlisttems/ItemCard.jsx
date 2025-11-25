import { useEffect, useRef, useState } from "react";
import {
  selectItemsToBeAddedInCart,
  toggleItemsToBeAddedInCart,
  deleteItemFromWishlist,
  selectCart
} from "../../../features/home/restaurantsSlice";

import { useSelector, useDispatch } from "react-redux";
import VegSvg from "./VegSvg";
import NonVegSvg from "./NonVegSvg";
import OfferSvg from "./WishListSvg";
import WishListSvg from "./WishListSvg";

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
  }, [isDescriptionOpen])

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

  const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
  const finalPrice = item?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="text-sm tracking-tight flex gap-1 items-center font-semibold dark:text-gray-200 text-gray-800">
      <span className="line-through text-gray-500 dark:text-gray-400">₹{defaultPrice}</span>₹
      {finalPrice} {" "}
      <OfferSvg />
    </p>
  ) : (
    <p className="text-sm tracking-tight font-semibold dark:text-gray-200 text-gray-800">₹{defaultPrice}</p>
  );

  const isPresentInCart = item.id in cart;

  const checkHandler = (e) => {
    if (e.target.checked) {
      dispatch(toggleItemsToBeAddedInCart({
        add: true,
        id: item.id,
        restro_id,
        mode: "dynamic",
      }));
    } else {
      dispatch(toggleItemsToBeAddedInCart({
        add: false,
        id: item.id,
        restro_id,
        mode: "dynamic",
      }));
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
    <div className="border-t-[1px] dark:bg-black border-gray-300 p-0.5 pl-1">

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
          <WishListSvg />
        </div>
      </div>

      <div className="flex justify-between dark:bg-black bg-white">
        <div className="flex flex-col gap-2 p-1">
          {item.isVeg === 1 ? (
            <VegSvg />
          ) : (
            <NonVegSvg />
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
              <p className="font-normal text-sm text-gray-900 dark:text-gray-300 select-none">More Details</p>
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
