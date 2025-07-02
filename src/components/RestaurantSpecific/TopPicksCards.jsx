import TopPicksCard from "./TopPicksCard";
import HorizontalCarousel from "../HorizontalCarousel";
import { memo, useMemo } from "react";

const TopPicksCards = memo(({ data, restaurantData}) => {
  const mainData = data?.card?.card?.carousel;
  const cardsData = useMemo(
    () => mainData?.map((item , index) => {
      return {
        ...item?.dish?.info,
        creativeId: mainData[index]?.creativeId
      }
    } ),
    [mainData]
  );

  return (
    <HorizontalCarousel
      heading="Top Picks"
      dataToMap={cardsData}
      Card={TopPicksCard}
      scrollMargin="-5"
      restaurantData={restaurantData}
    />
  );
});

export default TopPicksCards;
