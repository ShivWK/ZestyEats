import { useEffect, useState } from "react";
import { selectWishlistItems } from "../../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import Loader from "./../../Loader";

const WishlistedItems = () => {
    const wishlistItems = useSelector(selectWishlistItems);
    // console.log(wishlistItems)
    const [wishlist, setWishlist] = useState(null);
    const wishlistItemsMap = new Map();

    Object.values(wishlistItems).forEach(({ restaurantData, item }) => {
        const key = restaurantData.metadata?.id || restaurantData.id;

        if (!wishlistItemsMap.has(key)) {
            wishlistItemsMap.set(key, { restro: restaurantData, item: [item] })
        } else {
            wishlistItemsMap.get(key).item.push(item);
        }
    })

    useEffect(() => {
        const wishlistArray = Array.from(wishlistItemsMap.values());
        setWishlist(wishlistArray);
    }, [wishlistItems])

    return <div>
        {wishlist ? (wishlist.length !== 0
            ? (wishlist.map(data => <RestaurantCard key={data.restro.metadata?.id || data.restro.id} data={data} />))
            : <p className="text-center text-gray-700 font-semibold my-3">No items in wishlist.</p>)
            : <div className="flex items-center justify-center py-3">
                <Loader size="small" />
            </div>
        }
    </div>
}

export default WishlistedItems