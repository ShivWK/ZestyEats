import { NavLink } from "react-router-dom";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  addCurrentRestaurant,
  setMenuItems,
} from "../../features/home/restaurantsSlice";
import { memo, useState } from "react";

const Cards = memo(({ data, from }) => {
  const { lat, lng } = useSelector(selectLatAndLng);
  const dispatch = useDispatch();
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const imageId = encodeURIComponent(data?.cloudinaryImageId?.trim());
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`;

  // To get image from public folder give the path of the image after "/" , here "/" means public folder
  // const imageUrl = `/images/image.png`;

  const handleClick = () => {
    dispatch(addCurrentRestaurant(data?.name));
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
      style={{
        width: from === "online" ? 240 : from === "specificFood" ? 360 : 275,
      }}
      className={`flex flex-row md:flex-col items-center rounded-2xl overflow-hidden shrink-0 hover:scale-95 transition-all duration-100 ease-in-out `}
    >
      {/* border-[1px] border-gray-400 */}
      <div
        className={`relative w-full h-40 bg-no-repeat bg-cover bg-center rounded-2xl flex items-end p-2`}
        style={{
          height: from === "online" ? 160 : from === "specificFood" ? 240 : 176,
          backgroundImage: `linear-gradient(0deg,rgba(23, 23, 23, 1) 0%, rgba(247, 247, 247, 0) 48%), url(${imageUrl}), url("/images/fallback.png")`,
        }}
      >
        <p className="font-bold text-white text-xl">
          {(data.aggregatedDiscountInfoV3?.header || "") +
            " " +
            (data.aggregatedDiscountInfoV3?.subHeader || "")}
        </p>
        <i
          className="absolute top-2.5 right-2.5 ri-poker-hearts-fill text-[180%] text-gray-600"
          style={{ color: wishlistAdded ? "red" : "rgba(0,0,0,0.6)" }} 
          onClick={wishlistClickHandler}
        ></i>
      </div>
      <div className="mt-2 w-[95%]">
        <p className="font-bold text-[17px]">{data?.name || ""}</p>
        <div className="flex gap-1 items-center -mt-0.5">
          <i className="ri-user-star-fill text-green-600 text-xl"></i>
          <p className="font-semibold">{data?.avgRatingString || ""}</p>
          <p className="">•</p>
          <p className="font-bold">{data?.sla?.slaString || ""}</p>
        </div>
        <p className="mt-0.5 truncate font-semibold text-gray-700">
          {data?.cuisines.join(", ") || ""}
        </p>
        <p className="font-semibold text-gray-700">{data.areaName || ""}</p>
      </div>
    </NavLink>
  );
});

export default Cards;
