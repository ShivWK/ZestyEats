import { selectSearchedCity, selectYourCurrentCity } from "../features/home/homeSlice"
import { useSelector } from "react-redux";
import Breadcrumbs from "./Breadcrumbs";

const BreadcrumbsWrapper = ({ normalTextColor, mainTextColor, delimiterColor}) => {
    const currentCity = useSelector(selectYourCurrentCity);
    const searchedCity = useSelector(selectSearchedCity);

    return (
        <div className={`flex gap-1 items-center ${delimiterColor} text-xs font-semibold`}>
            <p className="select-none font-bold">{`${currentCity || searchedCity}`}</p>
            <span>┃</span>
            <Breadcrumbs textColor={normalTextColor} mainTextColor={mainTextColor}/>
        </div>
    )
}

export default BreadcrumbsWrapper;

