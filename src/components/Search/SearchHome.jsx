import { Suspense, useEffect, useState } from "react";
import {
  useLoaderData,
  Await,
  NavLink,
  useSearchParams,
  useOutletContext
} from "react-router-dom";
import useScrollToTop from "../../utils/useScrollToTop";
import Ui1Shimmer from "./Ui1Shimmer";
import { useLazyGetSearchedFoodSuggestionsQuery } from "../../features/search/homeSearchApiSlice";
import { selectSuggestionsLoading, selectSuggestions, selectTabSuggestionData, selectTabQueryData, setTabQueryData, setTapSuggestionData } from "../../features/search/homeSearchSlice";
import { useSelector, useDispatch } from "react-redux";
import Ui2Shimmer from "./Ui2Shimmer";

const MainContent = ({ data }) => {
  useScrollToTop();
  const [isLoading, setLoading] = useState(false);
  const query = useSelector(selectTabQueryData);
  const suggestionsData = useSelector(selectTabSuggestionData);

  const dispatch = useDispatch();

  const suggestionLoading = useSelector(selectSuggestionsLoading);
  const storeSuggestionsData = useSelector(selectSuggestions);

  const [trigger] = useLazyGetSearchedFoodSuggestionsQuery();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const searchTerm = useOutletContext();

  const cards = data?.data?.data?.cards;
  const itemCards = cards?.[1]?.card?.card?.imageGridCards?.info;

  useEffect(() => {
    if ((storeSuggestionsData && storeSuggestionsData?.length !== 0)) {
      dispatch(setTapSuggestionData([]));
      dispatch(setTabQueryData(""))
    }
  }, [storeSuggestionsData])

  //  if ((storeSuggestionsData && storeSuggestionsData?.length !== 0)) {
  //     dispatch(setTapSuggestionData([]));
  //     dispatch(setTabQueryData(""))
  //   }

  const clickHandler = async (food) => {
    setLoading(true);
    dispatch(setTabQueryData(food))

    try {
      const data = await trigger({ lat, lng, food }).unwrap();
      dispatch(setTapSuggestionData(data?.data?.suggestions));
      setLoading(false);
    } catch (err) {
      console.log("Can't fetch suggestion data", err);
      setLoading(false);
      throw new Error("Can't fetch suggestions data");
    }
  }

  console.log(query, suggestionsData, isLoading);

  const dataToMap = suggestionsData?.length !== 0 ? suggestionsData : storeSuggestionsData;

  console.log("mapping", suggestionsData, "qury", query, storeSuggestionsData)

  return ((searchTerm !== "" || query) ? (
    (isLoading || suggestionLoading) ?
      <Ui2Shimmer />
      : (<>
        <div className="p-2 mt-14">
          {query !== "" && <button onClick={() => dispatch(setTabQueryData(""))} className="w-fit flex items-center cursor-pointer">
          <i className="ri-arrow-drop-left-line text-4xl -ml-3.5"></i>
          <p className="-ml-1 font-medium">Back</p>
        </button>}
          {((suggestionsData && suggestionsData?.length !== 0) || storeSuggestionsData) ? dataToMap?.map((item) => {
            const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item?.cloudinaryId}`;

            const urlObj = new URL(item?.cta?.link).searchParams;
            const str = encodeURIComponent(item?.text);

            const metadata = encodeURIComponent(urlObj.get("metadata"));

            const urlRestaurant = `/search/searchResult/restaurantPage?lat=${lat}&lng=${lng}&str=${str}&metadata=${metadata}&type=${item?.tagToDisplay}&name=${item?.text}&mode=parent`;

            const urlDish = `/search/searchResult/dishPage?lat=${lat}&lng=${lng}&str=${str}&metadata=${metadata}&type=${item?.tagToDisplay}&name=${item?.text}&mode=parent`;

            const urlCuisine = `/search/searchResult/cuisinesPage?lat=${lat}&lng=${lng}&str=${str}&metadata=${metadata}&type=${item?.tagToDisplay}&name=${item?.text}&mode=parent`;

            const path = item?.tagToDisplay === "Restaurant" ? urlRestaurant : item?.tagToDisplay === "Cuisine" ? urlCuisine : urlDish;

            return (
              <NavLink to={path} key={item?.cloudinaryId} className="flex gap-3 my-2 p-2 hover:bg-gray-200 rounded cursor-pointer border-[1px] border-gray-300">
                <img
                  className="rounded"
                  src={imageUrl}
                  alt="Image rendered"
                  height={70}
                  width={70}
                />
                <div className="flex flex-col justify-center">
                  <p className="font-bold">{item?.text}</p>
                  <p>{item?.tagToDisplay}</p>
                </div>
              </NavLink>
            );
          }) : <p className="text-gray-500 text-center py-3">No result for this search.</p>}
        </div>
        {((suggestionsData && suggestionsData?.length !== 0) || (storeSuggestionsData && storeSuggestionsData?.length !== 0)) && (
          <NavLink
            to={`/search/searchResult/dishPage?lat=${lat}&lng=${lng}&str=${query || searchTerm}&submitAction=STORED_SEARCH&selectedPLTab=DISH&mode=tab&type=Dish&name=${query || searchTerm}`}
            className={`flex gap-3 my-2 p-2 hover:bg-gray-200 rounded border-2 border-gray-300`}
          >
            <div className="rounded h-14 w-14 flex items-center justify-center border-2 border-gray-200">
              <i className="ri-search-2-line text-3xl cursor-pointer"></i>
            </div>
            <div className="flex items-center">
              <p>
                See all dishes and restaurants for <span className="font-bold">{decodeURI(query || searchTerm)}</span>
              </p>
            </div>
          </NavLink>
        )

        }
      </>)
  ) :
    <div className="flex flex-col mx-auto gap-5 mt-16">
      {itemCards?.length > 0 && (
        <>
          <h1>Popular Cuisines</h1>
          <div className="flex w-fit flex-wrap justify-evenly">
            {itemCards.map((item) => {
              const queryObj = new URL(item?.action?.link).searchParams;
              return (
                <button
                  key={item.id}
                  className="shimmerBg md:h-[160px] w-[130px] rounded-xl shrink-0 cursor-pointer"
                  onClick={() => clickHandler(queryObj.get("query"))}
                >
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item?.imageId}`}
                    alt="food category images"
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>

  );
};

const SearchHome = () => {
  const data = useLoaderData();
  useScrollToTop();

  const storeSuggestionsData = useSelector(selectSuggestions);
  const tabSuggestionsData = useSelector(selectTabSuggestionData);

  return (
    <Suspense fallback={(storeSuggestionsData?.length !== 0 || tabSuggestionsData?.length !== 0) ? <Ui2Shimmer /> : <Ui1Shimmer />}>
      <Await resolve={data?.data}>
        {(resolveData) => <MainContent data={resolveData} />}
      </Await>
    </Suspense>
  );
};

export default SearchHome;


