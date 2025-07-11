import { useState } from "react";
import { setItemQuantity, selectWishlistItems, addToWishlistItem } from "../../features/home/restaurantsSlice";
import { useDispatch, useSelector } from "react-redux";
import AddToCartBtn from "./../AddToCartBtn";

const ItemCard = ({ data, restaurantData }) => {
    const dispatch = useDispatch();
    const { item, quantity } = data;
    const Wishlist = useSelector(selectWishlistItems);
    const isPresentInWishlist = item.id in Wishlist;

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.imageId}`;

    const deleteHandler = () => {
        dispatch(setItemQuantity({ id: item.id, type: "delete" }))
    }

    const defaultPrice = quantity * item?.price / 100 || quantity * item?.defaultPrice / 100 || 0;
    const finalPrice = quantity * item?.finalPrice / 100;
    const price = finalPrice ? (
        <p className="text-sm tracking-tight flex gap-1 items-center font-semibold text-gray-800">
            <span className="line-through text-gray-500">₹{""}{defaultPrice} </span>₹{""}
            {finalPrice} {" "}
            <svg className="inline" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z" fill="#1BA672"></path></svg>
        </p>
    ) : (
        <p className="text-sm tracking-tight font-semibold text-gray-800">₹{""}{defaultPrice}</p>
    );

    const moveToWishlistHandler = () => {
        dispatch(addToWishlistItem({restaurantData, item, quantity: 1}));
        deleteHandler();
    }

    return <div className="border-[1px] border-gray-300 p-1 pt-2 rounded-md flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <button disabled={isPresentInWishlist} onClick={moveToWishlistHandler} className="text-xs md:text-sm px-1 py-0.5 border-[1px] border-gray-300 rounded md:rounded-md bg-gray-100 cursor-pointer">
                {isPresentInWishlist ? <p className="text-gray-500">Present in Wishlist <i className="ri-heart-2-fill text-red-500"></i></p> : <p>Move to Wishlist <i className="ri-heart-2-fill text-red-500"></i></p>}
            </button>
            <i onClick={deleteHandler} className="fa-solid fa-trash-can text-red-400 cursor-pointer"></i>
        </div>
        <div className="flex justify-between bg-white pl-1">
            <div className="flex flex-col gap-1.5">
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
                    <p className="leading-5 line-clamp-2 tracking-tight font-bold mt-1">
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
            <div className="relative h-32 w-32 rounded-xl overflow-hidden shrink-0 m-2">
                <img
                    src={isError ? "/images/fallback.png" : imageUrl}
                    className="absolute top-0 left-0 h-full w-full object-center object-cover"
                    alt={item?.name}
                    onError={() => setIsError(true)}
                />
                <div className="absolute top-[75%] left-1/2 transform -translate-x-1/2">
                    <AddToCartBtn data={{ restaurantData, item, quantity }} quantityBtnPadding="p-1" number_width="w-8" />
                </div>
            </div>
        </div>
        {isDescriptionOpen && (
            <div className="px-2 pb-0.5 text-gray-600 font-medium">
                <hr className="text-gray-300 my-1" />
                <p className="text-sm break-words">{item?.description}</p>
            </div>
        )}
    </div>
}

export default ItemCard;

{/* <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.63362 8.39604C1.28368 8.7446 1.28368 9.30972 1.63362 9.65828L6.1293 14.1362C6.47924 14.4848 7.0466 14.4848 7.39654 14.1362L12.9543 8.60038C13.1228 8.43251 13.2173 8.20468 13.2168 7.96728L13.2069 3.49924C13.2058 3.00785 12.8061 2.60977 12.3128 2.60868L7.827 2.5988C7.58866 2.59828 7.35993 2.69235 7.1914 2.86022L1.63362 8.39604ZM10.8177 6.90055C11.3458 6.37452 11.3439 5.51976 10.8134 4.99139C10.283 4.46302 9.4248 4.46113 8.89668 4.98717C8.36856 5.5132 8.37045 6.36796 8.90092 6.89633C9.43138 7.4247 10.2895 7.42659 10.8177 6.90055Z" fill="#1BA672"></path></svg> */ }