import ItemCard from './ItemsCard';

const RestaurantCard = () => {
  const restaurants = Array.from({ length: 5 }, (_, i) => i);
  const itemCardsArray = Array.from({ length: 3 }, (_, i) => i);

  return restaurants.map((_, index) => (
    <div
      key={index}
      className="mt-3 flex flex-col justify-center gap-1 rounded-md border-[1px] border-gray-300 p-2 py-5"
    >
      <div className="shimmerBg h-4 w-[35%] rounded md:h-5"></div>
      <div className="shimmerBg h-3 w-[25%] rounded md:h-4"></div>
      <div className="shimmerBg h-3 w-[20%] rounded"></div>

      <div className="mt-2 flex items-center gap-2 overflow-hidden md:mt-3">
        {itemCardsArray.map((_, index) => (
          <ItemCard key={index} />
        ))}
      </div>
    </div>
  ));
};

export default RestaurantCard;
