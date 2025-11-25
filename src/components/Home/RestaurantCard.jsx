// Done

import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCurrentRestaurant,
  setMenuItems,
  setRestaurantItems,
} from "../../features/home/restaurantsSlice";
import { useState } from "react";
import PureVeg from "../../utils/PureVegSvg";
import VegAndNonVeg from "../../utils/VegAndNonVegSvg";
import textToZestyEats from "../../utils/textToZestyEats";
import calDistance from "../../utils/haversineFormula";
import NotAvailableCardOverlay from "./NotAvailableCardOverlay";
import usePageLocation from "../../hooks/usePageLocation";
import RestaurantImageCard from "./RestaurantImageCard";

const RestaurantCard = ({ data, from }) => {
  // console.log("Restaurant Card of Home rendered");
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const { lat, lng, mode } = usePageLocation(pathname);
  let { lat: lat1, lng: lng1 } = data;

  const dataToMap = pathname.includes("ordersAndWishlist")
    ? data.data
    : data;
  const [disable, setDisable] = useState(false);
  const userDistanceFromRestaurant = calDistance(lat1, lat, lng1, lng);

  const handleClick = (e) => {
    if (pathname.includes("ordersAndWishlist")) {
      if (userDistanceFromRestaurant > 20) e.preventDefault();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    dispatch(addCurrentRestaurant(dataToMap?.name));
    dispatch(setMenuItems({ mode: "empty" }));
    dispatch(setRestaurantItems([]));
  };

  let address = dataToMap?.locality === dataToMap?.areaName
    ? dataToMap?.locality
    : dataToMap?.locality + ", " + dataToMap?.areaName;

  return (
    <Link
      to={`/restaurantSpecific/${lat}/${lng}/${dataToMap?.id}/${dataToMap?.name}?mode=${mode}`}
      onClick={handleClick}
      className={`relative flex flex-row md:flex-col max-md:gap-4 items-center max-md:w-full rounded-2xl  shrink-0 hover:scale-95 transition-all duration-100 ease-in-out ${from === "online"
        ? "md:w-[240px]"
        : from === "specificFood"
          ? "md:w-[360px]"
          : "md:w-[275px]"
        }`}
    >
      <NotAvailableCardOverlay
        disable={disable}
        lat={lat}
        lng={lng}
        dataToMap={dataToMap}
      />

      <RestaurantImageCard
        disable={disable}
        dataToMap={dataToMap}
        from={from}
        userDistanceFromRestaurant={userDistanceFromRestaurant}
        setDisable={setDisable}
      />

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
          <PureVeg />
        ) : (
          <VegAndNonVeg />
        )}
        <p
          className={`mt-0.5 max-h-14 text-sm line-clamp-2 dark:text-gray-400 text-gray-700 break-words whitespace-normal font-semibold max-md:w-[85%] leading-0.5" ${from === "online" ? "max-md:w-[85%]" : "max-md:w-[75%]"
            }`}
        >
          {dataToMap?.cuisines?.join(", ") || ""}{"."}
        </p>
        <p className="font-medium md:truncate text-sm text-black mt-0.5 max-md:line-clamp-2 max-md:max-w-[80%] break-words capitalize dark:text-gray-300">
          {address}{"."}
        </p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
