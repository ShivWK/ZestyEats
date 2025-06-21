const OfferCard = ({ data }) => {

    return (
        <div className="flex gap-3 items-center shrink-0 bag-white p-3 rounded-3xl w-80 border-2 border-gray-200 cursor-pointer ">
            <img className="w-12 h-12" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${data?.offerLogo}`} alt={data?.header} />
            <div>
                <h2 className="text-[17px] tracking-tight font-bold">{data?.header}</h2>
                <p className="text-sm font-bold text-gray-500">{data?.couponCode}</p>
            </div>
        </div>
    )
}

export default OfferCard;
