import { closeLocationInModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import Location from "./Loacations";
import {
  useLazySearchedLocationQuery,
  useLazyGetAutoCompleteSearchQuery,
  useLazyLocationByCoordinatesQuery,
} from "../../features/home/searchApiSlice";

import { useLazyGetHomePageDataQuery } from "../..//features/home/homeApiSlice";

import {
  addApiData,
  addFoodieThoughtsData,
  addTopRestaurantsData,
  addSearchedCity,
  addSearchedCityAddress,
  addYourCurrentCity,
  removeYourCurrentCity,
  addTopRestaurantsTitle,
  setLoading,
} from "../../features/home/homeSlice";

const ModalSubContainer = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchedLocation, setSearchedLocation] = useState([]);
  const [Focused, setFocused] = useState(false);
  const [recentLocation, setRecentLocation] = useState([]);
  const [triggerLocationCall] = useLazySearchedLocationQuery();
  const [triggerRestaurentDataCall] = useLazyGetHomePageDataQuery();
  const [triggerAutoCompleteSearch] = useLazyGetAutoCompleteSearchQuery();
  const [triggerLoactionByCoordinates] = useLazyLocationByCoordinatesQuery();

  useEffect(() => {
    const recentLocations = JSON.parse(localStorage.getItem('recentLocations'));
    if (recentLocations !== null) {
      setRecentLocation(recentLocations);
    }
  }, [])


  // Store the debounced function in a ref so that:
  // 1. It is created only once on initial render.
  // 2. It preserves the internal timer between re-renders.
  // This avoids creating a new debounced function on every input change,
  // which would break debounce behavior by resetting the timer each time.
  // Use function declaration for debounceCreater to avoid hoisting issues.
  // and to ensure it is defined before being used in the useRef hook.

  const debouncedHandleInputChange = useRef(
    debounceCreater(async (input) => {
      try {
        if (input) {
          const data = await triggerAutoCompleteSearch(input).unwrap();
          if (data) setSearchedLocation(data?.data);
        }
      } catch (err) {
        alert(err.message);
      }
    }, 200)
  );

  const handleClose = () => {
    dispatch(closeLocationInModal());
  };

  function debounceCreater(func, delay) {
    let timer = null;
    return function (...value) {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        func(...value);
      }, delay);
    };
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    debouncedHandleInputChange.current(e.target.value);
  };

  const handleDivClick = (e) => {
    e.stopPropagation();
    setFocused(true);
  };

  const handleContainerClick = (e) => {
    setFocused(false);
  };

  const handeCancelClick = () => {
    setSearchValue("");
  };

  const updateHomeRestaurantData = async (res) => {
    console.log(res)
    if (res?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present") {
      alert("We don't server in this location");
    } else {
      localStorage.setItem("HomeAPIData", JSON.stringify(res));

      dispatch(addApiData(res));
      dispatch(addFoodieThoughtsData(res));
      dispatch(addTopRestaurantsData(res));
      dispatch(addTopRestaurantsTitle(res));
    }
  };

  // handle clicks on recent locations
  
  const handleRecentLocationClick = async (location) => {
    dispatch(setLoading(true));
    const city = location?.terms[0]?.value || "";
    const address =
      location?.terms[1]?.value === undefined
        ? ""
        : ", " + location?.terms[1]?.value + ", " + location?.terms[2]?.value;
    dispatch(addSearchedCity(city));
    dispatch(addSearchedCityAddress(address));

    dispatch(removeYourCurrentCity());
    dispatch(closeLocationInModal());

    try {
      const res1 = await triggerLocationCall(location["place_id"]).unwrap();
      const { lat, lng } = res1;

      const res2 = await triggerRestaurentDataCall({ lat, lng }).unwrap();
      updateHomeRestaurantData(res2);
      dispatch(setLoading(false));

    } catch (err) {
      alert(err.message);
      dispatch(setLoading(false));
    }
  }

  // handles clicks on searched locations  
  const handleSearchedLocationClick = async (location) => {
    dispatch(setLoading(true));
    const city = location?.terms[0]?.value || "";
    const address =
      location?.terms[1]?.value === undefined
        ? ""
        : ", " + location?.terms[1]?.value + ", " + location?.terms[2]?.value;
    dispatch(addSearchedCity(city));
    dispatch(addSearchedCityAddress(address));

    setSearchedLocation([]);
    setSearchValue("");
    dispatch(removeYourCurrentCity());
    dispatch(closeLocationInModal());

    try {
      const res1 = await triggerLocationCall(location["place_id"]).unwrap();
      const { lat, lng } = res1;

      const res2 = await triggerRestaurentDataCall({ lat, lng }).unwrap();
      updateHomeRestaurantData(res2);

      if (!(res2?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present")) {
        setRecentLocation((prev) => {
          return [
            ...prev,
            {
              place_id: location["place_id"],
              terms: location["terms"],
            },
          ];
        });

        let previousLocations = JSON.parse(localStorage.getItem("recentLocations"));
        if (!Array.isArray(previousLocations)) previousLocations = [];

        previousLocations.push({
          place_id: location["place_id"],
          terms: location["terms"],
        })
        localStorage.setItem("recentLocations", JSON.stringify(previousLocations));
      }

      dispatch(setLoading(false));
    } catch (err) {
      alert(err.message);
      dispatch(setLoading(false));
    }
  };

  // Geo Location API
  const handleLocation = () => {
    // 1: Get live lat and lng by GeoLoaction API.
    // 2: Give this lat and lng to Swiggy API , which will give you the loaction according to it.
    // 3: Swiggy given location will a new approx lat and lng , extarct that.
    // 4: Now give this new lat and lng to the home API to ftech Restaurant's data.

    if (navigator.geolocation) {
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
          const localityObject = data?.data?.[0]?.["address_components"].find(
            (item) => item?.["types"].includes("locality")
          );

          dispatch(addYourCurrentCity(localityObject?.["short_name"]));
          dispatch(
            addSearchedCityAddress(data?.data?.[0]?.["formatted_address"])
          );

          const lat = data?.data?.[0]?.geometry?.location?.lat;
          const lng = data?.data?.[0]?.geometry?.location?.lng;

          try {
            const res2 = await triggerRestaurentDataCall({ lat, lng }).unwrap();
            console.log(res2);
            updateHomeRestaurantData(res2); //loader rquired
            // dispatch(addTopRestaurantsTitle(res2));
            dispatch(setLoading(false));

          } catch (err) {
            alert(err.message);
            dispatch(setLoading(false));
          }
        } catch (err) {
          setSearchValue("");
          dispatch(closeLocationInModal());
          dispatch(setLoading(false));
          alert("Error fetching location data. Please try again later.");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div
      onClick={handleContainerClick}
      className="flex flex-col mt-7 w-[75%] h-[90%]"
    >
      <button onClick={handleClose} className="cursor-pointer self-start">
        <i className="ri-close-large-fill text-xl"></i>
      </button>
      {/* Search locations */}
      <div
        onClick={handleDivClick}
        className={`flex justify-between border-[1px] border-gray-400 gap-1.5 w-full mt-7 p-3 cursor-text ${Focused && "shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]"
          }`}
      >
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          className="p-0.5 outline-none font-semibold"
          placeholder="Search for area, streat name..."
          size={30}
        />
        {searchValue.length !== 0 && (
          <button
            onClick={handeCancelClick}
            className="font-bold text-primary cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      {/* {GPS} */}
      {searchValue.length === 0 && (
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
      )}

      {/* Recent Locations */}
      {searchValue.length === 0 && (
        <div className="border-[1px] border-gray-400 mt-6 p-6">
          <p className="text-sm font-semibold text-gray-400">RECENT SEARCHES</p>
          {recentLocation.length !== 0 ? (
            recentLocation.map((location, index) => (
              <Location
                key={location["place_id"]}
                icon="ri-history-line"
                item={location}
                handleClick={handleRecentLocationClick}
              />
            ))
          ) : (
            <p className="">No Recent Locatons</p>
          )}
        </div>
      )}

      {/* Search Locations */}
      {searchValue.length !== 0 && (
        <div className="mt-6 overflow-auto last:border-none">
          {searchedLocation.map((location, index) => (
            <Location
              key={location["place_id"]}
              icon="ri-map-pin-line"
              item={location}
              handleClick={handleSearchedLocationClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalSubContainer;

// API on click on location to fetch the food data there is change the place_id to get the data for that location, here you will get lat and long of the location according to the Swiggy
// https://www.swiggy.com/dapi/misc/address-recommend?place_id=ChIJYZ39KLyhoDkRs32YFql7rnw

// API to get location on search
// https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}&types=

// API to get the lat and long from the location name
// https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1

// API to get Restaurant's data of searched city
// https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.407075192182013&lng=78.47801461815835&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING

// Api to get live location area name after getting lat and lng
// https://www.swiggy.com/dapi/misc/address-recommend?latlng=${lat}%2C${long}
