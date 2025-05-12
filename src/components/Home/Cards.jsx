import { NavLink } from "react-router-dom";

const Cards = ({ data, imageWidth = 275, imageHeight = 44, from }) => {
    const imageId = data?.cloudinaryImageId?.trim();
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`;

  return (
    <NavLink style={{width: from === "online" ? 240 : 275}} className={`flex flex-col items-center rounded-2xl overflow-hidden shrink-0 hover:scale-95 transition-all duration-200 ease-in-out`}>
      <div
        className={`w-full h-40 bg-no-repeat bg-cover bg-center rounded-2xl flex items-end p-2`}
        style={{
          height: from === "online" ? 160 : 176,
          backgroundImage: `linear-gradient(0deg,rgba(23, 23, 23, 1) 0%, rgba(247, 247, 247, 0) 48%), url(${imageUrl})`,
        }}
      >
        <p className="font-bold text-white text-xl">
          {(data.aggregatedDiscountInfoV3?.header || "") + " " + (data.aggregatedDiscountInfoV3?.subHeader || "")}
        </p>
      </div>
      <div className="mt-2 w-[95%]">
        <p className="font-bold text-[17px]">{data?.name || ""}</p>
        <div className="flex gap-1 items-center -mt-0.5">
          <i className="ri-user-star-fill text-green-600 text-xl"></i>
          <p className="font-semibold">{data?.avgRatingString || ""}</p>
          <p className="">•</p>
          <p className="font-bold">{data?.sla?.slaString || ""}</p>
        </div>
        <p className="mt-0.5 truncate font-semibold text-gray-700">{data?.cuisines.join(", ") || "" }</p>
        <p className="font-semibold text-gray-700">{data.areaName || ""}</p>
      </div>
    </NavLink>
  );
};

// 275px 240px

export default Cards;
