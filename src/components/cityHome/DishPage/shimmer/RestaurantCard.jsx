import ItemCard from "./ItemsCard"

const RestaurantCard = () => {
    const restaurants = Array.from({ length: 5 }, (_, i) => i);
    const itemCardsArray = Array.from({ length: 3 }, (_, i) => i)

    return (
        restaurants.map((_, index) => <div key={index} className="rounded-md border-[1px] flex flex-col justify-center gap-1 border-gray-300 p-2 py-5 mt-3">
            <div className="shimmerBg w-[35%] h-4 md:h-5 rounded"></div>
            <div className="shimmerBg w-[25%] h-3 md:h-4 rounded"></div>
            <div className="shimmerBg w-[20%] h-3 rounded"></div>

            <div className="flex gap-2 items-center overflow-hidden mt-2 md:mt-3">
                {itemCardsArray.map((_, index) => <ItemCard key={index} />)}
            </div>
        </div>)
    )
}

export default RestaurantCard