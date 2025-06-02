import { memo, useCallback, useEffect, useRef } from "react";
import { motion, useScroll } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addRecentLocations,
  selectRecentLocations,
  selectLatAndLng,
} from "../../features/home/homeSlice";
import Location from "./Loacations";
import { useLazySearchedLocationQuery } from "../../features/home/searchApiSlice";
import { useLazyGetHomePageDataQuery } from "../..//features/home/homeApiSlice";
import {
  setLoading,
  removeYourCurrentCity,
} from "../../features/home/homeSlice";
import { closeLocationInModal } from "../../features/Login/loginSlice";
import { updateSearchedCity } from "../../utils/addSearchedCity";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";

const RecentLocations = memo(() => {
  const recentLocations = useSelector(selectRecentLocations);
  const { lat: latitude, lng: longitude } = useSelector(selectLatAndLng);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const dispatch = useDispatch();
  const [triggerLocationCall] = useLazySearchedLocationQuery();
  const [triggerRestaurentDataCall] = useLazyGetHomePageDataQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const checkAndRedirect = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  useEffect(() => {
    const recentLocations = JSON.parse(localStorage.getItem("recentLocations"));

    if (recentLocations !== null) {
      dispatch(addRecentLocations(recentLocations));
    }
  }, []);

  const handleRecentLocationClick = useCallback(
    async (location) => {
      checkAndRedirect();
      dispatch(setLoading(true));
      updateSearchedCity(location, dispatch);

      dispatch(removeYourCurrentCity());
      dispatch(closeLocationInModal());

      try {
        const res1 = await triggerLocationCall(location.place_id).unwrap();
        const { lat, lng } = res1;

        if (lat === latitude && lng === longitude) {
          dispatch(setLoading(false));
          return;
        }

        const res2 = await triggerRestaurentDataCall({ lat, lng }).unwrap();
        updateHomeRestaurantData(res2, dispatch, lat, lng);
      } catch (err) {
        alert(err.message);
        dispatch(setLoading(false));
      }
    },
    [
      checkAndRedirect,
      dispatch,
      triggerLocationCall,
      triggerRestaurentDataCall,
      updateHomeRestaurantData,
      setLoading,
      removeYourCurrentCity,
      closeLocationInModal,
      updateSearchedCity,
    ]
  );

  return (
    <div
      ref={containerRef}
      className="relative border-[1px] border-gray-400 mt-6 p-6 overflow-auto"
    >
      <motion.div
        className="fixed top-0 h-2bg-primary left-0 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <p className="text-sm font-semibold text-gray-400">RECENT SEARCHES</p>
      {recentLocations.length !== 0 ? (
        recentLocations.map((location, index) => (
          <Location
            index={index}
            key={location["place_id"]}
            icon="ri-history-line"
            item={location}
            handleClick={() => handleRecentLocationClick(location)}
          />
        ))
      ) : (
        <p className="">No Recent Locatons</p>
      )}
    </div>
  );
});

export default RecentLocations;
