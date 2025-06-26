import { useSelector } from "react-redux";
import Cards from "./Cards";
import Filter from "./Filters";
import { selectOnlineDeliveryTitle } from "../../features/home/homeSlice";
import { selectVegVariant } from "../../features/home/restaurantsSlice";
import { memo } from "react";

const OnlineDeliveryRestaurant = memo(({ data, heading = null }) => {
  const title = heading || useSelector(selectOnlineDeliveryTitle);
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  return (
    <>
      <div>
        <h3>{title}</h3>
        <Filter />
      </div>
      <div className="flex flex-wrap gap-y-7 gap-x-8 justify-start w-full mt-8 mx-auto">
        {data.map(item => {
          const variant = item?.info?.veg ? "veg" : "non-veg";

          if (variant === "veg") {
            if (vegOption) {
              return <Cards
              key={item.info.id}
              data={item.info}
              imageWidth={240}
              imageHeight={40}
              from={"online"}
            />
            }
          } else {
            if (nonVegOption) {
              return <Cards
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
});

export default OnlineDeliveryRestaurant;
