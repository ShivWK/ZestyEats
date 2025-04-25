import React from "react";
import { NavLink } from "react-router-dom";
import fallbackImage from "../../assets/images/fallback.png";

const Cards = ({ data }) => {
    const imageId = data?.cloudinaryImageId?.trim();
    const imageEncoded = imageId ? encodeURIComponent(imageId) : null;
    const imageUrl = imageEncoded 
    ? `https://media-assets.swiggy.com/swiggy/image/upload/${imageEncoded}`
    : fallbackImage; // Use fallback image if imageId is not available

  return (
    <NavLink className="w-[275px] pb-1.5 rounded-2xl overflow-hidden h-72 shrink-0 hover:scale-95 transition-all duration-300 ease-in-out">
      <div
        className="w-full h-44 bg-no-repeat bg-cover bg-center rounded-2xl"
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(23, 23, 23, 1) 0%, rgba(247, 247, 247, 0) 48%), url(${imageUrl})`,
        }}
      >
        <p className="relative top-[140px] left-3 font-bold text-white text-xl">
          {data.aggregatedDiscountInfoV3?.header+" "+data.aggregatedDiscountInfoV3?.subHeader}
        </p>
      </div>
      <p></p>
      <i className="ri-user-star-fill text-green-600 text-xl"></i>
    </NavLink>
  );
};

export default Cards;
