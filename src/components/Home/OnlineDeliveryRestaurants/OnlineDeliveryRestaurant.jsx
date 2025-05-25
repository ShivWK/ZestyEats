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
          <Filter
            fixed={true}
            icon="ri-equalizer-fill"
            count={1}
            text="Filter"
          />
          <Filter fixed={true} icon="fa-solid fa-caret-down" text="Sort By" />
          <Filter applied={true} text="Pure Veg" />
          <Filter applied={false} text="Ratings 4.0+" />
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
