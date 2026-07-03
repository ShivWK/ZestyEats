import { useDispatch } from 'react-redux';
import { removeARecentLocation } from '../../features/home/homeSlice';
import { useCallback } from 'react';

const Location = ({ index = null, icon, item, handleClick }) => {
  // console.log("location/Locations rendered");
  const dispatch = useDispatch();

  const handleCrossClick = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(removeARecentLocation(index));

      const recentLocation = JSON.parse(
        localStorage.getItem('recentLocations'),
      );

      if (recentLocation.length !== 0) {
        recentLocation.splice(index, 1);
      }

      localStorage.setItem('recentLocations', JSON.stringify(recentLocation));
    },
    [index, dispatch],
  );

  return (
    <div
      onClick={() => handleClick(item)}
      className="group mt-3 w-full cursor-pointer border-gray-400 py-2 not-last:border-b-[1px] md:px-7 md:py-4"
    >
      <div className="relative flex w-full gap-2.5">
        <i className={`${icon} text-xl text-gray-500 dark:text-gray-300`}></i>
        <div className="w-full">
          <p className="group-hover:text-primary group-active:text-primary line-clamp-2 w-[90%] leading-5 font-medium break-words dark:text-gray-300">
            {item?.terms?.[0]?.value}
          </p>
          <p className="w-[88%] truncate text-sm font-medium tracking-wide text-gray-500 dark:text-gray-400">
            {item?.terms?.[1]?.value}
            {item?.terms?.[2]?.value
              ? ', ' + item?.terms?.[2]?.value + '.'
              : '.'}
          </p>
        </div>
        {index !== null && (
          <button
            className="absolute right-0 cursor-pointer"
            onClick={handleCrossClick}
          >
            <i
              className={`ri-close-large-fill rounded-[50%] p-1 text-gray-500 transition-all duration-150 ease-in-out hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.09)] dark:text-gray-300`}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Location;
