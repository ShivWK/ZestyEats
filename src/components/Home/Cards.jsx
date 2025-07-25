import { Link, useLocation, useSearchParams } from "react-router-dom";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addCurrentRestaurant,
  setMenuItems,
  setRestaurantItems,
  selectFavoriteRestros,
  setFavoriteRestro,
} from "../../features/home/restaurantsSlice";

import { selectCityLatAndLng, selectLocalityLatAndLng } from "../../features/cityHome/cityHomeSlice";

import { memo, use, useEffect, useState } from "react";
import PureVeg from "../../utils/PureVegSvg";
import VegAndNonVeg from "../../utils/VegAndNonVegSvg";
import textToZestyEats from "../../utils/textToZestyEats";
import calDistance from "../../utils/haversineFormula";

const Cards = memo(({ data, from }) => {
  // console.log(data)
  const pathname = useLocation().pathname;
  let latAndLngSelector = selectLatAndLng;
  let mode = "homePage"

  if (pathname.includes("/cityPage") || pathname.includes("/cityRestaurant") || pathname.includes("/cityCuisines")) {
    latAndLngSelector = selectCityLatAndLng;
    mode = "cityPage"
  } else if (pathname.includes("cityLocality")) {
    latAndLngSelector = selectLocalityLatAndLng;
    mode = "cityPage"
  } 

  let lat1 = data.lat;
  let lng1 = data.lng;

  const dataToMap = pathname.includes("ordersAndWishlist") ? data.data : data;

  const favoriteRestro = useSelector(selectFavoriteRestros);
  const { lat, lng } = useSelector(latAndLngSelector);
  const dispatch = useDispatch();
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [disable, setDisable] = useState(false);

  const imageId = encodeURIComponent(dataToMap?.cloudinaryImageId?.trim());
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`;
  const userDistanceFromRestaurant = calDistance(lat1, lat, lng1, lng);

  useEffect(() => {
    const exist = favoriteRestro.find((obj) => obj.data?.id === dataToMap?.id);
    setWishlistAdded(exist);

    if (pathname.includes("ordersAndWishlist")) {
      if (userDistanceFromRestaurant > 20) {
        setDisable(true);
      }
    }
  }, []);

  const handleClick = (e) => {
    if (pathname.includes("ordersAndWishlist")) {

      if (userDistanceFromRestaurant > 20) {
        e.preventDefault();
      }
    }

    dispatch(addCurrentRestaurant(dataToMap?.name));
    dispatch(setMenuItems({ mode: "empty" }));
    dispatch(setRestaurantItems([]));
  };

  const wishlistClickHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setWishlistAdded(!wishlistAdded);
    dispatch(setFavoriteRestro({ lat, lng, data: dataToMap }));
  };

  const crossHandler = () => {
    dispatch(setFavoriteRestro({ lat, lng, data: dataToMap }));
  };

  let address = dataToMap?.locality + ", " + dataToMap?.areaName;

  if (dataToMap?.locality === dataToMap?.areaName) {
    address = dataToMap?.locality;
  }

  return (
    <Link
      to={`/restaurantSpecific/${lat}/${lng}/${dataToMap?.id}/${dataToMap?.name}?mode=${mode}`}
      onClick={handleClick}
      className={`relative flex flex-row md:flex-col max-md:gap-4 items-center max-md:w-full rounded-2xl  shrink-0 hover:scale-95 transition-all duration-100 ease-in-out ${
        from === "online"
          ? "md:w-[240px]"
          : from === "specificFood"
          ? "md:w-[360px]"
          : "md:w-[275px]"
      }`}
    >
      <div
        className={`absolute z-20 ${
          disable ? "flex" : "hidden"
        } items-center justify-center rounded-xl h-full w-full bg-[rgba(0,0,0,0.4)]`}
      >
        <div className="flex flex-col gap-1 items-center justify-center">
          <p className="text-white font-bold text-3xl">Not Available</p>
          <i
            onClick={crossHandler}
            className="ri-close-large-line text-white text-3xl rounded px-1 dark:bg-gray-500/50 bg-black/50"
          ></i>
        </div>
      </div>

      <div
        className={`relative w-full max-md:basis-[48%] h-40 bg-no-repeat bg-cover bg-center rounded-2xl flex items-end p-3 md:pl-4 shrink-0 max-md:max-h-full max-md:min-h-52 dark:shadow-[0_0_10px_2px_rgba(156,145,145,0.5)] ${!disable && "max-md:shadow-[0_0_10px_2px_rgba(0,0,0,0.5)]"} ${
          from === "online"
            ? "md:h-[160px]"
            : from === "specificFood"
            ? "md:h-[240px]"
            : "md:h-[180px]"
        }`}
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(23, 23, 23, 1) 0%, rgba(247, 247, 247, 0) 48%), url(${imageUrl}), url("/images/fallback.png")`,
        }}
      >
        <p className="font-bold dark:text-gray-200 text-white text-xl">
          {(textToZestyEats(dataToMap.aggregatedDiscountInfoV3?.header) || "") +
            " " +
            (textToZestyEats(dataToMap.aggregatedDiscountInfoV3?.subHeader) ||
              "")}
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
      <div className="md:mt-3 w-[95%] max-md:basis-1/2 max-md:py-2">
        <p className="font-bold w-[98%] text-[17px] line-clamp-3 break-words leading-5 dark:text-gray-300">
          {textToZestyEats(dataToMap?.name) || ""}
        </p>
        <div className="flex gap-1 items-center -mt-0.5 max-md:text-sm">
          <i className="ri-user-star-fill text-green-600 text-xl"></i>
          <p className="font-semibold dark:text-gray-300">{dataToMap?.avgRatingString || ""}</p>
          <p className="dark:text-gray-300">•</p>
          <p className="font-bold dark:text-gray-300">{dataToMap?.sla?.slaString || "25-30 mins"}</p>
        </div>
        {dataToMap?.veg ? (
          <PureVeg classes="-ml-5 lg:mt-1" />
        ) : (
          <VegAndNonVeg
            classes={
              "inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium pl-1 pr-2 my-0.5 py-0.5 rounded-full border border-gray-300 lg:mt-1"
            }
          />
        )}
        <p
          className={`mt-0.5 max-h-14 text-sm line-clamp-2 dark:text-gray-400 text-gray-700 break-words whitespace-normal font-semibold max-md:w-[85%] leading-0.5" ${
            from === "online" ? "max-md:w-[85%]" : "max-md:w-[75%]"
          }`}
        >
          {dataToMap?.cuisines?.join(", ") || ""}{"."}
        </p>
        <p className="font-medium md:truncate max-md:text-sm text-black mt-0.5 max-md:line-clamp-2 max-md:max-w-[80%] break-words capitalize dark:text-gray-300">
          {address}{"."}
        </p>
      </div>
    </Link>
  );
});

export default Cards;
