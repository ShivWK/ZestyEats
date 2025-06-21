import {
  NavLink,
  useSearchParams,
  Outlet
} from "react-router-dom";

import { useRef, useState } from "react";;
import useScrollToTop from "../../utils/useScrollToTop";

const SearchResult = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const name = searchParams.get("name");

  const nameRef = useRef(name);

  const [currentType, setCurrentType] = useState(type);

  const clickHandler = (e, type) => {
    if (currentType !== type) {
      setCurrentType(type);

      if (type === currentType) {
        e.preventDefault();
      }
    }
  };

  const restroPath = `restaurantPage?lat=${lat}&lng=${lng}&str=${nameRef.current}&submitAction=ENTER&selectedPLTab=RESTAURANT&mode=tab`;
  const dishPath = `dishPage?lat=${lat}&lng=${lng}&str=${nameRef.current}&submitAction=STORED_SEARCH&selectedPLTab=DISH&mode=tab`;

  return (
    <div>
      <div className="flex gap-3 py-3 w-full fixed z-20 bg-white">
        <NavLink
          to={restroPath}
          onClick={(e) => clickHandler(e, "Restaurant")}
          className="py-1.5 font-bold px-4 rounded-3xl hover:bg-gray-200 border-[1px] border-gray-400 cursor-pointer"
          style={{
            backgroundColor: (currentType === "Restaurant" || currentType === "Cuisine") ? "black" : "white",
            color: (currentType === "Restaurant" || currentType === "Cuisine") ? "white" : "black",
          }}
        >
          Restaurant
        </NavLink>
        <NavLink
          to={dishPath}
          onClick={(e) => clickHandler(e, "Dish")}
          className="py-1.5 font-bold px-4 rounded-3xl hover:bg-gray-200 border-[1px] border-gray-400 cursor-pointer"
          style={{
            backgroundColor: currentType === "Dish" ? "black" : "white",
            color: currentType === "Dish" ? "white" : "black",
          }}
        >
          Dish
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default SearchResult;
