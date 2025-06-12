import { selectUserFriendlyPathHistory } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
    const pathHistory = useSelector(selectUserFriendlyPathHistory);
    const navigate = useNavigate();

    return <div className="inline-flex gap-0.5">
        {
            pathHistory.map((path, index, arr)=> {
                const lastIndex = arr.length - 1;
                const backstage = (index + 1) - arr.length;
                const delemeter = (index < lastIndex && index > 0) ? "/" : "";

                return (
                    <button onClick={() => navigate(backstage)} style={{color: index === lastIndex? "#101828" : "#4a5565"}}>
                        {`${delemeter} ${path}`}
                    </button>
                )
            })
        }
    </div>
}

export default Breadcrumbs;