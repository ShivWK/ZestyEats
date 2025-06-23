import { NavLink } from "react-router-dom";
import { selectAvailableCities } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import { memo } from "react";

const AllCities = memo(() => {
  const cities = useSelector(selectAvailableCities);
  const citiesToPrint = cities.slice(6);

  return (
    <div className="w-full md:max-w-[1210px] max-md:px-1.5 ">
      <hr className="mt-13 mb-10 text-gray-800" />
      <div className="w-full flex justify-center mb-10">
        <ul className="columns-2 md:columns-5 gap-7 w-fit">
          {citiesToPrint.map((city) => (
            <li key={city.link} className="mb-2">
              <NavLink>{city.text}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default AllCities;
