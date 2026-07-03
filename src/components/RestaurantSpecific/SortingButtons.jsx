import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setVegOption,
  setNonVegOption,
  selectVegVariant,
} from '../../features/home/restaurantsSlice';
import VegSvg from '../../utils/VegSvg';
import NonVegSvg from '../../utils/NonVegSvg';

const SortingButtons = () => {
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const dispatch = useDispatch();
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  return (
    <div className="mt-2 flex w-full max-w-[775px] items-center gap-3">
      <button
        className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-400 px-3 py-1 font-medium active:scale-95 md:px-4 md:py-1.5"
        style={{
          backgroundColor: veg ? '#05df72' : '#ffffff',
          color: veg ? '#ffffff' : '#000000',
          transition: 'background-color 0.3s, color 0.3s',
        }}
        onClick={() => {
          dispatch(setVegOption(!veg));
          setVeg(!veg);
          setNonVeg(false);
        }}
      >
        <VegSvg veg={veg} />
        <span>Veg</span>
        {veg && <i className="ri-close-large-fill font-semibold"></i>}
      </button>
      <button
        className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-400 px-3 py-1 font-medium active:scale-95 md:px-4 md:py-1.5"
        style={{
          backgroundColor: nonVeg ? 'oklch(0.704 0.191 22.216' : '#ffffff',
          color: nonVeg ? '#ffffff' : '#000000',
          transition: 'all 0.3s, color 0.3s',
        }}
        onClick={() => {
          dispatch(setNonVegOption(!nonVeg));
          setNonVeg(!nonVeg);
          setVeg(false);
        }}
      >
        <NonVegSvg nonVeg={nonVeg} />
        <span>Non Veg</span>
        {nonVeg && <i className="ri-close-large-fill font-semibold"></i>}
      </button>
    </div>
  );
};

export default SortingButtons;
