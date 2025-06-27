import { NavLink } from "react-router-dom";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addCurrentRestaurant,
  setMenuItems,
} from "../../features/home/restaurantsSlice";
import { memo, useState } from "react";
import PureVeg from "../../utils/PureVegSvg";
import VegAndNonVeg from "../../utils/VegAndNonVegSvg";
import textToZestyEats from "../../utils/textToZestyEats";

const Cards = memo(({ data, from }) => {
  const { lat, lng } = useSelector(selectLatAndLng);
  const dispatch = useDispatch();
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const imageId = encodeURIComponent(data?.cloudinaryImageId?.trim());
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`;

  // To get image from public folder give the path of the image after "/" , here "/" means public folder
  // const imageUrl = `/images/image.png`;

  const handleClick = () => {
    dispatch(addCurrentRestaurant("Restaurant"));
    dispatch(setMenuItems({ mode: "empty" }));
  };

  const wishlistClickHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlistAdded(!wishlistAdded);
  };

  return (
    <NavLink
      to={`/restaurantSpecific/${lat}/${lng}/${data?.id}/${data?.name}`}
      onClick={handleClick}
      className={`flex flex-row md:flex-col max-md:gap-3 items-center max-md:w-full rounded-2xl overflow-hidden shrink-0 hover:scale-95 transition-all duration-100 ease-in-out ${from === "online" ? "md:w-[240px]" : from === "specificFood" ? "md:w-[360px]" : "md:w-[275px]"}`}
    >
      <div
        className={`relative w-full max-md:basis-1/2 h-40 bg-no-repeat bg-cover bg-center rounded-2xl flex items-end p-2 shrink-0 max-md:max-h-full max-md:min-h-56 max-md:shadow-[0_0_10px_2px_rgba(0,0,0,0.7)] ${from === "online" ? "md:h-[160px]" : from === "specificFood" ? "md:h-[240px]" : "md:h-[180px]"}`}
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(23, 23, 23, 1) 0%, rgba(247, 247, 247, 0) 48%), url(${imageUrl}), url("/images/fallback.png")`,
        }}
      >
        <p className="font-bold text-white text-xl">
          {(textToZestyEats(data.aggregatedDiscountInfoV3?.header) || "") +
            " " +
            (textToZestyEats(data.aggregatedDiscountInfoV3?.subHeader) || "")}
        </p>
        <div
          className="absolute top-2.5 right-2.5 cursor-pointer flex items-center justify-center rounded-full p-0.5"
          onClick={wishlistClickHandler}
          style={{
            backgroundColor: wishlistAdded ? "red" : "rgba(0, 0, 0, 0.6)",
          }}
        >
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
      <div className="md:mt-2 w-[95%] max-md:basis-1/2 max-md:py-2">
        <p className="font-bold text-[17px] line-clamp-3">{textToZestyEats(data?.name) || ""}</p>
        <div className="flex gap-1 items-center -mt-0.5">
          <i className="ri-user-star-fill text-green-600 text-xl"></i>
          <p className="font-semibold">{data?.avgRatingString || ""}</p>
          <p className="">•</p>
          <p className="font-bold">{data?.sla?.slaString || ""}</p>
        </div>
        {data?.veg ? (
          <PureVeg classes="-ml-5" />
        ) : (
          <VegAndNonVeg classes={"inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium pl-1 pr-2 my-0.5 py-0.5 rounded-full border border-gray-300"} />
        )}
        <p className={`mt-0.5 max-h-14 line-clamp-2 font-semibold text-gray-700 break-words whitespace-normal "max-md:w-[90%] leading-0.5" ${from === "online" ? "max-md:w-[90%]" : "max-md:w-[90%]"}`}>
          {data?.cuisines.join(", ") || ""}
        </p>
        <p className="font-semibold text-gray-900 mt-0.5">{data.areaName || ""}</p>
      </div>
    </NavLink>
  );
});

export default Cards;
