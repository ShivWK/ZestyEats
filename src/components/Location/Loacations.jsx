import { useDispatch, useSelector } from "react-redux";
import { removeARecentLocation } from "../../features/home/homeSlice";
import { useCallback } from "react";

const Location = ({ index = null, icon, item, handleClick }) => {;
  const dispatch = useDispatch();

  const handleCrossClick = useCallback((e) => {
    e.stopPropagation();
    dispatch(removeARecentLocation(index));

    const recentLocation = JSON.parse(localStorage.getItem("recentLocations"));

    if (recentLocation.length !== 0) {
      recentLocation.splice(index, 1);
    }

    localStorage.setItem("recentLocations", JSON.stringify(recentLocation));
  }, [index, dispatch, removeARecentLocation]);

  return (
    <div
      onClick={() => {
        handleClick(item);
      }}
      className="group cursor-pointer not-last:border-b-[1px] border-gray-400 py-2  md:py-4 md:px-7 mt-3 w-full"
    >
      <div className="flex gap-2.5 relative w-full">
        <i className={`${icon} text-xl text-gray-500 dark:text-gray-300`}></i>
        <div className="w-full">
          <p className="font-medium w-[90%] group-hover:text-primary group-active:text-primary line-clamp-2 break-words leading-5 dark:text-gray-300">
            {item?.terms?.[0]?.value}
          </p>
          <p className="text-sm font-medium tracking-wide dark:text-gray-400 text-gray-500 truncate w-[88%]">
            {item?.terms?.[1]?.value}{item?.terms?.[2]?.value ? (", " + item?.terms?.[2]?.value + ".") : "."}
          </p>
        </div>
        {index !== null && (
          <button
            className="absolute cursor-pointer right-0"
            onClick={handleCrossClick}
          >
            <i
              className={`ri-close-large-fill p-1 dark:text-gray-300 text-gray-500 hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.09)] rounded-[50%] transition-all duration-150 ease-in-out`}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Location;

// <i class="ri-map-pin-line"></i>
