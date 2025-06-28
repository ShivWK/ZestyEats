import { useSelector } from "react-redux";
import Cards from "./Cards";
import { selectTopRestaurantsTitle } from "../../features/home/homeSlice";
import HorizontalCarousel from "../HorizontalCarousel";
import { memo, useMemo } from "react";

const TopRestaurantChains = memo(({ data, heading = null }) => {
  const mainData = useMemo(() => data.map((item) => item?.info), [data]);
  const title = heading || useSelector(selectTopRestaurantsTitle);

  return (
    <HorizontalCarousel
      heading={title}
      margin_bottom={20 + "px"}
      dataToMap={mainData}
      Card={Cards}
      scrollMargin="20"
      autoScrollWidth="260"
    />
  );
});

export default TopRestaurantChains;
