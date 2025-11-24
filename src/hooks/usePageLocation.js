import { useSelector } from "react-redux";
import { selectLatAndLng } from "../features/home/homeSlice";
import { selectCityLatAndLng, selectLocalityLatAndLng } from "../features/cityHome/cityHomeSlice";

const usePageLocation = (pathname) => {
    let latAndLngSelector = selectLatAndLng;
    let mode = "homePage";

    if (
        pathname.includes("/cityPage") || 
        pathname.includes("/cityRestaurant") || 
        pathname.includes("/cityCuisines")
    ) {
        latAndLngSelector = selectCityLatAndLng;
        mode = "cityPage"
    } else if (pathname.includes("cityLocality")) {
        latAndLngSelector = selectLocalityLatAndLng;
        mode = "cityPage"
    }

    const { lat, lng } = useSelector(latAndLngSelector);

    return { lat, lng, mode }
}

export default usePageLocation;