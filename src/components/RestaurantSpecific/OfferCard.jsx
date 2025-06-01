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

//logo Image URL: https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}

// {
//     "header": "20% OFF UPTO ₹125",
//     "offerTagColor": "#E46D47",
//     "logoBottom": "MARKETING_BANNERS/IMAGES/OFFERS/2025/5/27/47401195-2e95-4f53-bb7c-367fa0316dc7_AMEXMenuLogo.png",
//     "offerIds": [
//         "074600c5-3563-4463-ab24-aa22c3ea5a8d"
//     ],
//     "expiryTime": "1970-01-01T00:00:00Z",
//     "couponCode": "USE AMEXCORP",
//     "description": "ABOVE ₹499",
//     "offerType": "offers",
//     "restId": "444780",
//     "offerLogo": "MARKETING_BANNERS/IMAGES/OFFERS/2025/5/27/47401195-2e95-4f53-bb7c-367fa0316dc7_AMEXMenuLogo.png",
//     "descriptionTextColor": "#7302060C",
//     "primaryDescription": "USE AMEXCORP",
//     "id": "USE AMEXCORP"
// }