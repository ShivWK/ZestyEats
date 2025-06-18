import { useLoaderData, Await, NavLink } from "react-router-dom";
import { Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader";
import { useLazyGetExtraFoodSuggestionsQuery } from "../../features/search/homeSearchApiSlice";
import Ui2Shimmer from "./Ui2Shimmer";

const MainContent = ({ data }) => {
    const query = data?.data?.data?.query;
    const suggestionsData = data?.data?.data?.suggestions;
    const [suggestions, setSuggestions] = useState(suggestionsData);
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger, { isLoading }] = useLazyGetExtraFoodSuggestionsQuery();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const clickHandler = async () => {
        if (!isLoading) {
            try {
                const result = await trigger({ lat, lng, food: query }).unwrap();
                console.log(result);
            } catch (err) {
                console.log(err?.error?.data)
            }
        }
    };

    return (
        <>
            <div className="p-2">
                {suggestions.map((item) => {
                    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item?.cloudinaryId}`;

                    const urlObj = new URL(item?.cta?.link).searchParams;
                    const str = urlObj.get("query");
                    const metadata = urlObj.get("metadata");

                    const path = `/search/searchResult?lat=${lat}&lng=${lng}&str=${str}&metadata=${metadata}&type=${item?.tagToDisplay}`;
                    return (
                        <NavLink to={path} key={item?.cloudinaryId} className="flex gap-3 my-2 p-2 hover:bg-gray-200 rounded cursor-pointer">
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
                className={`flex gap-3 my-2 p-2 hover:bg-gray-200 rounded border-2 border-gray-300 ${isLoading ? "cursor-none" : "cursor-pointer"}`}
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
        <Suspense fallback={<Ui2Shimmer />}>
            <Await resolve={data}>{(data) => <MainContent data={data} />}</Await>
        </Suspense>
    );
};

export default SearchSuggestions;

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999
// 
// &str=Burger
// 
// -----&trackingId=undefine
// 
// &submitAction=SUGGESTION
// 
// -----&queryUniqueId=b3a0cb70-ae51-44e3-9cae-19511887a6d0&
// 
// metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22Autosuggest%2FTop%2520200%2520queries%2FBurger.png%22%2C%22dishFamilyId%22%3A%22846649%22%2C%22dishFamilyIds%22%3A%5B%22846649%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D {{Dish}}


// https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Wendy%27s%20Burgers&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=88356873-6d9c-87dc-62e3-284b01dc5ba9&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A972%2C%22primaryRestaurantId%22%3A382636%2C%22cloudinaryId%22%3A%22RX_THUMBNAIL%2FIMAGES%2FVENDOR%2F2025%2F1%2F11%2F097020c5-09e8-4430-96fb-77ef985c2935_382636.JPG%22%2C%22brandId%22%3A972%2C%22dishFamilyId%22%3A%22846649%22%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D {{Restro}}


"swiggy://explore?query=Wendy%27s%20Burgers&metadata=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A972%2C%22primaryRestaurantId%22%3A382636%2C%22cloudinaryId%22%3A%22RX_THUMBNAIL%2FIMAGES%2FVENDOR%2F2025%2F1%2F11%2F097020c5-09e8-4430-96fb-77ef985c2935_382636.JPG%22%2C%22brandId%22%3A972%2C%22dishFamilyId%22%3A%22846649%22%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D&marketplace=%7B%22marketplaceId%22%3A%22SWIGGY%22%2C%22businessLineId%22%3A%22FOOD%22%7D"





// https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9628669&lng=77.57750899999999&str=Veg%20Burger&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0c382364-7f59-4ee1-e959-7fca875f8996&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22n9bkfix37ohwikvjlzyg%22%2C%22dishFamilyId%22%3A%22846649%22%2C%22dishTypeId%22%3A%22847558%22%2C%22dishFamilyIds%22%3A%5B%22846649%22%5D%2C%22dishTypeIds%22%3A%5B%22847558%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D {{DIsh}}
