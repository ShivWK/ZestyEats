import { selectUserFriendlyPathHistory } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ textColor, mainTextColor }) => {
  const pathHistory = useSelector(selectUserFriendlyPathHistory);
  const navigate = useNavigate();

  const clickHandler = (backstage, index, lastIndex) => {
    if (index !== lastIndex) {
      navigate(backstage);
    }
  }

  return (
    <div className="inline-flex gap-2 items-center">
      {pathHistory.map((path, index, arr) => {
        const lastIndex = arr.length - 1;
        const backstage = index + 1 - arr.length;
        //"#101828", "#4a5565"
        return (
          <span key={index} className="flex gap-2 items-center shrink-0 whitespace-nowrap ">
            <button
              onClick={() => clickHandler(backstage, index, lastIndex)}
              // style={{ color: index === lastIndex ? mainTextColor : textColor }}
              className={`${index !== lastIndex ? `cursor-pointer text-[${textColor}] dark:text-gray-400` : `dark:text-white text-[${mainTextColor}]`} truncate `}
            >
              {path}
            </button>
            {index !== lastIndex && (
              <span className="font-bold dark:text-gray-300">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
