import { useLoaderData, Await, NavLink } from "react-router-dom";
import { Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import { useLazyGetExtraFoodSuggestionsQuery } from "../../features/search/homeSearchApiSlice";

const MainContent = ({ data }) => {
    const query = data?.data?.data?.query;
    const suggestionsData = data?.data?.data?.suggestions;
    const [suggestions, setSuggestions] = useState(suggestionsData);
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { isLoading }] = useLazyGetExtraFoodSuggestionsQuery();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const clickHandler = async () => {
        try {
            const result = await trigger({ lat, lng, food: query }).unwrap();
            console.log(result);
        } catch (err) {
            console.log(err?.error?.data)
        }
    };

    return (
        <>
            <div className="p-2">
                {suggestions.map((item) => {
                    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item?.cloudinaryId}`;
                    return (
                        <NavLink className="flex gap-3 my-2 p-2 hover:bg-gray-200 rounded cursor-pointer">
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
                })}
            </div>
            <div
                onClick={clickHandler}
                className="flex gap-3 my-2 p-2 hover:bg-gray-200 rounded cursor-pointer border-2 border-gray-300"
            >
                <div className="rounded h-14 w-14 flex items-center justify-center border-2 border-gray-200">
                    <i className="ri-search-2-line text-3xl cursor-pointer"></i>
                </div>
                <div className="flex items-center">
                    {isLoading ? (
                        <Loader size={"small"} />
                    ) : (
                        <p>
                            See all results for <span className="font-bold">{query}</span>
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

const SearchSuggestions = () => {
    const { data } = useLoaderData();

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={data}>{(data) => <MainContent data={data} />}</Await>
        </Suspense>
    );
};

export default SearchSuggestions;
