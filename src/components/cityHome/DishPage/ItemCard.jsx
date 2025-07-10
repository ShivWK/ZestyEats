import { useState } from "react";
import AddToCartBtn from "../../AddToCartBtn";

const ItemCard = ({ data: item, restaurantData }) => {
    // console.log(item)

    const [isError, setIsError] = useState(false);
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`

    const ratings = item.ratings.aggregatedRating;

    const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
    const finalPrice = item?.finalPrice / 100;
    const price = finalPrice ? (
        <p className="text-sm tracking-tight flex gap-1 items-center font-semibold text-gray-800">
            <span className="line-through text-gray-500">₹{""}{defaultPrice} </span>₹{""}
            {finalPrice} {" "}
            <svg className="inline" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z" fill="#1BA672"></path></svg>
        </p>
    ) : (
        <p className="text-sm tracking-tight font-semibold text-gray-800">₹{""}{defaultPrice}</p>
    );

    return (
        <div className="border-gray-300 shrink-0 border-[1px] w-80 md:max-w-96 p-0.5 px-1 rounded-2xl flex  bg-white mt-2">
            <div className="flex flex-col gap-1 pl-1 md:pl-0.5 py-0.5 pt-1.5 justify-center basis-3/5 shrink-0">
                {item.isVeg === 1 ? (
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
                <div className="w-full">
                    <p className="leading-5 tracking-tight font-bold line-clamp-2 hyphens-auto">
                        {item?.name}
                    </p>
                </div>
                <div className="flex gap-1 items-center">
                    <p>{price}</p>
                    {Object.keys(ratings).length !== 0 && (
                        <>
                            <p>•</p>
                            <i className="ri-star-fill text-yellow-400 mb-0.5 text-sm" />
                            <p className="text-sm font-medium">{ratings.rating}{`(${ratings.ratingCountV2})`}</p>
                        </>
                    )}
                </div>
                {item?.description && <div className="pb-0.5 text-gray-800 w-[98%]">
                    <p className="truncate line-clamp-3 text-sm whitespace-normal hyphens-auto break-all">{item?.description}</p>
                </div>
                }
            </div>
            <div className="relative flex flex-col basis-28 h-32 w-28 rounded-xl self-center overflow-hidden shrink-0 m-2">
                <img
                    src={isError ? "/images/fallback.png" : imageUrl}
                    className="h-full w-full object-cover shrink-0"
                    alt={item?.name}
                    onError={() => setIsError(true)}
                />
                {/* <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 py-0.5 px-5 rounded bg-green-400 text-white font-semibold tracking-tight cursor-pointer active:scale-95 transition-all duration-150 ease-in-out text-sm">
                    Add
                </button> */}

                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 py-0.5 px-5">
                    <AddToCartBtn data={{restaurantData, item, quantity: 1}} pX="px-5" pY="py-0.5" font_size="text-sm" quantityBtnPadding="p-1" number_width="w-8"/>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;