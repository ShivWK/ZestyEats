import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectItemsToBeAddedInCart } from "../../../features/home/restaurantsSlice";

const RestaurantCard = ({ data }) => {
    const metadata = data.restro.metadata;
    const [lat, lng] = metadata.latLong.split(",");
    const restro_id = metadata.id;
    const name = metadata.name;

    const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);

    useEffect(() => {
        localStorage.setItem("ItemsToBeAddedInCart", JSON.stringify(itemsToAddInCart));
    }, [itemsToAddInCart])

    return <section className="border-[1px] border-gray-300 rounded m-0.5 my-1">
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
                    <button className="bg-green-400 inline-block text-white ml-auto font-semibold px-2 py-0.5 rounded active:scale-95 transition-all duration-100 ease-linear">{`Move ${itemsToAddInCart.length !== 0 ? `${itemsToAddInCart.length} items` : ""} to cart`}</button>
                </div>
            </div>
        </div>
        {data?.item.map(item => <ItemCard key={item.key} item={item} />)}
    </section>
}

export default RestaurantCard;