import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ItemCard from "./ItemCard";
import HorizontalCarousel from "./../../HorizontalCarousel";
import { addCurrentRestaurant } from "../../../features/home/restaurantsSlice";

const RestaurantCart = ({ data, latLng }) => {
    const dispatch = useDispatch();
    const restaurantData = data.restaurant.info;
    const dishesData = data.dishes.map(data => data.info);
    const { lat, lng } = latLng;

    let restaurantDataV2 = structuredClone(restaurantData);
    restaurantDataV2.latLong = `${lat},${lng}`;

    const citySmall = restaurantData?.slugs?.city;
    const city = citySmall[0].toUpperCase() + citySmall.slice(1);
    const areaName = restaurantData.areaName;
    const locality = restaurantData.locality;
    let areaOrLocality = locality + ", " + areaName + ", " + city;

    if (areaName === locality) areaOrLocality = locality + ", " + city;

    // console.log(dishesData);
    const clickHandler = () => {
        dispatch(addCurrentRestaurant(restaurantData.name));
    }

    return <section className=" rounded-xl m-0.5 my-4 md:my-4 bg-white">
        <div className="px-2 py-2 w-full flex flex-col gap-0.5">
            <Link
                to={`/restaurantSpecific/${lat}/${lng}/${restaurantData.id}/${restaurantData.name}?mode=dishPage`}
                className="group flex items-center justify-between"
                onClick={clickHandler}
            >
                <p className="basis-[90%] md:basis-[96%] truncate text-xl font-bold select-none">
                    {restaurantData.name}
                </p>

                <i className="basis-[8%] md:basis-[3%] active:text-primary ri-arrow-right-long-fill text-2xl text-gray-900 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-150 ease-in-out"></i>
            </Link>

            <p className="text-xs md:text-sm font-bold text-gray-700 truncate -mt-1">{areaOrLocality}</p>

            <div className="flex gap-1 items-center text-gray-600 font-semibold text-sm">
                <i className="ri-star-fill text-green-700 mb-0.5" />
                <p>{restaurantData?.avgRating}</p>
                <p>•</p>
                <p>{restaurantData?.sla?.slaString || "25-30 MINS"}</p>
            </div>
            <hr className="text-gray-300 mt-1" />
            <div className="">
                <HorizontalCarousel showScrollBar={false} dataToMap={dishesData} Card={ItemCard} restaurantData={restaurantDataV2} />
            </div>
        </div>
    </section>
}

export default RestaurantCart;