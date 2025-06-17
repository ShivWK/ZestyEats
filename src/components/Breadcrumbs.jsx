import { selectUserFriendlyPathHistory } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const pathHistory = useSelector(selectUserFriendlyPathHistory);
  const navigate = useNavigate();

    const clickHandler = (index, lastIndex) => {
        if (index === )
    }

  return (
    <div className="inline-flex gap-0.5 items-center">
      {pathHistory.map((path, index, arr) => {
        const lastIndex = arr.length - 1;
        const backstage = index + 1 - arr.length;
        const delemeter = index < lastIndex && index > 0 ? "/" : "";

        return (
          <button
            onClick={() => navigate(backstage)}
            style={{ color: index === lastIndex ? "#101828" : "#4a5565" }}
            className="cursor-pointer"
          >
            {`${delemeter} ${path}`}
          </button>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
