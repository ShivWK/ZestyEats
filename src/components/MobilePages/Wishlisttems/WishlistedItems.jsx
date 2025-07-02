import { useEffect, useState } from "react";
import { selectWishlistItems } from "../../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import Loader from "./../../Loader";

const WishlistedItems = () => {
    const wishlistItems = useSelector(selectWishlistItems);
    const [wishlist, setWishlist] = useState(null);
    const wishlistItemsMap = new Map();

    Object.values(wishlistItems).forEach(({restaurantData, item}) => {
        const key = restaurantData.metadata.id;

        if(!wishlistItemsMap.has(key)) {
            wishlistItemsMap.set(key, {restro: restaurantData, item: [item]})
        } else {
            wishlistItemsMap.get(key).item.push(item);
        }
    })

    useEffect(() => {
        const wishlistArray = Array.from(wishlistItemsMap.values());
        setWishlist(wishlistArray);
    }, [])

    console.log(wishlist)

    return <div>
        {wishlist ? (wishlist.length !== 0
            ? (wishlist.map(data => <RestaurantCard data={data} />))
            : <p className="text-center text-gray-700 font-semibold my-3">No items in wishlist.</p>)
            : <Loader size="small" />
        }
    </div>
}

export default WishlistedItems