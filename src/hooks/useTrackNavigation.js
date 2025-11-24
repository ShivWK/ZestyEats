import { setPathHistory, selectPathHistory } from "../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useTrackNavigation = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const pathHistory = useSelector(selectPathHistory);

  useEffect(() => {
    if (pathname !== pathHistory[pathHistory.length - 1] && pathname !== undefined) {
      dispatch(setPathHistory(pathname));
    }
  }, [pathname, pathHistory, dispatch]);
};

export default useTrackNavigation;
