import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { memo } from "react";
import { setLocationModal, setLocationHovered, setHideLocation, setHideLogin } from "../../features/Login/loginSlice";
import { ChevronDown } from "lucide-react";

import {
  selectSearchedCity,
  selectSearchedCityAddress,
  selectYourCurrentCity,
} from "../../features/home/homeSlice";
import { NavLink } from "react-router-dom";

const Logo = memo(({ searchPlaceholder }) => {
  const dispatch = useDispatch();
  const yourCurrentCity = useSelector(selectYourCurrentCity);
  const searchedCity = useSelector(selectSearchedCity);
  const searchedCityAddress = useSelector(selectSearchedCityAddress);
  const location = useLocation().pathname;

  const handleClick = () => {
    dispatch(setHideLocation(false));
    dispatch(setHideLogin(false))
    dispatch(setLocationModal(true));
  };

  const hoverHandler = () => {
    dispatch(setLocationHovered());
  }
  // 
  return (
    <div className="flex gap-1.5 md:gap-6 items-center">
      <NavLink to="/" className={`active:scale-95 shrink-0`}>
        <img src="/images/square.png" alt="Sie logo" height={52} width={54} className="hover:scale-[1.12] transition-all duration-200 ease-in-out max-lg:h-12 max-lg:w-12 rounded-md outline-none border-none " />
      </NavLink>

      {searchPlaceholder ? (
        <p className="flex items-center font-bold text-xl max-w-48 md:max-w-80 truncate"><span className="truncate">
          {searchPlaceholder}</span></p>
      ) : (
        <button
          onMouseEnter={hoverHandler}
          onClick={handleClick}
          className="group flex max-md:flex-col max-md:justify-center items-center gap-2 md:gap-2 cursor-pointer outline-none border-none"
        >
          <span className="font-[750] max-md:self-start max-md:text-sm underline underline-offset-5 max-md:underline-offset-4 decoration-2 group-hover:text-[#ff5200]">
            {yourCurrentCity ? yourCurrentCity : "Location"}
          </span>

          <div className="flex gap-1 md:gap-0.5 items-center justify-center max-md:-mt-1">
            <span className="max-w-44 md:max-w-48 truncate text-start font-medium text-gray-600 max-md:text-sm">
              {yourCurrentCity
                ? `${searchedCityAddress}`
                : `${searchedCity}${searchedCityAddress}`}
            </span>
            <ChevronDown size={18} strokeWidth={4} className="text-[#ff5200]"/>
          </div>
        </button>
      )}
    </div>
  );
});

export default Logo;
