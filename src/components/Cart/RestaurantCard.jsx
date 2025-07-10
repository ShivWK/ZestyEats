import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import { selectLatAndLng } from "../../features/home/homeSlice";
import ItemCard from "./ItemCard";
import haversineFormula from "./../../utils/haversineFormula";

const RestaurantCard = ({ data }) => {
    // console.log(data)
    const dispatch = useDispatch();
    const { lat: latCurrent, lng: lngCurrent } = useSelector(selectLatAndLng);

    const restaurantData = data[0].metadata;
    const items = data.slice(1);
    console.log(restaurantData, items)

    const [lat, lng] = restaurantData.latLong.split(",");
    const distance = haversineFormula(lat, latCurrent, lng, lngCurrent);

    const isDeliverable = distance <= 10;

    const id = restaurantData.id;
    const name = restaurantData.name

    const areaName = restaurantData.areaName;
    const locality = restaurantData.locality;
    let areaOrLocality = locality + ", " + areaName;

    if (areaName === locality) areaOrLocality = locality;

    const citySmall = restaurantData?.slugs?.city;
    const city = citySmall[0].toUpperCase() + citySmall.slice(1) + ".";

    const opened = restaurantData.availability.opened

    const ClickHandler = () => {
        dispatch(addCurrentRestaurant(name));
    }

    return <section className="md:basis-[59%] flex flex-col gap-2">
        <div className="bg-white rounded-md p-2">
            <div className="w-full flex flex-col gap-1">
                <Link to={`/restaurantSpecific/${lat}/${lng}/${id}/${name}`} onClick={ClickHandler} className="group flex items-center justify-between">
                    <p className="basis-[95%] truncate text-xl font-bold select-none">
                        {name}
                    </p>
                    <i className="basis-[4%] ri-arrow-right-long-fill text-2xl text-gray-800 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-200 ease-in-out p-0"></i>
                </Link>

                <p className="text-sm font-bold text-gray-700 truncate -mt-1">{areaOrLocality + ", " + city}</p>


                <div className="flex gap-1.5 items-center text-gray-500 font-semibold text-sm">
                    <i className="ri-star-fill text-green-700 mb-0.5" />
                    <p>{restaurantData?.avgRating}</p>
                    <p>•</p>
                    <p>{restaurantData?.sla?.slaString || "25-30 MINS"}</p>
                    <p>•</p>
                    <p className={`${opened ? "text-green-500" : "text-red-600"} font-semibold`}>{opened ? "OPEN 😊" : "CLOSED 😟"}
                    </p>
                    {!isDeliverable && <p className="hidden md:inline">•</p>}
                    <div className="hidden md:flex items-center gap-1">
                        {!isDeliverable && <p className="text-red-500 font-medium">(Not delivering to your area)</p>}
                        <div className="relative flex gap-1.5 items-center">
                            <div id="No delivery" className="relative">
                                <i className="fas fa-shipping-fast text-black"></i>
                                <div className="absolute ml-2 -bottom-0.5 h-6 w-0.5 bg-red-500 transform rotate-45"></div>
                                <div className="absolute ml-2 -bottom-0.5 h-6 w-0.5 bg-red-500 transform -rotate-45"></div>
                            </div>
                            <p className="text-gray-600 font-normal">({distance.toFixed(2)} kms)</p>
                        </div>
                    </div>
                </div>
                <div className="md:hidden flex items-center gap-1">
                    {!isDeliverable &&
                        <>
                            <p className="text-red-500 font-medium text-sm">(Not delivering to your area)</p>
                            <div className="relative flex gap-1.5 items-center">
                                <div id="No delivery" className="relative">
                                    <i className="fas fa-shipping-fast text-sm text-black"></i>
                                    <div className="absolute ml-2 bottom-0 h-6 w-0.5 bg-red-500 transform rotate-45"></div>
                                    <div className="absolute ml-2 bottom-0 h-6 w-0.5 bg-red-500 transform -rotate-45"></div>
                                </div>
                                <p className="text-gray-600 text-sm">({distance.toFixed(2)} kms)</p>
                            </div>
                        </>}
                </div>
            </div>
            <hr className="text-gray-400 my-2 md:my-3" />
            <div className="md:px-1 flex flex-col gap-2">
                {items.map(data => <ItemCard key={data.item.id} data={data} restaurantData={restaurantData} />)}
            </div>
        </div>
    </section>
}

export default RestaurantCard;