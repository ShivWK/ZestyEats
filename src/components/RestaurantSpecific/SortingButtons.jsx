import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import {
  setVegOption,
  setNonVegOption,
  selectVegVariant
} from "../../features/home/restaurantsSlice";
import VegSvg from "../../utils/VegSvg";
import NonVegSvg from "../../utils/NonVegSvg";

const SortingButtons = () => {
    const [veg, setVeg] = useState(false);
    const [nonVeg, setNonVeg] = useState(false);
  const dispatch = useDispatch();
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  return (
    <div className="w-full max-w-[775px] mt-2 flex gap-3 items-center">
      <button
        className="flex gap-2 items-center border font-medium border-gray-400 rounded-full px-3 py-1 md:px-4 md:py-1.5 cursor-pointer active:scale-95"
        style={{
            backgroundColor: veg ? "#05df72" : "#ffffff",
            color: veg ? "#ffffff" : "#000000",
            transition: "background-color 0.3s, color 0.3s",
        }}
        onClick={() => {
          dispatch(setVegOption(!veg));
          setVeg(!veg);
          setNonVeg(false);
        }}
      >
        <VegSvg veg={veg} />
        <span>Veg</span>
        {veg && (<i className="ri-close-large-fill font-semibold"></i>)}
      </button>
      <button
        className="flex gap-2 items-center border font-medium border-gray-400 rounded-full px-3 py-1 md:px-4 md:py-1.5 cursor-pointer active:scale-95"
        style={{
          backgroundColor: nonVeg ? "oklch(0.704 0.191 22.216" : "#ffffff",
          color: nonVeg ? "#ffffff" : "#000000",
          transition: "all 0.3s, color 0.3s",
        }}
        onClick={() => {
          dispatch(setNonVegOption(!nonVeg));
          setNonVeg(!nonVeg);
          setVeg(false);
        }}
      >
        <NonVegSvg nonVeg={nonVeg} />
        <span>Non Veg</span>
        {nonVeg && (<i className="ri-close-large-fill font-semibold"></i>)}
      </button>
    </div>
  );
};

export default SortingButtons;
