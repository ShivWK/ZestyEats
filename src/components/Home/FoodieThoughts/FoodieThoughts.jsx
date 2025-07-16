import { memo, useState } from "react";
import Cards from "./Cards";
import HorizontalCarousel from "../../HorizontalCarousel";

const FoodieThoughts = memo(({ data }) => {
  const [user, setUser] = useState("Shivendra");
  const title = user ? `${user}, what's on your mind?` : "What's on your mind?";

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