import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import { useLazyGetExtraFoodSuggestionsQuery } from "../../features/search/homeSearchApiSlice";
import Ui2Shimmer from "./Ui2Shimmer";
import useScrollToTop from "../../utils/useScrollToTop";
import { selectSuggestions, selectSuggestionsLoading } from "../../features/search/homeSearchSlice";
import { useSelector } from "react-redux";
import { useState } from "react";

const MainContent = () => {
    const data = useSelector(selectSuggestions);
    const [isError , setIsError] = useState(false)

    const query = data?.data?.query;
    const suggestionsData = data?.data?.suggestions;
    const [searchParams] = useSearchParams();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <>
            <div className="p-2 mt-14">
                {(suggestionsData && suggestionsData?.length !== 0) ? suggestionsData?.map((item) => {
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
                                src={ isError ? "/images/fallback.png" : imageUrl}
                                alt="Image rendered"
                                height={70}
                                width={70}
                                onError={() => setIsError(true)}
                            />
                            <div className="flex flex-col justify-center">
                                <p className="font-bold">{item?.text}</p>
                                <p>{item?.tagToDisplay}</p>
                            </div>
                        </NavLink>
                    );
                }) : <p className="text-gray-500 text-center py-3">No result for this search.</p>}
            </div>
            {(suggestionsData && suggestionsData?.length !== 0) && (
                <NavLink
                    to={`/search/searchResult/dishPage?lat=${lat}&lng=${lng}&str=${query}&submitAction=STORED_SEARCH&selectedPLTab=DISH&mode=tab&type=Dish&name=${query}`}
                    className={`flex gap-3 my-2 p-2 hover:bg-gray-200 rounded border-2 border-gray-300`}
                >
                    <div className="rounded h-14 w-14 flex items-center justify-center border-2 border-gray-200">
                        <i className="ri-search-2-line text-3xl cursor-pointer"></i>
                    </div>
                    <div className="flex items-center">
                        <p>
                            See all results for <span className="font-bold">{decodeURI(query)}</span>
                        </p>
                    </div>
                </NavLink>
            )

            }
        </>
    );
};

const SearchSuggestions = () => {
    const isLoading = useSelector(selectSuggestionsLoading);
    useScrollToTop()

    return isLoading ? <Ui2Shimmer />
        : <MainContent />;
};

export default SearchSuggestions;

