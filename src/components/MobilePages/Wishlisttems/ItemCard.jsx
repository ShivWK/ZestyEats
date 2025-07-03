import { useState } from "react";
import { selectItemsToBeAddedInCart, toggleItemsToBeAddedInCart } from "../../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";

const ItemCard = ({ item, restro_id }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);

    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

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

    const checkHandler = (e) => {
        if (e.target.checked) {
            dispatch(toggleItemsToBeAddedInCart({ add: true, id: item.id, restro_id }));
        } else {
            dispatch(toggleItemsToBeAddedInCart({ add: false, id: item.id, restro_id }));
        }
    }

    const checked = itemsToAddInCart[restro_id]?.includes(item.id);

    return <div className="border-[1px] border-gray-300 p-0.5">
        <input className="h-4 w-4 ml-1 mt-1" type="checkbox" checked={checked} onChange={checkHandler} />
        <div className="flex justify-between bg-white">
            <div className="flex flex-col gap-2 p-4">
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
                    <p className="leading-5 line-clamp-2 tracking-tight font-bold">
                        {item?.name}
                    </p>
                </div>
                <div>{price}</div>
                {item?.description && (
                    <div
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        id="moreCities"
                        className="flex gap-2.5 cursor-pointer border-2 border-gray-500 px-2 py-0.5 w-fit rounded-2xl items-center transition-all duration-300 linear hover:bg-gray-100 mt-1"
                    >
                        <p className="font-normal text-sm text-gray-900 select-none">
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
            <div className="relative h-36 w-36 rounded-xl overflow-hidden shrink-0 m-2">
                <img
                    src={isError ? "/images/fallback.png" : imageUrl}
                    className="absolute top-0 left-0 h-full w-full object-center object-cover"
                    alt={item?.name}
                    onError={() => setIsError(true)}
                />
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