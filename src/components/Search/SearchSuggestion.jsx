import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useLazyGetSearchedFoodSuggestionsQuery } from "../../features/search/homeSearchApiSlice";

const SearchSuggestions = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trigger] = useLazyGetSearchedFoodSuggestionsQuery();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const food = searchParams.get("food");

    useEffect(() => {
        const triggerFunction = async () => {
            try {
                const res = await trigger({lat, lng, food}).unwrap();
                console.log(res);
            } catch(err) {
                console.log(err);
            }
        }

        triggerFunction()
    }, []) 

    return <h1>Suggestions</h1>
}

export default SearchSuggestions;