// Done

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLazyGetAutoCompleteSearchQuery } from "../../features/home/searchApiSlice";
import { setHideLocation } from "../../features/Login/loginSlice";
import RecentLocations from "./RecentLocations";
import GeoLocationFinder from "./GeoLocation";
import SearchedLocation from "./SearchedLocations";
import createDebounce from "../../utils/debounceCreator";

const ModalSubContainer = () => {
  // console.log("LocationModalSubContainer")
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState([]);
  const [Focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const [triggerAutoCompleteSearch] = useLazyGetAutoCompleteSearchQuery();

  const debouncedHandleInputChange = useRef(
    createDebounce(async (input) => {
      try {
        if (input) {
          const data = await triggerAutoCompleteSearch(input).unwrap();
          setSearchLoading(false);
          if (data) setSearchedLocation(data?.data);
        }
      } catch (err) {
        console.log(err);
      }
    }, 300)
  );

  const handleClose = () => {
    dispatch(setHideLocation(true));
    setSearchValue("");

    window.history.back();
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setSearchLoading(true);
    debouncedHandleInputChange.current(e.target.value.trim());
  };

  const handleDivClick = (e) => {
    e.stopPropagation();
    inputRef.current.focus();
    setFocused(true);
  };

  return (
    <div
      onClick={() => setFocused(false)}
      className="flex flex-col mt-7 w-[90%] md:w-[75%] h-[90%]"
    >
      <button
        onClick={handleClose}
        className="group cursor-pointer self-start dark:text-white text-black"
      >
        <i className="ri-close-large-fill text-xl p-1 -ml-1 dark:group-hover:bg-gray-300/40 group-hover:bg-black/30 group-hover:text-white rounded-[50%] transition-all duration-150 ease-in-out"></i>
      </button>

      {/* Search locations */}
      <div
        onClick={handleDivClick}
        className={`flex justify-between border-[1px] border-gray-400 gap-1.5 w-full mt-7 p-2 md:p-3 cursor-text ${Focused && "shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]"
          }`}
      >
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          onChange={handleInputChange}
          className="p-0.5 outline-none text-[18px] font-medium w-[80%] md:w-[82%] dark:placeholder:text-gray-400 dark:text-gray-200"
          placeholder="Search for area, streat..."
        />
        {searchValue.length !== 0 && (
          <button
            onClick={() => setSearchValue("")}
            className="font-bold text-[18px] text-primary cursor-pointer"
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
          fetchedLocations={searchedLocation}
          setSearchedLocation={setSearchedLocation}
          setSearchValue={setSearchValue}
          searchLoading={searchLoading}
        />
      )}
    </div>
  );
};

export default ModalSubContainer;