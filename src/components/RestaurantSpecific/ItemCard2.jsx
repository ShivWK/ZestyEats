import { useState, useRef, memo, useEffect } from "react";
import textToZestyEats from "../../utils/textToZestyEats";
import { useDispatch, useSelector } from "react-redux";
import AddToCartBtn from "../AddToCartBtn";
import { addToWishlistItem, selectWishlistItems, deleteItemFromWishlist } from "../../features/home/restaurantsSlice";

const ItemCard2 = memo(({ item, isParentOpen, restaurantData = null, opened }) => {
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [overFlow, setOverFlow] = useState(false);
  const [paraSize, setParaSize] = useState(0);
  const containerRef = useRef(null);
  const paraRef = useRef(null);
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlistItems);
  const isWishlisted = item?.id in wishlist || false;

  const [wishlistAdded, setWishlistAdded] = useState(isWishlisted);

  useEffect(() => {
    setTimeout(() => {
      const ele = containerRef.current;
      if (ele) {
        setOverFlow(ele.scrollHeight > ele.clientHeight);
      }

      if (paraRef.current) {
        const size = paraRef.current.scrollHeight;
        setParaSize(size);
      }
    }, 100)
  }, [isParentOpen, isOpen]);

  const wishlistAddHandler = (wishlistObject, id) => {
    if (id in wishlist) {
      setWishlistAdded(false);
      dispatch(deleteItemFromWishlist(id))
    } else {
      setWishlistAdded(true);
      dispatch(addToWishlistItem(wishlistObject));
    }
  }

  // when parent compo has display none that time the card's scrollHeight and clientHeight both are 0 they don't render so we need to check it when parent is opened

  const veg = item?.itemAttribute?.vegClassifier === "VEG";

  const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
  const finalPrice = item?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="text-sm tracking-tight flex gap-1 items-center font-semibold text-gray-800 dark:text-white">
      <span className="line-through text-gray-500 dark:text-gray-300">₹{""}{defaultPrice} </span>₹{""}
      {finalPrice} {" "}
      <svg className="inline" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z" fill="#1BA672"></path></svg>
    </p>
  ) : (
    <p className="text-sm tracking-tight font-semibold text-gray-800 dark:text-white">₹{""}{defaultPrice}</p>
  );

  const ratingObject = item?.ratings?.aggregatedRating;
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.imageId}`;

  return (
    <div className="flex flex-col md:flex-row justify-between dark:bg-gray-800 bg-white p-1 pt-2 md:pt-0 md:py-4 md:px-1 w-full border-b-[1px] border-gray-300 overflow-hidden">
 
      <div className="flex mt-3 flex-col order-2 md:order-1 items-start gap-1.5 p-2 max-w-[525px]  dark:bg-gray-00">
        {veg ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="dark:bg-green-400"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke="green"
              strokeWidth="8"
            />
            <circle cx="50" cy="50" r="25" fill="green" />
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
        <p className="text-gray-800 font-bold text-lg dark:text-white">{textToZestyEats(item?.name)}</p>
        <div>{price}</div>
        {ratingObject.rating && (
          <div className="flex items-center gap-1">
            <i className="ri-star-fill text-green-700 dark:text-green-400"></i>{" "}
            <p className="flex items-center gap-0.5 text-sm text-green-700 font-bold mt-0.5 dark:text-white">
              {ratingObject?.rating}
              {ratingObject?.ratingCountV2 && (
                <span className="text-gray-500 font-semibold dark:text-gray-300">
                  ({ratingObject?.ratingCountV2})
                </span>
              )}
            </p>
          </div>
        )}
        <div
          ref={containerRef}
          className="relative  transition-all duration-100 ease-linear overflow-hidden"
          style={{
            height: isOpen ? `${paraSize}px` ?? "200px" : "42px",
          }}
        >
          <p ref={paraRef} className="text-black dark:text-gray-200 text-sm text-wrap">{textToZestyEats(item?.description)}</p>
        </div>
        {(overFlow && !isOpen) && (
          <span
            className="inline-flex w-fit gap-2 items-center font-bold dark:text-primary text-gray-600 cursor-pointer -mt-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            ...more
            <i className={`inline ri-arrow-down-s-fill text-[#ff5200] text-2xl font-[200] transform transition-transform duration-100 ease-in -ml-2.5 mt-1`}></i>
          </span>
        )}
      </div>

      <div className="relative order-1 mt-4 md:order-2 h-40 w-full md:h-48 md:w-48 rounded-xl overflow-hidden shrink-0">
        <img
          src={isError ? "/images/fallback.png" : imageUrl}
          className="absolute top-0 left-0 h-full w-full object-center object-cover"
          alt={item?.name}
          onError={() => setIsError(true)}
        />
   
        <div className="absolute top-[75%] md:top-[80%] transform -translate-x-1/2 max-lg:-right-9 md:left-1/2">
          <AddToCartBtn data={{ restaurantData, item, quantity: 1 }} />
        </div>

        <div className="absolute top-2.5 right-2.5 cursor-pointer flex items-center justify-center rounded-[9999px] p-0.5" onClick={() => wishlistAddHandler({ restaurantData, item, quantity: 1 }, item?.id)} style={{ backgroundColor: wishlistAdded ? "red" : "rgba(0, 0, 0, 0.6)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6 wishlist-icon"
          >
            <path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736ZM5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701C17.3397 4.67979 14.9458 4.60806 13.3743 5.98376L9.17157 10.1869L7.75736 8.77264L10.582 5.946L10.5002 5.87701C8.92545 4.61197 6.62322 4.71993 5.17157 6.17157Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
});

export default ItemCard2;
