import {
  Link,
  useSearchParams,
  Outlet
} from "react-router-dom";

import { useRef, useState } from "react";;
import useScrollToTop from "../../utils/useScrollToTop";
import BackToTopBtn from "../BackToTopBtn";

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
    <div className="pb-16">
      <div className="sticky top-[159px] md:top-[180px] flex gap-3 py-3 w-full z-20 dark:bg-black bg-white">
        <Link
          to={restroPath}
          onClick={(e) => clickHandler(e, "Restaurant")}
          className={`py-1.5 font-bold px-4 rounded-3xl dark:hover:bg-gray-600 dark:hover:text-black hover:bg-gray-200 border-[1px] border-gray-400 cursor-pointer ${(currentType === "Restaurant" || currentType === "Cuisine") ? "bg-black dark:bg-white text-white dark:text-black" : "bg-white dark:bg-black text-black dark:text-white"}`}
        >
          Restaurant
        </Link>
        <Link
          to={dishPath}
          onClick={(e) => clickHandler(e, "Dish")}
          className={`py-1.5 font-bold px-4 rounded-3xl dark:hover:bg-gray-600 dark:hover:text-black  hover:bg-gray-200 border-[1px] border-gray-400 cursor-pointer ${(currentType === "Dish") ? "bg-black dark:bg-white text-white dark:text-black" : "bg-white dark:bg-black text-black dark:text-white"}`}
        >
          Dish
        </Link>
      </div>
      <Outlet />                          
      <BackToTopBtn percentage={30} />
    </div>
  );
};

export default SearchResult;
