import { useDispatch } from "react-redux";
import { removeARecentLocation } from "../../features/home/homeSlice";

const Location = ({ index = null, icon, item, handleClick }) => {;
  const dispatch = useDispatch();

  const handleCrossClick = (e) => {
    e.stopPropagation();
    dispatch(removeARecentLocation(index));

    const recentLocation = JSON.parse(localStorage.getItem("recentLocations"));

    if (recentLocation.length !== 0) {
      recentLocation.splice(index, 1);
    }

    localStorage.setItem("recentLocations", JSON.stringify(recentLocation))
  };

  return (
    <div
      onClick={() => {
        handleClick(item);
      }}
      className="group cursor-pointer border-b-[1px] border-gray-400 py-4 px-7 mt-4"
    >
      <div className="flex gap-2.5 relative">
        <i className={`${icon} text-xl text-gray-500`}></i>
        <div>
          <p className="font-medium group-hover:text-primary text-lg">
            {item?.terms?.[0]?.value}
          </p>
          <p className="text-sm font-semibold text-gray-400">
            {item?.terms?.[1]?.value}
            {item?.terms?.[2]?.value}
          </p>
        </div>
        {index !== null && (
          <button
            className="absolute cursor-pointer -right-4"
            onClick={handleCrossClick}
          >
            <i
              className={`ri-close-large-fill p-1 text-gray-500 hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.09)] rounded-[50%] transition-all duration-150 ease-in-out`}
            ></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Location;

// <i class="ri-map-pin-line"></i>
