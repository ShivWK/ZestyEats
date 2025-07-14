import { useState, memo } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../features/home/homeSlice";
import { useLocation } from "react-router-dom";
import SubFooter from "./SubFooter";
import AllCities from "./AllCities";

const PageFooter = memo(() => {
  const isLoading = useSelector(selectIsLoading);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  if (
    pathname === "/" ||
    pathname.includes("/cityPage") ||
    pathname.includes("/cityCuisines") ||
    pathname.includes("/cityRestaurant") ||
    pathname.includes("cityLocality") ||
    pathname.includes("cityDishes")
  ) {
    return (
      !isLoading && (
        <footer className="pt-0.5 md:pt-2.5 pb-20 w-full flex flex-col justify-start items-center bg-gray-200">
          <SubFooter isOpen={isOpen} openCities={setIsOpen} />
          {isOpen && <AllCities />}
          <diV className="rounded-md bg-red-200 p-2 mx-auto w-full md:max-w-[1210px] max-md:mx-2">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-triangle-exclamation text-xl text-red-500"></i>
              <p className="text-justify text-xl font-semibold">Educational Use Disclaimer</p>
            </div>
            <p>This project is for learning and demo purposes only. It does not represent or affiliate with any real-world brand. No commercial use intended. If you have concerns, please contact for prompt removal.</p>
          </diV>
        </footer>
      )
    );
  }

  return null;
});

export default PageFooter;
