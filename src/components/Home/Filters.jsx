// Done

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setVegOption,
  setNonVegOption,
} from '../../features/home/restaurantsSlice';
import VegSvg from '../../utils/VegSvg';
import NonVegSvg from '../../utils/NonVegSvg';

const FilterButton = ({ applied, icon, text, handler, bgColor }) => {
  return (
    <div
      onClick={handler}
      className={`text-green flex w-fit items-center justify-between gap-2 rounded-3xl border-[1px] px-3 py-1.5 text-sm font-medium text-gray-900 dark:border-2 ${!applied ? 'bg-white text-gray-800 dark:bg-gray-800/80 dark:text-gray-300' : bgColor === 'green' ? 'border-green-500 bg-green-500 text-white dark:bg-green-700' : 'border-red-600 bg-red-600 text-white dark:bg-red-800'} transition-["width", "transform"] transform cursor-pointer border-gray-400 duration-150 ease-linear active:scale-95`}
    >
      {icon === 'vegSvg' ? (
        <VegSvg veg={applied} />
      ) : (
        <NonVegSvg nonVeg={applied} />
      )}
      <p className="select-none">{text}</p>
      {applied && <i className="ri-close-large-fill rounded-[50%]"></i>}
    </div>
  );
};

const Filter = ({ text1 = 'Pure Veg', text2 = 'Veg & Non-Veg' }) => {
  // console.log("Filters rendered")
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const dispatch = useDispatch();

  const vegHandler = () => {
    dispatch(setVegOption(!veg));
    setVeg(!veg);
    setNonVeg(false);
    console.log();
  };

  const nonVegHandler = () => {
    dispatch(setNonVegOption(!nonVeg));
    setNonVeg(!nonVeg);
    setVeg(false);
  };

  return (
    <div className="mt-4 flex w-full gap-2.5">
      <FilterButton
        applied={veg}
        handler={vegHandler}
        icon="vegSvg"
        text={text1}
        bgColor="green"
      />
      <FilterButton
        applied={nonVeg}
        handler={nonVegHandler}
        icon="nonVegSvg"
        text={text2}
        bgColor="red"
      />
    </div>
  );
};

export default Filter;
