// Done

import { Link } from 'react-router-dom';
import { useLazyGetDataForCityLocalityCuisineQuery } from '../../features/cityHome/cityHomeApiSlice';
import {
  setCityPageLoading,
  setSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import updateCityHomeData from '../../utils/updateCityHomeData';
import { useDispatch, useSelector } from 'react-redux';
import { selectCity } from '../../features/home/homeSlice';

const PlaceCards = ({
  data,
  clickHandler = () => {},
  path,
  targetedCity = null,
}) => {
  // console.log("PlaceCards rendered")
  const [trigger] = useLazyGetDataForCityLocalityCuisineQuery();
  const dispatch = useDispatch();
  const mainCity = useSelector(selectCity);
  const city = targetedCity ? targetedCity : mainCity;

  let navPath = null;

  if (path === 'DIY') {
    navPath = `/cityPage/${data?.text}`;
  } else if (path === 'SetCuisine') {
    const pathName = new URL(data.link).pathname;
    const cuisine = pathName.match(/\/(.*?)\/(.*?)\/(.*?)-cuisine-order/i)[3];
    navPath = `/cityCuisines/${city}?cuisine=${cuisine}`;
  } else if (path === 'SetRestaurant') {
    navPath = `/cityRestaurant/${city}?restaurant=${data?.text}`;
  } else if (path === 'SetLocality') {
    navPath = `/cityLocality/${city}/${data?.text}`;
  } else if (path === 'SetDish') {
    navPath = `/cityDishes/${city}/${data?.text}`;
  } else if (path) {
    navPath = path;
  } else {
    navPath = `cityPage/${city}`;
  }

  const handleNavClick = () => {
    clickHandler(
      data,
      trigger,
      setCityPageLoading,
      updateCityHomeData,
      dispatch,
      setSecondaryCity,
    );
  };

  return (
    <Link
      to={navPath}
      onClick={handleNavClick}
      className="box-border flex h-16 w-[48%] flex-wrap items-center justify-center rounded-2xl border-[1px] border-gray-300 px-5 py-2 text-center transition-all duration-100 ease-in hover:scale-[1.01] hover:shadow-2xl active:bg-gray-300 md:w-56 dark:border-gray-200 dark:shadow-gray-800"
    >
      <p className="line-clamp-2 tracking-wide text-gray-700 max-md:font-sans max-md:text-gray-600 md:font-medium dark:text-gray-400">
        {data.text}
      </p>
    </Link>
  );
};

export default PlaceCards;
