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
import BreadcrumbsWrapper from "../BreadcrumbsWrapper";

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

  const doSearch = useRef(createDebounce(async (searchTerm) => {
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
  }, 300));

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
    <div className="pt-24 w-full max-w-[800px] mx-auto min-h-[105vh] ">
      <div className="mt-4 mb-5">
        <BreadcrumbsWrapper
          normalTextColor={"#4a5565"}
          mainTextColor={"#101828"}
          delimiterColor={"text-gray-600"}
        />
      </div>
      <div className="flex w-full items-center gap-1.5 p-2.5 py-1.5 border-b-2 rounded-md bg-gray-200 ">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-long-fill text-3xl cursor-pointer transform hover:translate-x-[-5px] transition-all duration-300 ease-in-out"
        ></i>
        <div>
          <input
            className="text-gray-900 py-1.5 px-2 outline-none bg-transparent text-lg font-semibold"
            type="text"
            size={73}
            value={searchTerm}
            onChange={handleSearch}
            placeholder={`Search in ${title}...`}
          />
        </div>
        {searchTerm !== "" ? (
          <i
            onClick={handleCross}
            className="ri-close-large-fill text-xl cursor-pointer"
          ></i>
        ) : (
          <i className="ri-search-2-line text-xl cursor-pointer"></i>
        )}
      </div>
      <div className="p-2"></div>
    </div>
  );
};

export default RestaurantSearch;
