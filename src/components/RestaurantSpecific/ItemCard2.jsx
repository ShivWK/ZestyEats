import { useState, useRef, memo, useEffect } from "react";

const ItemCard2 = memo(({ item }) => {
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [overFlow, setOverFlow] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const ele = containerRef.current;
    if (ele) {
      setOverFlow(ele.scrollHeight > ele.clientHeight);
    }
  });

  const veg = item?.itemAttribute?.vegClassifier === "VEG";
  const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
  const finalPrice = item?.finalPrice / 100;
  const price = finalPrice ? (
    <p className="text-sm tracking-tight font-bold">
      <span className="line-through text-gray-500">₹{defaultPrice} </span>₹
      {finalPrice}
    </p>
  ) : (
    <p className="text-sm tracking-tight font-bold">₹{defaultPrice}</p>
  );
  const ratingObject = item?.ratings?.aggregatedRating;
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item?.imageId}`;

  return (
    <div className="flex justify-between bg-white p-4 w-full">
      <div className="flex flex-col itrms-start gap-1.5 p-2 max-w-[525px]">
        {veg ? (
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
        <p className="text-gray-800 font-bold text-lg">{item?.name}</p>
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
        <div
          ref={containerRef}
          className="relative overflow-clip"
          style={{
            maxHeight: isOpen ? "200px" : "42px",
          }}
        >
          <p className="text-black text-sm text-wrap">{item?.description}</p>
        </div>
        {overFlow && (
          <span
            className="inline-flex w-fit gap-2 items-center font-bold text-gray-600 cursor-pointer -mt-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            ...more
            <i className="inline ri-arrow-down-s-fill text-[#ff5200] text-2xl font-[200] -ml-2.5"></i>
          </span>
        )}
      </div>
      <div className="relative h-48 w-48 rounded-xl overflow-hidden shrink-0">
        <img
          src={isError ? "/images/fallback.png" : imageUrl}
          className="absolute top-0 left-0 h-full w-full object-center object-cover"
          alt={item?.name}
          onError={() => setIsError(true)}
        />
        <button className="absolute py-1 px-8 rounded bg-green-400 text-white font-semibold tracking-tight mt-auto top-[80%] transform -translate-x-1/2 left-1/2 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out">
          Add
        </button>
      </div>
    </div>
  );
});

export default ItemCard2;
