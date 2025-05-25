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

  if (pathname === "/" || pathname === "/offers-dinouts") {
    return (
      !isLoading && (
        <footer className="py-2.5 pb-8 w-full flex flex-col justify-start items-center bg-gray-200">
          <SubFooter isOpen={isOpen} openCities={setIsOpen} />
          {isOpen && <AllCities />}
        </footer>
      )
    );
  }

  return null;
});

export default PageFooter;
