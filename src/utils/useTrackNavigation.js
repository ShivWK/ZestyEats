import { setPathHistory, selectPathHistory } from "../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useTrackNavigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathHistory = useSelector(selectPathHistory);

  useEffect(() => {
    if (location.pathname !== pathHistory[pathHistory.length - 1] && location.pathname !== "undefined") {
      dispatch(setPathHistory(location.pathname));
    }
  }, [location.pathname]);
};

export default useTrackNavigation;
