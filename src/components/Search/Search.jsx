import SearchContainer from "../SearchContainer";
import { useRef, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import createDebounce from "../../utils/debounceCreater";
import { useDispatch } from "react-redux";
import { setSuggestionsLoading, setSuggestions } from "../../features/search/homeSearchSlice";
import { useLazyGetSearchedFoodSuggestionsQuery } from "../../features/search/homeSearchApiSlice";

const Search = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [searchTerm, setSearchTerm] = useState("");
  const [trigger] = useLazyGetSearchedFoodSuggestionsQuery();
  const dispatch = useDispatch();

  const searchHandler = useRef(createDebounce(async (text, trigger, lat, lng) => {
    dispatch(setSuggestionsLoading(true));

    try {
      const data = await trigger({ lat, lng, food: encodeURI(text.trim()) }).unwrap();
      dispatch(setSuggestions(data));
      dispatch(setSuggestionsLoading(false));
    } catch (err) {
      console.log("Can't fetch suggestion data", err);
      dispatch(setSuggestionsLoading(false));
      throw new Error("Can't fetch suggestions data");
    }
  }, 400))

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value) {
      searchHandler.current(e.target.value, trigger, lat, lng);
    } else {
      dispatch(setSuggestions([]))
    }
  }

  const crossHandler = () => {
    setSearchTerm('');
    dispatch(setSuggestions([]))
  }

  return (
    <SearchContainer
      placeholder={"Search for restaurants and food"}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      crossHandler={crossHandler}
      Child={Outlet}
    />
  );
};

export default Search;

