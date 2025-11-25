// Done

import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import Filter from "./Filters";
import { selectVegVariant } from "../../features/home/restaurantsSlice";

const OnlineDeliveryRestaurant = ({ data, heading = null }) => {
  // console.log("OnlineDeliveryRestaurant rendered");
  let DEFAULT_HEADING = "Restaurants with online food delivery";

  const title = heading || DEFAULT_HEADING;
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  return (
    <>
      <div>
        <h3 className="dark:text-white">{title}</h3>
        <Filter />
      </div>
      <div className="flex flex-wrap gap-y-7 gap-x-8 justify-start w-full mt-8 mx-auto max-md:pl-1">
        {data.map(item => {
          const variant = item?.info?.veg ? "veg" : "non-veg";

          if (variant === "veg") {
            if (vegOption) {
              return <RestaurantCard
                key={item.info.id}
                data={item.info}
                imageWidth={240}
                imageHeight={40}
                from={"online"}
              />
            }
          } else {
            if (nonVegOption) {
              return <RestaurantCard
                key={item.info.id}
                data={item.info}
                imageWidth={240}
                imageHeight={40}
                from={"online"}
              />
            }
          }
        }
        )}
      </div>
    </>
  );
};

export default OnlineDeliveryRestaurant;
