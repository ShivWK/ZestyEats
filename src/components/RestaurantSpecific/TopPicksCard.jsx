import { useState, memo } from "react";

const TopPicksCard = memo(({ data }) => {
  const [isError, setIsError] = useState(false);
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${data?.creativeId}`;
  const price = data?.price
    ? data?.price / 100
    : data?.defaultPrice
    ? data?.defaultPrice / 100
    : data?.finalPrice
    ? data?.finalPrice / 100
    : "0.00";

  return (
    <div
      className={`relative flex flex-col shrink-0 justify-between w-72 h-72 my-2 p-4 mb-8`}
    >
      <img
        src={isError ? "/images/fallback.png" : imageUrl}
        alt={data?.name}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl -z-10"
        onError={() => setIsError(true)}
      />

      {isError && (
        <div id="decription">
          <p className="text-black font-bold text-lg">{data?.name}</p>
          <p className="">
            {data?.description ? data?.description.match(/\w+.*?\./)?.[0] : ""}
          </p>
        </div>
      )}
      <div
        id="button"
        className="flex items-center justify-between mt-auto pl-0.5"
      >
        <p
          className="text-lg font-semibold"
          style={{
            color: !isError ? "white" : "black",
          }}
        >
          ₹{price}
        </p>
        <button className="py-2 px-7 bg-green-500 text-white rounded-md cursor-pointer active:scale-95 transition-all duration-150 ease-in-out font-semibold">
          Add
        </button>
      </div>
    </div>
  );
});

export default TopPicksCard;
