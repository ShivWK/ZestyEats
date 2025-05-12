import { useSelector } from "react-redux";
import Cards from "./FoodieThoughts/Cards";
import { selectOnlineDeliveryRestaurants,
    selectOnlineDeliveryTitle
} from "../../features/home/homeSlice";

export default function OnlineDeliveryRestaurant() {
    const data = useSelector(selectOnlineDeliveryRestaurants);
    const title = useSelector(selectOnlineDeliveryTitle);
    // console.log(data);

    return <>
        <div>
            <h3>{title}</h3>
        </div>
        <div>

        </div>
    </>
}