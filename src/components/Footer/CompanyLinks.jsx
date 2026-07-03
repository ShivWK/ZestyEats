// Done

import {
  setCityPageLoading,
  setSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import { useLazyGetDataForCityLocalityCuisineQuery } from '../../features/cityHome/cityHomeApiSlice';
import { selectAvailableCities } from '../../features/home/homeSlice';
import updateCityHomeData from '../../utils/updateCityHomeData';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { LEGAL_LINKS } from '../../utils/constants';

const CompanyLinks = ({ isOpen, openCities }) => {
  // console.log("Company links rendered");
  const [trigger] = useLazyGetDataForCityLocalityCuisineQuery();
  const pathname = useLocation().pathname;
  const cities = useSelector(selectAvailableCities);
  const first6Cities = cities.slice(0, 6);
  const remainingCities = cities.length - 6;
  const dispatch = useDispatch();
  const [isSmall, setIsSmall] = useState(true);

  useEffect(() => {
    const handelResize = () => {
      if (window.innerWidth <= 768) {
        setIsSmall(true);
      } else {
        setIsSmall(false);
      }
    };
    handelResize();

    window.addEventListener('resize', handelResize);
    return () => window.removeEventListener('resize', handelResize);
  }, []);

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
    <div className="flex gap-8 max-md:mt-3 max-md:px-1 md:gap-20">
      <div id="Available_in">
        <p className="mb-3 text-lg font-semibold text-black dark:text-white">
          Available In:
        </p>
        <ul className="list-none font-normal text-gray-900">
          {first6Cities.map((city) => {
            const path = city.text.toLowerCase().replace(/\s/g, '-');

            return (
              <li key={city.link} className="mb-3">
                <Link
                  to={`cityPage/${city?.text}?mode=city`}
                  onClick={() => clickHandler(city?.text, path)}
                >
                  <p className="dark:text-gray-200">{city.text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
        {pathname !== '/' && (
          <div
            onClick={() => openCities(!isOpen)}
            id="moreCities"
            className={`group linear flex w-fit cursor-pointer items-center gap-2.5 rounded border-2 border-gray-500 px-2 py-1 transition-all duration-300 hover:bg-gray-200 ${isOpen ? 'border-black dark:border-gray-200' : 'border-[#99a1af] dark:border-gray-500'}`}
          >
            <p className="text-lg font-normal whitespace-nowrap text-gray-900 md:text-sm dark:text-gray-200 dark:group-hover:text-black">
              {remainingCities} cities
            </p>
            <i
              className="fa-solid fa-caret-down linear text-gray-900 transition-all duration-300 dark:text-gray-200 dark:group-hover:text-black"
              style={{
                transform: isOpen ? 'rotate(-180deg)' : '',
              }}
            ></i>
          </div>
        )}
      </div>

      <div id="legal">
        <p className="mb-3 text-lg font-semibold text-black dark:text-white">
          Legal
        </p>
        <ul className="list-none font-normal text-gray-900">
          {LEGAL_LINKS.map((data, index) => (
            <li key={index} className="mb-3">
              <Link to={data.linkPath} className="dark:text-gray-200">
                {data.term}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div id="Contact">
        <p className="mb-3 text-lg font-semibold text-black dark:text-white">
          Contact us
        </p>
        <ul className="list-none font-normal text-gray-900">
          <li className="mb-3">
            <Link
              to={isSmall ? '/support?mode=help' : '/help'}
              className="dark:text-gray-200"
            >
              Help & Support
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyLinks;
