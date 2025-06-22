import { useSelector } from "react-redux";
import Cards from "../Cards";
import Filter from "./Filters";
import {
  selectOnlineDeliveryRestaurants,
  selectOnlineDeliveryTitle,
} from "../../../features/home/homeSlice";
import { memo } from "react";

const OnlineDeliveryRestaurant = memo(() => {
  const data = useSelector(selectOnlineDeliveryRestaurants);
  const title = useSelector(selectOnlineDeliveryTitle);

  return (
    <>
      <div>
        <h3>{title}</h3>
        <div className="flex gap-2.5 mt-4 w-full">
          <Filter applied={true} text="Pure Veg" />
          <Filter applied={true} text="Veg & Non-Veg" />
        </div>
      </div>
      <div className="flex flex-wrap gap-y-7 gap-x-8 justify-start w-full mt-8 mx-auto">
        {data.map((item) => (
          <Cards
            key={item.info.id}
            data={item.info}
            imageWidth={240}
            imageHeight={40}
            from={"online"}
          />
        ))}
      </div>
    </>
  );
});

export default OnlineDeliveryRestaurant;
