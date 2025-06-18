import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef, memo } from "react";
import createDebounce from "../../utils/debounceCreater";
import {
  useLazyGetSearchedDishQuery,
  useGetSearchedDishQuery,
} from "../../features/home/restaurantsApiSlice";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import useScrollToTop from "../../utils/useScrollToTop";
import SearchContainer from "../SearchContainer";

const renderedComponent = () => {
  return <div>
    <p>Hi</p>
  </div>
}

const RestaurantSearch = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const restro_Id = searchParams.get("restaurantId");
  const title = searchParams.get("title");

  // const { data } = useGetSearchedDishQuery({
  //   lat,
  //   lng,
  //   restro_Id,
  //   searchTerm: "burger",
  // });

  // console.log(data)
  //   console.log("Search Params", lat, lng, restro_Id);

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
  }, []);

  const [triggerSearch] = useLazyGetSearchedDishQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  // console.log("Search Term", searchTerm);

  const doSearch = useRef(
    createDebounce(async (searchTerm) => {
      if (searchTerm) {
        try {
          const response = await triggerSearch({
            lat,
            lng,
            restro_Id,
            searchTerm: searchTerm.trim(),
          }).unwrap();
          setSearchData(response?.data);
        } catch (err) {
          console.error("Error fetching search data:", err);
          setSearchData([]);
        }
      }
    }, 300)
  );

  // console.log("Search Data", searchData);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    doSearch.current(searchTerm);
  };

  const handleCross = () => {
    setSearchTerm("");
  };

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
