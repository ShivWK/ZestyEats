import { closeLocationInModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import Location from "./Loacations";

const ModalSubContainer = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchedLocation, setSearchedLocation] = useState([]);
  const [Focused, setFocused] = useState(false);
  const [recentLocation, setRecentLocation] = useState([]);

  // Store the debounced function in a ref so that:
  // 1. It is created only once on initial render.
  // 2. It preserves the internal timer between re-renders.
  // This avoids creating a new debounced function on every input change,
  // which would break debounce behavior by resetting the timer each time.
  // Use function declaration for debounceCreater to avoid hoisting issues.
  // and to ensure it is defined before being used in the useRef hook.

  const debouncedHandleInputChange = useRef(
    debounceCreater(async (value) => {
      try {
        // Do this with RTK query

        const response = await fetch(
          `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}&types=`
        );
        const data = await response.json();
        setSearchedLocation(data?.data);
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

  const handleSearchedLocationClick = async (location) => {
    setRecentLocation((prev) => { 
      return [
        ...prev,
        {
          place_id: location["place_id"],
          terms: location["terms"],
        }
      ]
    })

    setSearchedLocation([]);
    setSearchValue("");
    try {
      const response1 = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${location["place_id"]}`);
      const data = await response1.json();
      
      const lat = data?.data?.[0]?.geometry?.location.lat;
      const log = data?.data?.[0]?.geometry?.location.lng;

      const response2 = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${log}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);

      const data2 = await response2.json();
      console.log(data2);

    } catch (err) {
      alert(err.message);
    }
  }

  // Geo Location API
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        // alert(`Latitude: ${lat}, Longitude: ${lon}`);

        try {
          setSearchValue("Fetching your location...");
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
          );
          setSearchValue("");
          const data = await response.json();
          alert(`Location: ${data.display_name}`);
        } catch (err) {
          setSearchValue("");
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
        className={`flex justify-between border-[1px] border-gray-400 gap-1.5 w-full mt-7 p-3 cursor-text ${
          Focused && "shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]"
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

// <i class="ri-history-line"></i>

// API on click on location to fetch the food data there is  https://www.swiggy.com/dapi/misc/address-recommend?place_id=ChIJYZ39KLyhoDkRs32YFql7rnw change the place_id to get the data for that location

// API to get location on search https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}&types=

// API to get current location after getting the lat and long https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long} to get the location name from lat and long

// API to get the lat and long from the location name https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1

// https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.407075192182013&lng=78.47801461815835&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
