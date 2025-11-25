// Done

import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import { selectTopRestaurantsTitle } from "../../features/home/homeSlice";
import HorizontalCarousel from "../HorizontalCarousel";
import { useMemo } from "react";

const TopRestaurantChains = ({ data, heading = null }) => {
  // console.log("TopRestaurantChains rendered")
  const mainData = useMemo(() => data.map((item) => item?.info), [data]);
  const default_heading = useSelector(selectTopRestaurantsTitle);
  const title = heading || default_heading;

  return (
    <HorizontalCarousel
      heading={title}
      margin_bottom={20 + "px"}
      dataToMap={mainData}
      Card={RestaurantCard}
      scrollMargin="20"
      autoScrollWidth="260"
    />
  );
};

export default TopRestaurantChains;
