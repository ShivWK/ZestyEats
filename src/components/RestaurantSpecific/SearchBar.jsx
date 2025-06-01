import { NavLink } from "react-router-dom";

const SearchBar = ({ lat, lng, restro_Id }) => {
  return (
    <div className="flex flex-col gap-6 w-full mt-2 items-center">
      <div className="flex items-center gap-1.5 w-fit">
        <i className="fa-solid fa-utensils text-sm"></i>
        <p className="text-gray-500 tracking-wider font-bold">MENU</p>
        <i className="fa-solid fa-utensils text-sm"></i>
      </div>

      <NavLink className="flex relative py-3 items-center justify-center w-full bg-gray-200 rounded-md cursor-pointer">
        <p className="font-semibold text-gray-700">Search for dishes...</p>
        <i className="absolute right-3 fa-solid fa-magnifying-glass text-xl text-gray-500"></i>
      </NavLink>
    </div>
  );
};

export default SearchBar;

// URL to search in the particular restaurant's dishes: https://www.swiggy.com/dapi/menu/pl/search?lat=${lat}&lng=${lng}&restaurantId=${restro_Id}&isMenuUx4=true&query=${searchTerm}&submitAction=ENTER
