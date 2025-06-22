import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { setLocationModal, setLocationHovered, setHideLocation, setHideLogin } from "../../features/Login/loginSlice";

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

  const handleClick = () => {
    dispatch(setHideLocation(false));
    dispatch(setHideLogin(false))
    dispatch(setLocationModal(true));
  };

  const hoverHandler = () => {
    dispatch(setLocationHovered());
  }

  return (
    <div className="flex gap-6">
      <NavLink to="/" className="active:scale-95">
        <img src="/images/square.png" alt="Sie logo" height={52} width={54} className="hover:scale-[1.15] transition-all duration-300 ease-in-out rounded-md outline-none border-none" />
      </NavLink>

      {searchPlaceholder ? (
        <p className="flex items-center font-bold text-xl w-80"><span className="truncate">
          {searchPlaceholder}</span></p>
      ) : (
        <button
          onMouseEnter={hoverHandler}
          onClick={handleClick}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <span className="font-[750] underline underline-offset-8 decoration-2 group-hover:text-[#ff5200]">
            {yourCurrentCity ? yourCurrentCity : "Location"}
          </span>

          <span className="max-w-52 truncate text-start font-medium text-gray-600">
            {yourCurrentCity
              ? `${searchedCityAddress}`
              : `${searchedCity}${searchedCityAddress}`}
          </span>
          <i className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] -ml-2.5"></i>
        </button>
      )}
    </div>
  );
});

export default Logo;
