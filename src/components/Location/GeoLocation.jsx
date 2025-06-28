import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading, selectLatAndLng } from "../../features/home/homeSlice";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import { useLazyGetHomePageDataQuery } from "../..//features/home/homeApiSlice";

import { setHideLocation, selectLocationModal } from "../../features/Login/loginSlice";

import { updateCurrentCity } from "../../utils/addCurrentCity";
import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { memo } from "react";
import { toast } from "react-toastify";

const GeoLocation = memo(({ setSearchValue }) => {
  const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();
  const [triggerRestaurantDataCall] = useLazyGetHomePageDataQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { lat: latitude, lng: longitude } = useSelector(selectLatAndLng);
  const isLocationModelOpen = useSelector(selectLocationModal);

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
          dispatch(setHideLocation(true))
          const data = await triggerLocationByCoordinates({
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
            const res2 = await triggerRestaurantDataCall({ lat, lng }).unwrap();
            updateHomeRestaurantData(res2, dispatch, lat, lng);
          } catch (err) {
            alert(err.error);
            dispatch(setLoading(false));
          }
        } catch (err) {
          setSearchValue("");
          dispatch(setHideLocation(true));
          dispatch(setLoading(false));
          alert("Error fetching location data. Please try again later.");
          console.log(err.error);
        }
      },
        err => {
          console.log("Error in location:", err.message);
          if (isLocationModelOpen) dispatch(setHideLocation(true))

          let msg;
          if (err.code === err.PERMISSION_DENIED) {
            msg = "Location permission denied. Please allow.";
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            msg = "Location information is unavailable."
          } else if (err.code === err.TIMEOUT) {
            msg = "The Request to get your location timed out."
          } else {
            msg = "An error occurred while fetching your location."
          }

          toast.info(msg, {
            autoClose: 5000,
            style: {
              backgroundColor: "#ff5200",
              color: "white",
              fontWeight: "medium",
            },
            progressClassName: "progress-style",
          });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      onClick={handleLocation}
      className="group cursor-pointer border-[1px] border-gray-400 active:border-primary py-2 px-3 md:py-4 md:px-7 mt-8"
    >
      <div className="flex gap-2.5">
        <i className="ri-crosshair-2-line text-xl text-gray-500"></i>
        <div>
          <p className="font-medium group-hover:text-primary group-active:text-primary text-lg">
            Get current location
          </p>
          <p className="text-sm font-semibold text-gray-400">Using GPS</p>
        </div>
      </div>
    </div>
  );
});

export default GeoLocation;
