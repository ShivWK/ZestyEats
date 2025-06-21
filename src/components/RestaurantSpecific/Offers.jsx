import OfferCard from "./OfferCard";
import HorizontalCarousel from "../HorizontalCarousel";

const Offers = ({ data }) => {
  const mainData = data?.card?.card?.gridElements?.infoWithStyle?.offers || [];
  const dataToMap = mainData.map((item) => {
    return {
      ...item?.info,
      id: item?.info?.couponCode,
    };
  });

  return (
    <HorizontalCarousel
      heading="Deals for you"
      margin_bottom="18px"
      scrollMargin="25"
      dataToMap={dataToMap}
      Card={OfferCard}
    />
  );
};

export default Offers;
