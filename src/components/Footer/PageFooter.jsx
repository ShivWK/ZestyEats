import { useState, memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../features/home/homeSlice";
import { useLocation } from "react-router-dom";
import SubFooter from "./SubFooter";
import AllCities from "./AllCities";
import Disclaimer from "./Disclaimer";

const PageFooter = memo(() => {
  const isLoading = useSelector(selectIsLoading);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  if (
    pathname === "/" ||
    pathname.includes("cityPage") ||
    pathname.includes("cityCuisines") ||
    pathname.includes("cityRestaurant") ||
    pathname.includes("cityLocality") ||
    pathname.includes("cityDishes") 
  ) {
    return (
      !isLoading && (
        <footer className="pt-0.5 md:pt-2.5 w-full flex flex-col justify-start items-center dark:bg-gray-800 bg-gray-200">
          <SubFooter isOpen={isOpen} openCities={setIsOpen} />
          {isOpen && <AllCities />}
          <Disclaimer />
        </footer>
      )
    );
  }

  return null;
});

export default PageFooter;
