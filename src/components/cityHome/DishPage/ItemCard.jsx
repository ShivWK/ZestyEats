import { useState } from "react";

const ItemCard = ({ data: item, restaurantData }) => {
    // console.log(item, restaurantData)
    // return <p>hi</p>
    const [isError, setIsError] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`

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

    return <div className="border-gray-300 shrink-0 border-2 max-w-80 md:max-w-96 p-0.5 px-1 rounded-2xl flex justify-between bg-white">
            <div className="flex flex-col gap-2 pl-0.5 justify-center basis-[55%] shrink-0">
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
                <div className="w-[95%] border-2">
                    <p className="leading-5 line-clamp-2 tracking-tight font-bold truncate">
                        {item?.name}
                    </p>
                </div>
                <div>{price}</div>
                {item?.description && (!isDescriptionOpen 
                ? (
                    <div
                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                    id="moreCities"
                    className="flex gap-2.5 cursor-pointer border-[1px] border-gray-500 px-1.5 w-fit rounded-2xl items-center transition-all duration-300 linear hover:bg-gray-100 mt-0.5"
                >
                    <p className="font-medium text-sm text-gray-900 select-none">
                        More
                    </p>
                    <i
                        className="fa-solid fa-caret-down text-gray-900 transition-all duration-300 linear"
                        style={{
                            transform: isDescriptionOpen ? "rotate(-180deg)" : "",
                        }}
                    ></i>
                </div>) 
                : <div className="pb-0.5 text-gray-600 font-medium line-clamp-2 w-[55%] border-2">
                    <p className="truncate">{item?.description}</p>
                </div>)}
            </div>
            <div className="relative h-32 w-32 md:h-36 md:w-36 rounded-xl overflow-hidden shrink-0 m-2 basis-[40%] border-2">
                <img
                    src={isError ? "/images/fallback.png" : imageUrl}
                    className="absolute top-0 left-0 h-full w-full object-center object-cover shrink-0"
                    alt={item?.name}
                    onError={() => setIsError(true)}
                />
                <button className="absolute py-0.5 px-5 rounded bg-green-400 text-white font-semibold tracking-tight mt-auto top-[75%] transform -translate-x-1/2 left-1/2 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out ">
                    Add
                </button>
            </div>
    </div>
}

export default ItemCard;