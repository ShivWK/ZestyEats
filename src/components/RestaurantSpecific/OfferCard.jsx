const OfferCard = ({ data }) => {
  return (
    <div className="bag-white flex w-72 shrink-0 cursor-pointer items-center gap-3 rounded-3xl border-2 border-gray-200 p-3 md:w-80">
      <img
        className="h-12 w-12"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${data?.offerLogo}`}
        alt={data?.header}
      />
      <div>
        <h2 className="text-[17px] font-bold tracking-tight dark:text-white">
          {data?.header}
        </h2>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
          {data?.couponCode}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
