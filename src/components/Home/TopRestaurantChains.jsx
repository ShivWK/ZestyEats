import { selectTopRestaurantsData } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { selectTopRestaurantsTitle } from "../../features/home/homeSlice";
import HorizontalCarousel from "../HorizontalCarousel";

const TopRestaurantChains = () => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const mainData = topRestaurantsChainsData.map((item) => item?.info);
  const title = useSelector(selectTopRestaurantsTitle);

  return (
    <HorizontalCarousel
      heading={title}
      margin_bottom={20 + "px"}
      dataToMap={mainData}
      Card={Cards}
    />
  );
};

export default TopRestaurantChains;
