import { useState, Suspense, useRef, useEffect } from "react";
import {
    Link,
    useLoaderData,
    useSearchParams,
    Await,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addCurrentRestaurant,
    setMenuItems,
    addToWishlistItem,
    selectWishlistItems,
    deleteItemFromWishlist
} from "../../features/home/restaurantsSlice";
import { selectVegVariant } from "../../features/home/restaurantsSlice";
import Ui3Shimmer from "./Ui3Shimmer";
import Filter from "../Home/Filters";
import useScrollToTop from "../../utils/useScrollToTop";
import AddToCartBtn from "../AddToCartBtn";

const Card = ({ data, lat, lng }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const paraRef = useRef(null);
    const [paraHeight, setParaHeight] = useState(0);

    const mainData = data?.card?.card;
    const dishData = mainData?.info;
    const restaurantData = mainData?.restaurant?.info;

    // when display = none (hidden) then scrollHieght clienteight both are 0 so cal para height when when is not hidden e.i., isDescriptionOpen = true
    useEffect(() => {
        if (isDescriptionOpen && paraRef.current) {
            setParaHeight(paraRef.current.scrollHeight + 10)
        }
    }, [isDescriptionOpen])

    const modifiedRestaurantData = structuredClone(restaurantData);
    modifiedRestaurantData.latLong = `${lat}, ${lng}`;

    const restaurantDataToWishlist = {
        metadata: modifiedRestaurantData,
        address: restaurantData?.address,
        offers: null
    }

    const wishlist = useSelector(selectWishlistItems);
    const isWishlisted = dishData?.id in wishlist || false;

    const [wishlistAdded, setWishlistAdded] = useState(isWishlisted);
    const dispatch = useDispatch();

    const path = `/restaurantSpecific/${lat}/${lng}/${restaurantData?.id}/${restaurantData?.name}`;
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${dishData?.imageId}`;

    const defaultPrice = dishData?.price / 100 || dishData?.defaultPrice / 100 || 0;
    const finalPrice = dishData?.finalPrice / 100;
    const price = finalPrice ? (
        <p className="text-sm tracking-tight flex items-center gap-1 font-bold">
            <span className="line-through dark:text-gray-700 text-gray-500">₹{defaultPrice} </span>₹
            {finalPrice}
        </p>
    ) : (
        <p className="text-sm tracking-tight font-bold">₹{defaultPrice}</p>
    );

    const handleClick = (name) => {
        dispatch(addCurrentRestaurant(name));
        dispatch(setMenuItems({ mode: "empty" }));
    };

    const wishlistAddHandler = (wishlistObject, id) => {
        if (id in wishlist) {
            setWishlistAdded(false);
            dispatch(deleteItemFromWishlist(id))
        } else {
            setWishlistAdded(true);
            dispatch(addToWishlistItem(wishlistObject));
        }
    }

    return (
        <div className="max-md:basis-full md:basis-[49%] pb-1 rounded-md dark:bg-gray-300 bg-white">
            <Link
                to={path}
                onClick={() => handleClick(restaurantData?.name)}
                className="flex group items-center justify-between p-3 w-full cursor-pointer"
            >
                <div className="basis-[95%]">
                    <p className="font-bold dark:text-black text-gray-800 line-clamp-2 leading-5 md:w-full break-words">
                        {restaurantData?.name}
                    </p>
                    <div className="flex gap-1 items-center dark:text-gray-800 text-gray-500 font-semibold text-sm">
                        <i className="ri-star-fill dark:text-green-400 text-green-700 mb-0.5" />
                        <p>{restaurantData?.avgRating}</p>
                        <p>•</p>
                        <p>{restaurantData?.sla?.slaString}</p>
                        <p>•</p>
                        <p>{restaurantData?.costForTwoMessage}</p>
                    </div>
                </div>
                <i className="basis-[3%] md:basis-[5%] dark:text-black ri-arrow-right-long-fill text-2xl text-gray-600 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-150 ease-in-out"></i>
            </Link>
            <hr className="text-gray-300 my-1.5" />
            <div className="flex justify-between">
                <div className="flex flex-col gap-2 p-4">
                    {dishData.isVeg === 1 ? (
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
                            {dishData?.name}
                        </p>
                    </div>
                    <div>{price}</div>
                    {dishData?.description && (
                        <div
                            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                            id="moreCities"
                            className="flex gap-2.5 cursor-pointer border-[1px] md:border-2 dark:border-gray-700 dark:text-gray-700 border-gray-500 px-2 py-0.5 w-fit rounded-2xl items-center transition-all duration-300 linear hover:bg-gray-100 mt-1"
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
                        alt={dishData?.name}
                        onError={() => setIsError(true)}
                    />
                    <div className="absolute top-[75%] transform -translate-x-1/2 left-1/2 ">
                        <AddToCartBtn data={{ restaurantData: restaurantDataToWishlist, item: dishData, quantity: 1 }} />
                    </div>
                    <div className="absolute top-2.5 right-2.5 cursor-pointer flex items-center justify-center rounded-[9999px] p-0.5" onClick={() => wishlistAddHandler({ restaurantData: restaurantDataToWishlist, item: dishData, quantity: 1 }, dishData?.id)} style={{ backgroundColor: wishlistAdded ? "red" : "rgba(0, 0, 0, 0.6)" }}>
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
            </div>

            <div className="px-2 transition-all duration-100 ease-linear overflow-hidden dark:text-black text-gray-700 font-medium dark:bg-gray-300 bg-white"
                style={{ height: isDescriptionOpen ? `${paraHeight}px` : "0px" }}
            >
                <hr className={`text-gray-300 my-1`} />
                <p ref={paraRef} className="max-md:text-sm " >{dishData?.description}</p>
            </div>

        </div>
    );
};

const MainContent = ({ data, lat, lng, mode }) => {
    useScrollToTop();
    const { vegOption, nonVegOption } = useSelector(selectVegVariant);

    const cards =
        mode === "parent"
            ? data?.data?.data?.cards?.[1].groupedCard?.cardGroupMap?.DISH?.cards.slice(
                1
            )
            : data?.data?.data?.cards?.[0].groupedCard?.cardGroupMap?.DISH?.cards.slice(
                1
            );

    return (
        <div className="bg-gray-200 dark:bg-gray-800 p-1.5 rounded-md mt-14">
            <div className="w-full mb-2.5 -mt-1.5">
                <Filter text1="Veg" text2="Non Veg" />
            </div>
            <div className="flex items-start flex-wrap gap-2.5 gap-y-4 w-full justify-between">
                {cards ? (
                    cards.map((item) => {
                        const data = item?.card?.card?.info;
                        console.log(data?.isVeg);

                        if (!vegOption && data?.isVeg) return;
                        if (!nonVegOption && !data?.isVeg) return;

                        return <Card
                            key={item?.card?.card?.info?.id}
                            data={item}
                            lat={lat}
                            lng={lng}
                        />
                    })
                ) : (
                    <p className="self-center font-semibold text-center pb-4 pt-2">
                        Sorry no data for this restaurant
                    </p>
                )}
            </div>
        </div>
    );
};

const DishResultPage = () => {
    const { data } = useLoaderData();
    const [searchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const mode = searchParams.get("mode");

    return (
        <Suspense fallback={<Ui3Shimmer />}>
            <Await resolve={data}>
                {(data) => <MainContent data={data} lat={lat} lng={lng} mode={mode} />}
            </Await>
        </Suspense>
    );
};

export default DishResultPage;
