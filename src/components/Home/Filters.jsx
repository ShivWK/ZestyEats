import { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { setVegOption, setNonVegOption } from "../../features/home/restaurantsSlice";
import VegSvg from "../../utils/VegSvg";
import NonVegSvg from "../../utils/NonVegSvg";

const FilterButton = ({ applied, Icon, text, handler, bgColor }) => {
  return (
    <div
      onClick={handler}
      className={`flex justify-between gap-2 px-3 py-1.5 items-center text-sm font-medium text-gray-900 text-green rounded-3xl w-fit border-[1px] ${!applied ? "bg-white text-gray-800" : bgColor === "green" ? "bg-green-500 text-white border-green-500" : "bg-red-400 text-white border-red-400"} border-gray-400 transform cursor-pointer transition-["width", "transform"] duration-150 ease-linear active:scale-95`}
    >
      <Icon veg={applied} nonVeg={applied} />
      <p className="select-none">{text}</p>
      {applied && <i className="ri-close-large-fill rounded-[50%]"></i>}
    </div>
  );
};

const Filter = memo(({ text1 = "Pure Veg", text2 = "Veg & Non-Veg" }) => {
  const [veg, setVeg] = useState(false); 
  const [nonVeg, setNonVeg] = useState(false); 

  const dispatch = useDispatch()

  const vegHandler = () => {
    dispatch(setVegOption(!veg)); 
    setVeg(!veg); // false
    setNonVeg(false)
    console.log()
  }

  const nonVegHandler = () => {
    dispatch(setNonVegOption(!nonVeg));
    setNonVeg(!nonVeg);
    setVeg(false);
  }

  return (
    <div className="flex gap-2.5 mt-4 w-full">
      <FilterButton applied={veg} handler={vegHandler} Icon={VegSvg} text={text1} bgColor="green" />
      <FilterButton applied={nonVeg} handler={nonVegHandler} Icon={NonVegSvg} text={text2} bgColor="red" />
    </div>)
})

export default Filter;
