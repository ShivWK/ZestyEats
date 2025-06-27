import { NavLink } from "react-router-dom";
import { selectAvailableCities } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCityPageLoading, setSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import { useLazyGetDataForCityLocalityCuisineQuery } from "../../features/cityHome/cityHomeApiSlice";
import { memo } from "react";
import updateCityHomeData from "../../utils/updateCityHomeData";

const AllCities = memo(() => {
  const cities = useSelector(selectAvailableCities);
  const [ trigger ] = useLazyGetDataForCityLocalityCuisineQuery();
  const citiesToPrint = cities.slice(6);
  const dispatch = useDispatch();

  const clickHandler = async (city, cityPath) => {
    console.log("Hit")
    dispatch(setSecondaryCity(city));
    dispatch(setCityPageLoading(true));

    try {
      const data = await trigger({city: cityPath}).unwrap();
      updateCityHomeData(data, dispatch);
    } catch (err) {
      console.log("Cant fetch city data", err);
      dispatch(setCityPageLoading(false));
      throw new Error("Cant fetch city data");
    }
  }

  return (
    <div className="w-full md:max-w-[1210px] max-md:px-1.5 ">
      <hr className="md:mt-13 md:mb-10 my-7 text-gray-800" />
      <div className="w-full flex justify-center mb-4 md:mb-10 max-md:px-2">
        <ul className="columns-2 md:columns-5 gap-7 w-fit">
          {citiesToPrint.map((city) => {
            const path = city.text.toLowerCase().replace(/\s/g, "-");

            return <li key={city.link} className="mb-2">
              <NavLink to={`/cityPage/${city?.text}?mode=city`} onClick={() => clickHandler(city?.text, path)}>{city.text}</NavLink>
            </li>;
          })}
        </ul>
      </div>
    </div>
  );
});

export default AllCities;

// dispatch(setCity(city.text)
