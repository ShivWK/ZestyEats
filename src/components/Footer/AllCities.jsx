import { NavLink } from "react-router-dom";
import { selectAvailableCities } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import { memo } from "react";

const AllCities = memo(() => {
  const cities = useSelector(selectAvailableCities);
  const citiesToPrint = cities.slice(6);
  const dispatch = useDispatch();

  return (
    <div className="w-full md:max-w-[1210px] max-md:px-1.5 ">
      <hr className="md:mt-13 md:mb-10 my-7 text-gray-800" />
      <div className="w-full flex justify-center mb-4 md:mb-10 max-md:px-2">
        <ul className="columns-2 md:columns-5 gap-7 w-fit">
          {citiesToPrint.map((city) => {
            const path = city.text.toLowerCase().replace(/\s/g, "-");

            return <li key={city.link} className="mb-2">
              <NavLink to={`/cityPage?city=${path}`} onClick={() => {dispatch(setSecondaryCity(city.text))}}>{city.text}</NavLink>
            </li>;
          })}
        </ul>
      </div>
    </div>
  );
});

export default AllCities;

// dispatch(setCity(city.text)
