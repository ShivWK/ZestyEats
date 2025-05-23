import { useState } from "react";
import Cards from "./Cards";
import { useSelector } from "react-redux";
import { selectFoodieThoughtsData } from "../../../features/home/homeSlice";
import HorizontalCarousel from "../../HorizontalCarousel";

const FoodieThoughts = () => {
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const [user, setUser] = useState("Shivendra");
  const title = user ? `${user}, what's on your mind?` : "What's on your mind?";

  return (
    <HorizontalCarousel
      heading={title}
      dataToMap={foodieThoughtsData}
      Card={Cards}
    />
  );
};

export default FoodieThoughts;
