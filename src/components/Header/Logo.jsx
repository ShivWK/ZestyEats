// Done

import {
  setLocationModal,
  setHideLocation,
  setHideLogin,
} from '../../features/Login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';

import {
  selectSearchedCity,
  selectSearchedCityAddress,
  selectYourCurrentCity,
} from '../../features/home/homeSlice';
import { Link } from 'react-router-dom';

const Logo = ({ searchPlaceholder }) => {
  // console.log("Logo rendered");
  const dispatch = useDispatch();
  const yourCurrentCity = useSelector(selectYourCurrentCity);
  const searchedCity = useSelector(selectSearchedCity);
  const searchedCityAddress = useSelector(selectSearchedCityAddress);

  const handleClick = () => {
    dispatch(setHideLocation(false));
    dispatch(setHideLogin(false));
    dispatch(setLocationModal(true));
  };

  return (
    <div className="flex items-center gap-1.5 md:gap-6">
      <Link to="/" className={`shrink-0 active:scale-95`}>
        <img
          src="/images/square.png"
          alt="Sie logo"
          height={52}
          width={54}
          className="rounded-md border-none transition-all duration-200 ease-linear outline-none hover:scale-[1.12] max-lg:h-12 max-lg:w-12"
        />
      </Link>
      {searchPlaceholder ? (
        <p className="flex max-w-48 items-center truncate text-xl font-bold md:max-w-80">
          <span className="truncate">{searchPlaceholder}</span>
        </p>
      ) : (
        <button
          onClick={handleClick}
          className="group flex cursor-pointer items-center gap-2 border-none outline-none max-md:flex-col max-md:justify-center md:gap-2"
        >
          <span className="font-[750] underline decoration-2 underline-offset-5 group-hover:text-[#ff5200] max-md:self-start max-md:text-sm max-md:underline-offset-4">
            {yourCurrentCity ? yourCurrentCity : 'Location'}
          </span>

          <div className="flex items-center justify-center gap-1 max-md:-mt-1 md:gap-1">
            <span className="max-w-44 truncate text-start font-medium text-gray-600 max-md:text-sm md:max-w-[12.5rem] dark:text-gray-300">
              {yourCurrentCity
                ? `${searchedCityAddress}`
                : `${searchedCity}${searchedCityAddress}`}
            </span>
            <ChevronDown size={18} strokeWidth={4} className="text-[#ff5200]" />
          </div>
        </button>
      )}
    </div>
  );
};

export default Logo;
