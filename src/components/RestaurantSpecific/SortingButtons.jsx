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
        className="border font-medium border-gray-300 rounded-md px-3 py-1 cursor-pointer active:scale-95"
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
        Veg
      </button>
      <button
        className="border font-medium border-gray-300 rounded-md px-3 py-1 cursor-pointer active:scale-95"
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
        Non Veg
      </button>
    </div>
  );
};

export default SortingButtons;
