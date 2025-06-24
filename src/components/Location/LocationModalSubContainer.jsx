import { useState, useRef, memo } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetAutoCompleteSearchQuery } from "../../features/home/searchApiSlice";
import { setHideLocation } from "../../features/Login/loginSlice";
import RecentLocations from "./RecentLocations";
import GeoLocationFinder from "./GeoLocation";
import SearchedLocation from "./SearchedLocations";

const ModalSubContainer = memo(() => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchedLocation, setSearchedLocation] = useState([]);
  const [Focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const [triggerAutoCompleteSearch] = useLazyGetAutoCompleteSearchQuery();

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
        // add toast
        console.log(err);
      }
    }, 300)
  );

  const handleClose = () => {
    dispatch(setHideLocation(true));
    setSearchValue("");
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
    debouncedHandleInputChange.current(e.target.value.trim());
  };

  const handleDivClick = (e) => {
    e.stopPropagation();
    inputRef.current.focus();
    setFocused(true);
  };

  const handleContainerClick = (e) => {
    setFocused(false);
  };

  const handeCancelClick = () => {
    setSearchValue("");
  };

  return (
    <div
      onClick={handleContainerClick}
      className="flex flex-col mt-7 w-[85%] md:w-[75%] h-[90%]"
    >
      <button
        onClick={handleClose}
        className="group cursor-pointer  self-start"
      >
        <i className="ri-close-large-fill text-xl group-hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.08)] rounded-[50%] transition-all duration-150 ease-in-out"></i>
      </button>
      {/* Search locations */}
      <div
        onClick={handleDivClick}
        className={`flex justify-between border-[1px] border-gray-400 gap-1.5 w-full mt-7 p-1.5 md:p-3 cursor-text ${
          Focused && "shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]"
        }`}
      >
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          onChange={handleInputChange}
          className="p-0.5 outline-none font-semibold w-[80%] md:w-[82%]"
          placeholder="Search for area, streat name..."
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
        <GeoLocationFinder setSearchValue={setSearchValue} />
      )}

      {/* Recent Locations */}
      {searchValue.length === 0 && <RecentLocations />}

      {/* Searched Locations */}
      {searchValue.length !== 0 && (
        <SearchedLocation
          locationsfetched={searchedLocation}
          setSearchedLocation={setSearchedLocation}
          setSearchValue={setSearchValue}
        />
      )}
    </div>
  );
});

export default ModalSubContainer;


// No, you don’t need to wrap a useState setter (like setLoading) in useCallback when passing it to a child.
// The useState setter functions (like setLoading) are already stable and do not change between renders, so they do not need to be wrapped in useCallback.
// Wrapping them in useCallback would not provide any performance benefit and could actually lead to unnecessary complexity.