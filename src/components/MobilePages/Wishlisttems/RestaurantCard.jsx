import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectItemsToBeAddedInCart } from "../../../features/home/restaurantsSlice";

const RestaurantCard = ({ data }) => {
    const metadata = data.restro.metadata;
    const [lat, lng] = metadata.latLong.split(",");
    const restro_id = metadata.id;
    const name = metadata.name;

    const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);
    const restroItemsArray = itemsToAddInCart[restro_id] || [];

    const [itemsCount, setItemsCount] = useState(restroItemsArray.length);

    useEffect(() => {
        setItemsCount(itemsToAddInCart[restro_id]?.length || 0);
        localStorage.setItem("ItemsToBeAddedInCart", JSON.stringify(itemsToAddInCart));
    }, [itemsToAddInCart])

    return <section className="border-[2px] border-gray-400 rounded m-0.5 my-2">
        <div className="p-2 w-full flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
                <p className="basis-[89%] truncate font-bold">
                    {name}
                </p>
                <Link to={`/restaurantSpecific/${lat}/${lng}/${restro_id}/${name}`} className="basis-[10%] active:text-primary">
                    <i className="ri-arrow-right-long-fill text-2xl text-gray-600 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-150 ease-in-out p-0"></i>
                </Link>
            </div>
            <div className="flex items-center justify-between">
                <div className="basis-[40%]">
                    {/* <p className="text-sm font-medium text-gray-700 truncate">{data.restro.address.completeAddress || data.restro.address}</p> */}

                    <div className="flex gap-1 items-center text-gray-500 font-semibold text-sm">
                        <i className="ri-star-fill text-green-700 mb-0.5" />
                        <p>{metadata?.avgRating}</p>
                        <p>•</p>
                        <p>{metadata?.sla?.slaString}</p>
                    </div>
                </div>
                <div className="basis-[60%] flex">
                    <button className="bg-green-500 inline-block text-white ml-auto font-semibold px-2 py-0.5 rounded active:scale-95 transition-all duration-100 ease-linear">{`Move ${itemsCount !== 0 ? (itemsCount > 1 ? `${itemsCount} items` : `${itemsCount} item`) : ""} to cart`}</button>
                </div>
            </div>
        </div>
        {data?.item.map(item => <ItemCard key={item.key} item={item} restro_id={restro_id} />)}
    </section>
}

export default RestaurantCard;