import Location from "./Loacations";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setHideLocation } from "../../features/Login/loginSlice";
import {
  removeYourCurrentCity,
  setLoading,
  addRecentLocations,
  selectLatAndLng
} from "../../features/home/homeSlice";
import { updateSearchedCity } from "../../utils/addSearchedCity";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";

import { useLazySearchedLocationQuery } from "../../features/home/searchApiSlice";
import { useLazyGetHomePageDataQuery } from "../..//features/home/homeApiSlice";
import { memo, useCallback } from "react";

import { recentLocationModifier } from "../../utils/guestSessionDataModifier";
import Loader from "../Loader";

const SearchedLocation = memo(({
  locationsfetched,
  setSearchedLocation,
  setSearchValue,
  searchLoading
}) => {
  const [triggerLocationCall] = useLazySearchedLocationQuery();
  const [triggerRestaurentDataCall] = useLazyGetHomePageDataQuery();
  const { lat: latitude, lng: longitude } = useSelector(selectLatAndLng);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const checkAndRedirect = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleSearchedLocationClick = useCallback(async (location) => {
    checkAndRedirect();

    dispatch(setLoading(true));
    updateSearchedCity(location, dispatch);

    setSearchedLocation([]);
    setSearchValue("");
    dispatch(removeYourCurrentCity());
    dispatch(setHideLocation(true))

    try {
      const res1 = await triggerLocationCall(location.place_id).unwrap();
      const { lat, lng } = res1;

      if (lat === latitude && lng === longitude) {
        dispatch(setLoading(false));
        return;
      }

      const res2 = await triggerRestaurentDataCall({ lat, lng }).unwrap();
      updateHomeRestaurantData(res2, dispatch, lat, lng);

      if (
        !(res2?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present")
      ) {
        dispatch(
          addRecentLocations({
            place_id: location.place_id,
            terms: location.terms,
          })
        );

        let previousLocations = JSON.parse(
          localStorage.getItem("recentLocations")
        );
        if (!Array.isArray(previousLocations)) previousLocations = [];
        const exists = previousLocations.some(item => item.place_id === location.place_id)

        if (!exists) {
          previousLocations.push({
            place_id: location.place_id,
            terms: location.terms,
          });
          localStorage.setItem(
            "recentLocations",
            JSON.stringify(previousLocations)
          );

          recentLocationModifier(previousLocations);
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  }, [checkAndRedirect, updateSearchedCity, dispatch, triggerLocationCall, triggerRestaurentDataCall, setSearchedLocation, setSearchValue, updateHomeRestaurantData, setLoading, removeYourCurrentCity, addRecentLocations]);

  return (
    <div className="mt-6 overflow-hidden border-[1px] border-gray-400 p-2 pb-3 overflow-y-auto pretty-scrollbar">
      <h2 className="text-lg text-gray-400 pl-1 md:pl-2 pt-1 md:pt-2">Matching Locations</h2>
      {
        searchLoading
          ? <div className="flex items-center justify-center py-2">
              <Loader size={"small"} />
            </div>
          : <div className="-mt-1">
            {locationsfetched.map((location, index) => (
              <Location
                key={location.place_id}
                icon="ri-map-pin-line"
                item={location}
                handleClick={() => handleSearchedLocationClick(location)}
              />
            ))}
          </div>
      }
    </div>
  );
});

export default SearchedLocation;
