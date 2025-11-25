// Done

import { useEffect, useState } from "react";
import textToZestyEats from "../../utils/textToZestyEats";
import { setFavoriteRestaurant, selectFavoriteRestaurants } from "../../features/home/restaurantsSlice";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const RestaurantImageCard = ({ disable, dataToMap, from, userDistanceFromRestaurant, setDisable }) => {
    // console.log("RestaurantImageCard rendered")
    const imageId = encodeURIComponent(dataToMap?.cloudinaryImageId?.trim());
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`;

    const [wishlistAdded, setWishlistAdded] = useState(false);
    const favoriteRestaurants = useSelector(selectFavoriteRestaurants);
    const { lat, lng } = useSelector(selectLatAndLng);
    const pathname = useLocation().pathname;
    const dispatch = useDispatch();

    const wishlistClickHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setWishlistAdded(!wishlistAdded);
        dispatch(setFavoriteRestaurant({ lat, lng, data: dataToMap }));
    };

    useEffect(() => {
        const exist = favoriteRestaurants?.find((obj) => obj.data?.id === dataToMap?.id);
        setWishlistAdded(exist);

        if (pathname.includes("ordersAndWishlist")) {
            if (userDistanceFromRestaurant > 20) {
                setDisable(true);
            }
        }
    }, [favoriteRestaurants, userDistanceFromRestaurant, dataToMap?.id, pathname, setDisable])

    return (
        <div
            className={`relative w-full max-md:basis-[48%] h-40 bg-no-repeat bg-cover bg-center rounded-2xl flex items-end p-3 md:pl-4 shrink-0 max-md:max-h-full max-md:min-h-52 ${!disable && "max-md:shadow-[0_0_10px_2px_rgba(0,0,0,0.5)] dark:shadow-[0_0_10px_2px_rgba(156,145,145,0.5)]"} ${from === "online"
                ? "md:h-[160px]"
                : from === "specificFood"
                    ? "md:h-[240px]"
                    : "md:h-[180px]"
                }`}
            style={{
                backgroundImage: `linear-gradient(0deg,rgba(23, 23, 23, 1) 0%, rgba(247, 247, 247, 0) 48%), url(${imageUrl}), url("/images/fallback.png")`,
            }}
        >
            <p className="font-bold dark:text-gray-200 text-white text-xl">
                {(textToZestyEats(dataToMap.aggregatedDiscountInfoV3?.header) || "") +
                    " " +
                    (textToZestyEats(dataToMap.aggregatedDiscountInfoV3?.subHeader) ||
                        "")}
            </p>
            <div
                className="absolute top-2.5 right-2.5 cursor-pointer flex items-center justify-center rounded-full p-0.5"
                onClick={wishlistClickHandler}
                style={{
                    backgroundColor: wishlistAdded ? "red" : "rgba(0, 0, 0, 0.6)",
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6 wishlist-icon"
                >
                    <path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736ZM5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701C17.3397 4.67979 14.9458 4.60806 13.3743 5.98376L9.17157 10.1869L7.75736 8.77264L10.582 5.946L10.5002 5.87701C8.92545 4.61197 6.62322 4.71993 5.17157 6.17157Z"></path>
                </svg>
            </div>
        </div>
    )
}

export default RestaurantImageCard