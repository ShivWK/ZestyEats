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
        className="flex gap-2 items-center border font-medium border-gray-400 rounded-full px-3 py-1 md:px-4 md:py-2 cursor-pointer active:scale-95"
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
        <svg
            width="16"
            height="16"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke={!veg ? "green" : "white"}
              strokeWidth="8"
            />
            <circle cx="50" cy="50" r="25" fill={!veg ? "green" : "white"} />
          </svg>
        <span>Veg</span>
        {veg && (<i className="ri-close-large-fill font-semibold"></i>)}
      </button>
      <button
        className="flex gap-2 items-center border font-medium border-gray-400 rounded-full px-3 py-1 md:px-4 md:py-2 cursor-pointer active:scale-95"
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
        <svg
          width="16"
          height="16"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            fill="none"
            stroke={!nonVeg ? "red" : "white"}
            strokeWidth="8"
          />
          <polygon points="50,20 78.86,70 21.14,70" fill={!nonVeg ? "red" : "white"} />
        </svg>
        <span>Non Veg</span>
        {nonVeg && (<i className="ri-close-large-fill font-semibold"></i>)}
      </button>
    </div>
  );
};

export default SortingButtons;
