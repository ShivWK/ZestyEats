import { NavLink } from "react-router-dom";
import { selectAvailableCities } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import { memo } from "react";

const CompanyLinks = memo(({ isOpen, openCities }) => {
  const cities = useSelector(selectAvailableCities);
  const first6Cities = cities.slice(0, 6);
  const remainingCities = cities.length - 6;

  return (
    <div className="flex gap-20">
      <div id="Available_in">
        <p className="font-medium text-lg text-black mb-3">Currently Serving In:</p>
        <ul className="list-none text-gray-900 font-normal">
          {first6Cities.map((city) => (
            <li key={city.link} className="mb-3">
              <NavLink>{city.text}</NavLink>
            </li>
          ))}
        </ul>
        {/* <div
          onClick={() => openCities(!isOpen)}
          id="moreCities"
          className="flex gap-2.5 cursor-pointer border-2 border-gray-500 px-2 py-1 rounded items-center transition-all duration-300 linear hover:bg-gray-100"
          style={{ borderColor: isOpen ? "black" : "#6a7282" }}
        >
          <p className="font-normal text-sm text-gray-900">
            {remainingCities} cities
          </p>
          <i
            className="fa-solid fa-caret-down text-gray-900 transition-all duration-300 linear"
            style={{
              transform: isOpen ? "rotate(-180deg)" : "",
            }}
          ></i>
        </div> */}
      </div>

      <div id="legal">
        <p className="font-medium text-lg text-black mb-3">Legal</p>
        <ul className="list-none text-gray-900 font-normal">
          <li className="mb-3">
            <NavLink>Terms & Conditions</NavLink>
          </li>
          <li className="mb-3">
            <NavLink>Privacy Policy</NavLink>
          </li>
          <li className="mb-3">
            <NavLink>Cookie Policy</NavLink>
          </li>
        </ul>
      </div>
      <div id="Contact">
        <p className="font-medium text-lg text-black mb-3">Contact us</p>
        <ul className="list-none text-gray-900 font-normal">
          <li className="mb-3">
            <NavLink to="/help">Help & Support</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default CompanyLinks;
