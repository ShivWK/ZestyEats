// Done

import { Link } from 'react-router-dom';
import { selectAvailableCities } from '../../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCityPageLoading,
  setSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import { useLazyGetDataForCityLocalityCuisineQuery } from '../../features/cityHome/cityHomeApiSlice';
import updateCityHomeData from '../../utils/updateCityHomeData';

const AllCities = () => {
  // console.log("AllCities rendered");
  const cities = useSelector(selectAvailableCities);
  const [trigger] = useLazyGetDataForCityLocalityCuisineQuery();
  const citiesToPrint = cities.slice(6);
  const dispatch = useDispatch();

  const clickHandler = async (city, cityPath) => {
    dispatch(setSecondaryCity(city));
    dispatch(setCityPageLoading(true));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    try {
      const data = await trigger({ city: cityPath }).unwrap();
      updateCityHomeData(data, dispatch);
    } catch (err) {
      console.log('Cant fetch city data', err);
      dispatch(setCityPageLoading(false));
      throw new Error('Cant fetch city data');
    }
  };

  return (
    <div className="w-full max-md:px-1.5 md:max-w-[1210px]">
      <hr className="my-7 text-gray-800 md:mt-13 md:mb-10" />
      <div className="mb-4 flex w-full justify-center max-md:px-2 md:mb-10">
        <ul className="w-fit columns-2 gap-7 md:columns-5">
          {citiesToPrint.map((city) => {
            const path = city.text.toLowerCase().replace(/\s/g, '-');

            return (
              <li key={city.link} className="mb-2">
                <Link
                  className="dark:text-gray-200"
                  to={`/cityPage/${city?.text}?mode=city`}
                  onClick={() => clickHandler(city?.text, path)}
                >
                  {city.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AllCities;
