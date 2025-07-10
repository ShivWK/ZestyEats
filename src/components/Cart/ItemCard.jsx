import { useState } from "react";
import { setItemQuantity } from "../../features/home/restaurantsSlice";
import { useDispatch } from "react-redux";
import AddToCartBtn from "./../AddToCartBtn";

const ItemCard = ({ data, restaurantData }) => {
    const dispatch = useDispatch();
    const { item, quantity } = data;

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

    const deleteHandler = () => {
        dispatch(setItemQuantity({ id: item.id, type: "delete" }))
    }

    const defaultPrice = quantity * item?.price / 100 || quantity * item?.defaultPrice / 100 || 0;
    const finalPrice = quantity * item?.finalPrice / 100;
    const price = finalPrice ? (
        <p className="text-sm tracking-tight font-semibold text-gray-800">
            <span className="line-through text-gray-500">₹{" "}{defaultPrice} </span>₹
            {finalPrice}
        </p>
    ) : (
        <p className="text-sm tracking-tight font-semibold text-gray-800">₹{" "}{defaultPrice}</p>
    );

    // return <p>hii</p>

    return <div className="border-[1px] border-gray-300 p-1 pt-2 rounded-md flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <button className="text-xs md:text-sm px-1 md:py-0.5 border-[1px] border-gray-300 rounded md:rounded-md bg-gray-100 cursor-pointer">
                Move to <i className="ri-heart-2-fill text-red-500"></i>
            </button>
            <i onClick={deleteHandler} className="fa-solid fa-trash-can text-red-400 cursor-pointer"></i>
        </div>
        <div className="flex justify-between bg-white pl-1">
            <div className="flex flex-col gap-0.5">
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
                <div className="w-[100%]">
                    <p className="leading-5 line-clamp-2 tracking-tight max-md:text-sm font-bold mt-1">
                        {item?.name}
                    </p>
                </div>
                <div>{price}</div>
                {item?.description && (
                    <div
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        id="moreCities"
                        className="flex gap-2.5 cursor-pointer border-[1px] border-gray-500 px-1.5 py-0.5 w-fit rounded-2xl items-center transition-all duration-300 linear hover:bg-gray-100 mt-1"
                    >
                        <p className="font-normal text-xs text-gray-900 select-none">
                            More Details
                        </p>
                        <i
                            className="fa-solid fa-caret-down text-gray-900 transition-all duration-300 linear"
                            style={{
                                transform: isDescriptionOpen ? "rotate(-180deg)" : "",
                            }}
                        ></i>
                    </div>
                )}
                
            </div>
            <div className="relative h-32 w-32 rounded-xl overflow-hidden shrink-0 m-2">
                <img
                    src={isError ? "/images/fallback.png" : imageUrl}
                    className="absolute top-0 left-0 h-full w-full object-center object-cover"
                    alt={item?.name}
                    onError={() => setIsError(true)}
                />
                <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2">
                    <AddToCartBtn data={{restaurantData, item, quantity}} quantityBtnPadding="p-1" number_width="w-8" />
                </div>
            </div>
        </div>
        {isDescriptionOpen && (
            <div className="px-2 pb-0.5 text-gray-600 font-medium">
                <hr className="text-gray-300 my-1" />
                <p>{item?.description}</p>
            </div>
        )}
    </div>
}

export default ItemCard;