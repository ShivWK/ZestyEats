const TopPicksCard = ({ data }) => {
  const imageId = encodeURIComponent(data?.imageId.trim());
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}}`;
  const price = data?.price ? (data?.price/100).toFixed(2) : "0.00";

  return (
    <div
      className={`flex flex-col shrink-0 justify-between w-72 h-72 rounded-2xl my-2 bg-cover bg-center p-4 mb-8`}
      style={{
        backgroundImage: `url('/images/fallback.png')`,
      }}
    >
      {imageId && (
        <div id="decription">
          <p className="text-black font-bold text-lg">{data?.name}</p>
          <p className="">
            {data?.description ? data?.description.match(/\w+.*?\./)?.[0] : ""}
          </p>
        </div>
      )}
      <div id="button" className="flex items-center justify-between mt-auto">
        <p className=" font-semibold text-black">₹{price}</p>
        <button className="py-2 px-7 bg-green-500 text-white rounded-md cursor-pointer active:scale-95 transition-all duration-150 ease-in-out">
          Add
        </button>
      </div>
    </div>
  );
};

export default TopPicksCard;

//  https://media-assets.swiggy.com/swiggy/image/uploa…l_lossy,f_auto,q_auto,w_292,h_300/TopPicks/KoSCB1
//  https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks/KoSCB1
//  https://media-assets.swiggy.com/swiggy/image/uploa…lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i