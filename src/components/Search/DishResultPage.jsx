import { useState, Suspense } from "react";
import { NavLink, useLoaderData, useSearchParams, Await } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import Ui3Shimmer from "./Ui3Shimmer";

const Card = ({ data , lat, lng}) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [wishlistAdded, setWishlistAdded] = useState(false);
    const dispatch = useDispatch();

    const mainData = data?.card?.card;
    const disData = mainData?.info;
    const restroData = mainData?.restaurant?.info;
    const path = `/restaurantSpecific/${lat}/${lng}/${restroData?.id}/${restroData?.name}`;
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${disData?.imageId}`;

    const defaultPrice =
        disData?.price / 100 || disData?.defaultPrice / 100 || 0;
    const finalPrice = disData?.finalPrice / 100;
    const price = finalPrice ? (
        <p className="text-sm tracking-tight font-bold">
            <span className="line-through text-gray-500">₹{defaultPrice} </span>₹
            {finalPrice}
        </p>
    ) : (
        <p className="text-sm tracking-tight font-bold">₹{defaultPrice}</p>
    );

    const handleClick = (name) => {
        dispatch(addCurrentRestaurant(name));
    };

    return (
        <div className="basis-[49%] pb-1 border-2 border-gray-300 rounded-md bg-white">
            <NavLink
                to={path}
                onClick={() => handleClick(restroData?.name)}
                className="flex group justify-between  p-3 w-full cursor-pointer"
            >
                <div>
                    <p className="font-bold text-gray-800 w-64 overflow-hidden">
                        {restroData?.name}
                    </p>
                    <div className="flex gap-1 items-center text-gray-500 font-semibold text-sm">
                        <i className="ri-star-fill" />
                        <p>{restroData?.avgRating}</p>
                        <p>•</p>
                        <p>{restroData?.sla?.slaString}</p>
                        <p>•</p>
                        <p>{restroData?.costForTwoMessage}</p>
                    </div>
                </div>
                <i className="ri-arrow-right-long-fill text-2xl text-gray-600 ursor-pointer transform group-hover:translate-x-[6px] transition-all duration-150 ease-in-out"></i>
            </NavLink>
            <hr className="text-gray-300 my-1.5" />
            <div className="flex justify-between bg-white">
                <div className="flex flex-col gap-2 p-4">
                    {disData.isVeg === 1 ? (
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
                    <div className="w-48">
                        <p className="leading-5 tracking-tight font-bold">
                            {disData?.name}
                        </p>
                    </div>
                    <div>{price}</div>
                    {disData?.description && (
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
                        alt={disData?.name}
                        onError={() => setIsError(true)}
                    />
                    <button className="absolute py-1 px-8 rounded bg-green-400 text-white font-semibold tracking-tight mt-auto top-[75%] transform -translate-x-1/2 left-1/2 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out ">
                        Add
                    </button>
                     <i className="absolute top-2.5 right-2.5 ri-poker-hearts-fill text-2xl text-gray-600 cursor-pointer" style={{ color: wishlistAdded ? "red" : "rgba(0,0,0,0.5)" }} onClick={() => setWishlistAdded(!wishlistAdded)}></i>
                </div>
            </div>
            {isDescriptionOpen && (
                <div className="px-2 text-gray-600 font-medium">
                    <hr className="text-gray-300 my-1" />
                    <p>{disData?.description}</p>
                </div>
            )}
        </div>
    );
};

const MainContent = ({ data, lat, lng, mode }) => {
    console.log(data)
    const cards = mode === "parent" ? data?.data?.data?.cards?.[1].groupedCard?.cardGroupMap?.DISH?.cards.slice(1) : data?.data?.data?.cards?.[0].groupedCard?.cardGroupMap?.DISH?.cards.slice(1)


    return (
        <div className="flex items-start flex-wrap gap-2.5 gap-y-4 w-full justify-between pt-20 bg-gray-200 p-1.5 rounded-md">
            {cards ? (
                cards.map((item) => (
                    <Card key={item?.card?.card?.info?.id} data={item} lat={lat} lng={lng} />
                ))
            ) : (
                <p className="self-center font-semibold text-center pb-4 pt-2">
                    Sorry no data for this restaurant
                </p>
            )}
        </div>
    );
};

const DishResultPage = () => {
    const { data } = useLoaderData();
    const [ searchParams ] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const mode = searchParams.get("mode");

    return <Suspense fallback={<Ui3Shimmer />}>
        <Await resolve={data}>
            {data => <MainContent data={data} lat={lat} lng={lng} mode={mode} />}
        </Await>
    </Suspense>
}

export default DishResultPage;