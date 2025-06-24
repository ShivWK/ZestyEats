import { selectTopRestaurantsData } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { selectTopRestaurantsTitle } from "../../features/home/homeSlice";
import HorizontalCarousel from "../HorizontalCarousel";

const TopRestaurantChains = ({ data, heading = null }) => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const mainData = data.map((item) => item?.info);
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
};

export default TopRestaurantChains;
