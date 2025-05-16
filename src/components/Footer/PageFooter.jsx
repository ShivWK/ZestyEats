import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../features/home/homeSlice";
import SubFooter from "./SubFooter";
import AllCities from "./AllCities";

export default function PageFooter() {
  const isLoading = useSelector(selectIsLoading);
  const [isOpen, setIsOpen] = useState(false);

  return (
    !isLoading && (
      <footer className="py-2.5 pb-8 w-full flex flex-col justify-start items-center bg-gray-200">
        <SubFooter isOpen={isOpen} openCities={setIsOpen}/>
        {isOpen && <AllCities />}
      </footer>
    )
  );
}


// https://media-assets.swiggy.com/portal/testing/seo-home/Group.sv