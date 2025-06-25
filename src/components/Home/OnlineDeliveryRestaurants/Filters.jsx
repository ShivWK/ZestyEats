import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVegVariant, setVegOption, setNonVegOption } from "../../../features/home/restaurantsSlice";
import VegSvg from "../../../utils/VegSvg";
import NonVegSvg from "../../../utils/NonVegSvg";


const FilterButton = ({ applied, Icon, text, handler }) => {
  return (
    <div
      onClick={handler}
      className={`flex justify-between gap-2 px-3 h-10 items-center text-sm font-medium text-gray-900 rounded-3xl w-fit border-2 ${!applied ? "bg-gray-200" : "bg-white"
        } border-gray-300 cursor-pointer hover:bg-gray-200`}
    >
      <Icon />
      <p>{text}</p>
      {!applied && <i className="ri-close-large-fill rounded-[50%]"></i>}
    </div>
  );
};

const Filter = () => {
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);
  const [ veg, setVeg ] = useState(vegOption);
  const [ nonVeg, setNonVeg] = useState(nonVegOption);

  const dispatch = useDispatch()

  const vegHandler = () => {
    const newValue = !veg;
    setVeg(newValue);
    dispatch(setVegOption(newValue));
  }

  const nonVegHandler = () => {
    const newValue = !nonVeg;
    setNonVeg(newValue);
    dispatch(setNonVegOption(newValue));
  }

  return (
    <div className="flex gap-2.5 mt-4 w-full">
      <FilterButton applied={veg} handler={vegHandler} Icon={VegSvg} text="Pure Veg" />
      <FilterButton applied={nonVeg} handler={nonVegHandler} Icon={NonVegSvg} text="Veg & Non-Veg" />
    </div>)
}


export default Filter;
