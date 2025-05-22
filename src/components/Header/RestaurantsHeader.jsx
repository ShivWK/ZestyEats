import MainHeader from "./MainHeader";
import HeaderWrapper from "./HeaderWrapper";
import { selectCurrentRestaurant } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const RestaurantsHeader = () => {
    const currentRestaurant = useSelector(selectCurrentRestaurant); 

    return <HeaderWrapper>
        <MainHeader searchPlaceholder={currentRestaurant} />
    </HeaderWrapper>
}

export default RestaurantsHeader;