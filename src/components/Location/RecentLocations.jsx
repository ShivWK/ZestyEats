// Done (we aren't fetching recent locations from local storage )
import { memo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectRecentLocations, selectLatAndLng } from "../../features/home/homeSlice";
import { useLazySearchedLocationQuery } from "../../features/home/searchApiSlice";
import { useLazyGetHomePageDataQuery } from "../..//features/home/homeApiSlice";
import { setLoading, removeYourCurrentCity } from "../../features/home/homeSlice";
import { setHideLocation } from "../../features/Login/loginSlice";
import { updateSearchedCity } from "../../utils/addSearchedCity";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import Location from "./Locations";

const RecentLocations = memo(() => {
  // console.log("RecentLocations rendered")
  const recentLocations = useSelector(selectRecentLocations);
  const { lat: latitude, lng: longitude } = useSelector(selectLatAndLng);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const [triggerLocationCall] = useLazySearchedLocationQuery();
  const [triggerRestaurantDataCall] = useLazyGetHomePageDataQuery();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleRecentLocationClick = useCallback(
    async (location) => {
      if (pathname !== "/") navigate("/");

      dispatch(setLoading(true));
      updateSearchedCity(location, dispatch);

      dispatch(removeYourCurrentCity());
      dispatch(setHideLocation(true))

      try {
        const res1 = await triggerLocationCall(location.place_id).unwrap();
        const { lat, lng } = res1;

        if (lat === latitude && lng === longitude) {
          dispatch(setLoading(false));
          return;
        }

        const res2 = await triggerRestaurantDataCall({ lat, lng }).unwrap();
        updateHomeRestaurantData(res2, dispatch, lat, lng);
      } catch (err) {
        alert(err.message);
        dispatch(setLoading(false));
      }
    }, [dispatch, latitude, longitude, triggerLocationCall, triggerRestaurantDataCall, navigate, pathname]);

  return (
    <div
      ref={containerRef}
      className="relative border-[1px] border-gray-400 p-3.5 mt-6 md:p-6 overflow-y-auto overflow-x-hidden"
    >
      <p className="text-sm font-semibold text-gray-400 dark:text-gray-300">RECENT SEARCHES</p>
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
        <p className="text-sm dark:text-gray-400">No Recent Locations</p>
      )}
    </div>
  );
});

export default RecentLocations;
