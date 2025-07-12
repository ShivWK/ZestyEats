import { useSelector } from "react-redux";
import Cards from "./Cards";
import Filter from "./Filters";
import { selectCity } from "../../features/home/homeSlice";
import { selectSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import { selectVegVariant } from "../../features/home/restaurantsSlice";
import { memo } from "react";
import { useLocation } from "react-router-dom";

const OnlineDeliveryRestaurant = memo(({ data, heading = null }) => {
  const pathname = useLocation().pathname;
  let defaultHeading = "Restaurants with online food delivery";

  // if (!heading) {
  //   if (pathname.includes("cityPage")) {
  //     const secondaryCity = useSelector(selectSecondaryCity);
  //     const cityToPrint = secondaryCity[0].toUpperCase() + secondaryCity.slice(1);

  //     defaultHeading = `Restaurants with online food delivery in ${cityToPrint}`;
  //   } else {
  //     const currentCity = useSelector(selectCity);
  //     const cityToPrint = currentCity[0].toUpperCase() + currentCity.slice(1);

  //     defaultHeading = `Restaurants with online food delivery in ${cityToPrint}`;
  //   }
  // }

  const title = heading || defaultHeading;
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  return (
    <>
      <div>
        <h3>{title}</h3>
        <Filter />
      </div>
      <div className="flex flex-wrap gap-y-7 gap-x-8 justify-start w-full mt-8 mx-auto max-md:pl-1">
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
