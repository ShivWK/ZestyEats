import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, memo } from "react";
import createDebounce from "../../utils/debounceCreater";
import {
  useLazyGetSearchedDishQuery,
  useGetSearchedDishQuery,
} from "../../features/home/restaurantsApiSlice";
import { addCurrentRestaurant, selectRestaurantAllItems } from "../../features/home/restaurantsSlice";
import useScrollToTop from "../../utils/useScrollToTop";
import SearchContainer from "../SearchContainer";
import ItemsCardContainer from "./ItemsCardContainer";
import Filter from "../Home/Filters";
import Loader from "../Loader";

const RestaurantSearch = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  const AllItems = useSelector(selectRestaurantAllItems);

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
    // console.log(allData)
    localStorage.setItem("RestaurantAllItems", JSON.stringify(AllItems));
  }, [title]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

  // console.log("Search Term", searchTerm);

  const doSearch = useRef(
    createDebounce((searchTerm) => {
      // if (searchTerm.trim() !== "") {
      console.log("Called")
      const FilteredData = AllItems.filter(obj => {
        return obj?.name.toLowerCase().split(" ").some(word => word.startsWith(searchTerm.trim().toLowerCase()));
      })

      setSearchData(FilteredData);
      //}
    }, 300)
  );

  console.log("Search Data", searchData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") setSearchData(null)
    if (searchTerm.trim() !== "") {
      doSearch.current(e.target.value);
    }
  };

  const handleCross = () => {
    setSearchTerm("");
    setSearchData(null)
  };

  const renderedComponent = () => {
    // useScrollToTop()
    return <div className="pt-16">
      {(searchData?.length !== 0 || searchData === null)&& (
        <div className="px-0.5">
          <Filter text1="Veg" text2="Non Veg" />
        </div>
      )}
      {searchTerm.trim() !== "" ?
        searchData === null ? <div className="flex items-center justify-center py-5">
          <Loader size="small" />
        </div>
          : searchData.length !== 0 ?
            searchData.map((item, index) => <ItemsCardContainer key={index} item={item} isParentOpen={true} />)
            : <p className="text-center text-gray-700 font-semibold my-5">{`Sorry, we couldn't find any items matching your search.`}</p>
        : AllItems.map((item, index) => <ItemsCardContainer key={index} item={item} isParentOpen={true} />)
      }
    </div>
  }

  return (
    <SearchContainer
      placeholder={`Search in ${title}...`}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      crossHandler={handleCross}
      Child={renderedComponent}
    />
  );
};

export default RestaurantSearch;
