import OfferCard from "./OfferCard";
import HorizontalCarousel from "../HorizontalCarousel";

const Offers = ({ data }) => {
    const mainData = data?.card?.card?.gridElements?.infoWithStyle?.offers;

    return (
        <div>
            {mainData?.map(({ info }) => (
                <OfferCard key={info?.couponCode} data={info} />
            ))}
        </div>
    );
}

export default Offers;