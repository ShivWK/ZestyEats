import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading, selectLatAndLng } from "../../features/home/homeSlice";
import { closeLocationInModal } from "../../features/Login/loginSlice";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import { useLazyGetHomePageDataQuery } from "../..//features/home/homeApiSlice";

import { updateCurrentCity } from "../../utils/addCurrentCity";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { memo } from "react";

const GeoLocation = memo(({ setSearchValue }) => {
  const [triggerLoactionByCoordinates] = useLazyLocationByCoordinatesQuery();
  const [triggerRestaurentDataCall] = useLazyGetHomePageDataQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lat: latitude, lng: longitude } = useSelector(selectLatAndLng);

  const checkAndRedirect = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleLocation = () => {
    // 1: Get live lat and lng by GeoLoaction API.
    // 2: Give this lat and lng to Swiggy API , which will give you the loaction according to it.
    // 3: Swiggy given location will a new approx lat and lng , extarct that.
    // 4: Now give this new lat and lng to the home API to ftech Restaurant's data.

    if (navigator.geolocation) {
      checkAndRedirect();
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;

        try {
          setSearchValue("Fetching your location...");
          dispatch(setLoading(true));
          dispatch(closeLocationInModal());
          const data = await triggerLoactionByCoordinates({
            lat1,
            lng1,
          }).unwrap();
          setSearchValue("");

          updateCurrentCity(data, dispatch);

          const lat = data?.data?.[0]?.geometry?.location?.lat;
          const lng = data?.data?.[0]?.geometry?.location?.lng;

          if (lat === latitude && lng === longitude) {
            dispatch(setLoading(false));
            return;
          }

          try {
            const res2 = await triggerRestaurentDataCall({ lat, lng }).unwrap();
            updateHomeRestaurantData(res2, dispatch, lat, lng);
          } catch (err) {
            alert(err.error);
            dispatch(setLoading(false));
          }
        } catch (err) {
          setSearchValue("");
          dispatch(closeLocationInModal());
          dispatch(setLoading(false));
          alert("Error fetching location data. Please try again later.");
          console.log(err.error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      onClick={handleLocation}
      className="group cursor-pointer border-[1px] border-gray-400 py-4 px-7 mt-8"
    >
      <div className="flex gap-2.5">
        <i className="ri-crosshair-2-line text-xl text-gray-500"></i>
        <div>
          <p className="font-medium group-hover:text-primary text-lg">
            Get current location
          </p>
          <p className="text-sm font-semibold text-gray-400">Using GPS</p>
        </div>
      </div>
    </div>
  );
});

export default GeoLocation;
