import { NavLink } from "react-router-dom";
import { useLazyGetDataForCityLocalityCuisineQuery } from "../../features/cityHome/cityHomeApiSlice";
import { setCityPageLoading } from "../../features/cityHome/cityHomeSlice";
import updateCityHomeData from "../../utils/updateCityHomeData";
import { useDispatch, useSelector } from "react-redux";
import { selectCity } from "../../features/home/homeSlice";

const PlaceCards = ({ data, clickHandler, path}) => {
    const [trigger] = useLazyGetDataForCityLocalityCuisineQuery();
    const dispatch = useDispatch();
    const city = useSelector(selectCity);

    const navPath = path || `cityPAge/${city}`;

    const handleNavClick = () => {
        clickHandler(data, trigger, setCityPageLoading, updateCityHomeData, dispatch)
    }
    
    return <NavLink to={navPath} onClick={handleNavClick} className="flex justify-center items-center text-center flex-wrap border-[1px] border-gray-400 w-[48%] md:w-56 px-5 box-border h-16 py-2 rounded-2xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-100 ease-in active:bg-gray-300">
        <p className="font-medium text-gray-900  line-clamp-2">{data.text}</p>
    </NavLink>
}

export default PlaceCards;