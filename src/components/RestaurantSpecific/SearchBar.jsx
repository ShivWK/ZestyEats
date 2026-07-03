import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const SearchBar = memo(({ lat, lng, restaurant_Id, name }) => {
  return (
    <div className="mt-2 flex w-full flex-col items-center gap-6">
      <div className="flex w-fit items-center gap-1.5">
        <i className="fa-solid fa-utensils text-sm"></i>
        <p className="font-bold tracking-wider text-gray-500">MENU</p>
        <i className="fa-solid fa-utensils text-sm"></i>
      </div>

      <NavLink
        to={`/dishSearch?lat=${lat}&lng=${lng}&restaurantId=${restaurant_Id}&title=${name}`}
        className="relative flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-200 py-3"
      >
        <p className="font-semibold text-gray-700">Search for dishes...</p>
        <i className="fa-solid fa-magnifying-glass absolute right-3 text-xl text-gray-500"></i>
      </NavLink>
    </div>
  );
});

export default SearchBar;

// URL to search in the particular restaurant's dishes: https://www.swiggy.com/dapi/menu/pl/search?lat=28.7040592&lng=${lng}&restaurantId=${restro_Id}&isMenuUx4=true&query=${searchTerm}&submitAction=ENTER
