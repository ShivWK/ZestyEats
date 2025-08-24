import { memo } from "react";
import Cards from "./Cards";
import HorizontalCarousel from "../../HorizontalCarousel";
import { selectUserDetails } from "../../../features/home/homeSlice";
import { useSelector } from "react-redux";

const FoodieThoughts = memo(({ data }) => {
  let { userName } = useSelector(selectUserDetails);
  const title = userName ? `${userName?.split(" ")[0]}, what's on your mind?` : "What's on your mind?";

  return (
    <HorizontalCarousel
      heading={title}
      dataToMap={data}
      Card={Cards}
      autoScrollWidth="200"
      scrollMargin="10"
      margin_bottom="-15px"
    />
  );
});

export default FoodieThoughts;