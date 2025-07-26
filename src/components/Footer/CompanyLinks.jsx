import { Link, useLocation } from "react-router-dom";
import { selectAvailableCities } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { memo, useEffect, useState } from "react";
import updateCityHomeData from "../../utils/updateCityHomeData";
import { setCityPageLoading, setSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import { useLazyGetDataForCityLocalityCuisineQuery } from "../../features/cityHome/cityHomeApiSlice";

const CompanyLinks = memo(({ isOpen, openCities }) => {
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
    }
    handelResize()

    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, [])

  const clickHandler = async (city, cityPath) => {
    dispatch(setSecondaryCity(city));
    dispatch(setCityPageLoading(true));

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

    try {
      const data = await trigger({ city: cityPath }).unwrap();
      updateCityHomeData(data, dispatch);
    } catch (err) {
      console.log("Cant fetch city data", err);
      dispatch(setCityPageLoading(false));
      throw new Error("Cant fetch city data");
    }
  }

  return (
    <div className="flex gap-8 md:gap-20 max-md:mt-3 max-md:px-1">
      <div id="Available_in" >
        <p className="font-semibold text-lg dark:text-white text-black mb-3">Available In:</p>
        <ul className="list-none text-gray-900 font-normal">
          {first6Cities.map((city) => {
            const path = city.text.toLowerCase().replace(/\s/g, "-");

            return <li key={city.link} className="mb-3">
              <Link to={`cityPage/${city?.text}?mode=city`} onClick={() => clickHandler(city?.text, path)}>
              <p className="dark:text-gray-200">{city.text}</p>
              </Link>
            </li>
          })}
        </ul>
        {pathname !== "/" && <div
          onClick={() => openCities(!isOpen)}
          id="moreCities"
          className={`group flex gap-2.5 cursor-pointer border-2 border-gray-500 px-2 py-1 rounded items-center transition-all duration-300 linear hover:bg-gray-200 w-fit ${isOpen ? "border-black dark:border-gray-200" : "border-[#99a1af] dark:border-gray-500"}`}
        >
          <p className="font-normal dark:group-hover:text-black text-lg md:text-sm text-gray-900 whitespace-nowrap dark:text-gray-200">
            {remainingCities} cities
          </p>
          <i
            className="fa-solid fa-caret-down dark:group-hover:text-black text-gray-900 transition-all duration-300 linear dark:text-gray-200"
            style={{
              transform: isOpen ? "rotate(-180deg)" : "",
            }}
          ></i>
        </div>}
      </div>

      <div id="legal">
        <p className="font-semibold text-lg text-black mb-3 dark:text-white">Legal</p>
        <ul className="list-none text-gray-900 font-normal">
          <li className="mb-3">
            <Link to={"/legalAndPolicies?mode=termsAndConditions"} className="dark:text-gray-200">Terms & Conditions</Link>
          </li>
          <li className="mb-3">
            <Link to={"/legalAndPolicies?mode=privacyPolicy"} className="dark:text-gray-200">Privacy Policy</Link>
          </li>
          <li className="mb-3">
            <Link to={"/legalAndPolicies?mode=cookiesPolicy"} className="dark:text-gray-200">Cookie Policy</Link>
          </li>
        </ul>
      </div>
      <div id="Contact">
        <p className="font-semibold text-lg text-black mb-3 dark:text-white">Contact us</p>
        <ul className="list-none text-gray-900 font-normal">
          <li className="mb-3">
            <Link to={isSmall ? "/support?mode=help" : "/help"} className="dark:text-gray-200">Help & Support</Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default CompanyLinks;
