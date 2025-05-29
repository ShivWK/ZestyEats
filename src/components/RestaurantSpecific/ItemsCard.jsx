import { memo } from "react";

const ItemsCard = memo(({ item }) => {
  const Veg = item?.itemAttribute?.vegClassifier === "VEG";
  const defaultPrice = item?.defaultPrice / 100;
  const finalPrice = item?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="text-sm tracking-tight font-bold">
      <span className="line-through text-gray-500">₹{defaultPrice} </span>₹
      {finalPrice}
    </p>
  ) : (
    <p className="text-sm tracking-tight font-bold">₹{defaultPrice || finalPrice}</p>
  );

  const ratingObject = item?.ratings?.aggregatedRating;

  return (
    <div className="flex justify-between items-center bg-white p-4 w-full">
      <div className="flex flex-col itrms-start gap-1.5">
        {Veg ? (
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
              stroke="green"
              stroke-width="8"
            />
            <circle cx="50" cy="50" r="30" fill="green" />
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
              stroke-width="8"
            />
            <polygon points="50,20 78.86,70 21.14,70" fill="red" />
          </svg>
        )}
        <p className="text-gray-700 font-bold text-lg">{item?.name}</p>
        <div>{price}</div>
        {ratingObject.rating && (
          <div className="flex items-center gap-1">
            <i className="ri-star-fill text-green-700"></i>{" "}
            <p className="flex items-center gap-0.5 text-sm text-green-700 font-bold mt-0.5">
              {ratingObject?.rating}
              {ratingObject?.ratingCountV2 && (
                <span className="text-gray-500 font-semibold">
                  ({ratingObject?.ratingCountV2})
                </span>
              )}
            </p>
          </div>
        )}
      </div>
      <div className="">ggg</div>
    </div>
  );
});

export default ItemsCard;

//  Image Url: https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}
