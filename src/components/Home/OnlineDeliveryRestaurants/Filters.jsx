import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVegVariant, setVegOption, setNonVegOption } from "../../../features/home/restaurantsSlice";
import VegSvg from "../../../utils/VegSvg";
import NonVegSvg from "../../../utils/NonVegSvg";


const FilterButton = ({ applied, Icon, text, handler, bgColor }) => {
  return (
    <div
      onClick={handler}
      className={`flex justify-between gap-2 px-3 py-2 items-center text-sm font-medium text-gray-900 text-green rounded-3xl w-fit border-2 ${applied ?  "bg-white text-gray-800" : bgColor === "green" ? "bg-green-400 text-white" : "bg-red-400 text-white" } border-gray-300 transform cursor-pointer transition-["width", "transform"] duration-150 ease-linear active:scale-95`}
    >
      <Icon veg={!applied} nonVeg={!applied} />
      <p className="select-none">{text}</p>
      {!applied && <i className="ri-close-large-fill rounded-[50%]"></i>}
    </div>
  );
};

const Filter = memo(({ text1 = "Pure Veg", text2 = "Veg & Non-Veg"}) => {
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);
  const [ veg, setVeg ] = useState(vegOption);
  const [ nonVeg, setNonVeg] = useState(nonVegOption);

  const dispatch = useDispatch()

  const vegHandler = () => {
    setVeg(prv => !prv);
    dispatch(setVegOption(veg));
  }

  const nonVegHandler = () => {
    setNonVeg(prv => !prv);
    dispatch(setNonVegOption(nonVeg));
  }

  return (
    <div className="flex gap-2.5 mt-4 w-full">
      <FilterButton applied={veg} handler={vegHandler} Icon={VegSvg} text={text1} bgColor="green" />
      <FilterButton applied={nonVeg} handler={nonVegHandler} Icon={NonVegSvg} text={text2} bgColor="red" />
    </div>)
})


export default Filter;
