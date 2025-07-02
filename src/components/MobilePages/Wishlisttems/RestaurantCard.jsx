import { Link } from "react-router-dom";

const RestaurantCard = ({ data }) => {
    const metadata = data.restro.metadata;
    const [ lat, lng ] = metadata.latLong.split(",");
    const restro_id = metadata.id;
    const name = metadata.name;

    return <section className="border-[1px] border-gray-300 rounded my-0.5">
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
                <div className="basis-[64%]">
                  
                        {/* <p className="text-sm font-medium text-gray-700 truncate">{data.restro.address.completeAddress || data.restro.address}</p> */}
                   
                    <div className="flex gap-1 items-center text-gray-500 font-semibold text-sm">
                        <i className="ri-star-fill text-green-700 mb-0.5" />
                        <p>{metadata?.avgRating}</p>
                        <p>•</p>
                        <p>{metadata?.sla?.slaString}</p>
                    </div>
                    
                </div>
                <button className="bg-green-400 text-white font-semibold px-1.5 py-0.5 rounded basis-[35%] self-end">Move to cart</button>
            </div>
        </div>
        <div></div>
    </section>
}

export default RestaurantCard;