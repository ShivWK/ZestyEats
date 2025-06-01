import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import {
  setVegOption,
  setNonVegOption,
    selectVegOption,
    selectNonVegOption,
} from "../../features/home/restaurantsSlice";

const SortingButtons = () => {
    const [veg, setVeg] = useState(false);
    const [nonVeg, setNonVeg] = useState(false);
  const dispatch = useDispatch();
  const vegOption = useSelector(selectVegOption);
  const nonVegOption = useSelector(selectNonVegOption);

  return (
    <div className="w-full max-w-[775px] mt-2 flex gap-3 items-center">
      <button
        className="flex gap-1.5 items-center border font-medium border-gray-400 rounded-md px-3 py-1 cursor-pointer active:scale-95"
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
        <span>Veg</span>
        {veg && (<i className="ri-close-large-fill font-semibold"></i>)}
      </button>
      <button
        className="flex gap-1.5 items-center border font-medium border-gray-400 rounded-md px-3 py-1 cursor-pointer active:scale-95"
        style={{
          backgroundColor: nonVeg ? "#fb2c36" : "#ffffff",
          color: nonVeg ? "#ffffff" : "#000000",
          transition: "background-color 0.3s, color 0.3s",
        }}
        onClick={() => {
          dispatch(setNonVegOption(!nonVeg));
          setNonVeg(!nonVeg);
          setVeg(false);
        }}
      >
        <span>Non Veg</span>
        {nonVeg && (<i className="ri-close-large-fill font-semibold"></i>)}
      </button>
    </div>
  );
};

export default SortingButtons;
