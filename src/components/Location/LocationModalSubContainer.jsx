// Done

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetAutoCompleteSearchQuery } from '../../features/home/searchApiSlice';
import { setHideLocation } from '../../features/Login/loginSlice';
import RecentLocations from './RecentLocations';
import GeoLocation from './GeoLocation';
import SearchedLocation from './SearchedLocations';
import createDebounce from '../../utils/debounceCreator';

const ModalSubContainer = () => {
  // console.log("LocationModalSubContainer")
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
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
    }, 300),
  );

  const handleClose = () => {
    dispatch(setHideLocation(true));
    setSearchValue('');

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
      className="mt-7 flex h-[90%] w-[90%] flex-col md:w-[75%]"
    >
      <button
        onClick={handleClose}
        className="group cursor-pointer self-start text-black dark:text-white"
      >
        <i className="ri-close-large-fill -ml-1 rounded-[50%] p-1 text-xl transition-all duration-150 ease-in-out group-hover:bg-black/30 group-hover:text-white dark:group-hover:bg-gray-300/40"></i>
      </button>

      {/* Search locations */}
      <div
        onClick={handleDivClick}
        className={`mt-7 flex w-full cursor-text justify-between gap-1.5 border-[1px] border-gray-400 p-2 md:p-3 ${
          Focused && 'shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]'
        }`}
      >
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          onChange={handleInputChange}
          className="w-[80%] p-0.5 text-[18px] font-medium outline-none md:w-[82%] dark:text-gray-200 dark:placeholder:text-gray-400"
          placeholder="Search for area, streat..."
        />
        {searchValue.length !== 0 && (
          <button
            onClick={() => setSearchValue('')}
            className="text-primary cursor-pointer text-[18px] font-semibold"
          >
            Cancel
          </button>
        )}
      </div>

      {/* {GPS} */}
      {searchValue.length === 0 && (
        <GeoLocation setSearchValue={setSearchValue} />
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
