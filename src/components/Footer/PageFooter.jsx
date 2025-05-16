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
      <footer className="py-2.5 w-full flex justify-center items-start bg-gray-300">
        <SubFooter openCities={setIsOpen}/>
        {isOpen && <AllCities />}
      </footer>
    )
  );
}


// https://media-assets.swiggy.com/portal/testing/seo-home/Group.sv