import homeSearchApiSlice from "../features/search/homeSearchApiSlice";
import store from "../app/store";

export const searchHomeLoader = ({ request }) => {
    const searchObj = new URL(request.url).searchParams;
    const lat = searchObj.get("lat");
    const lng = searchObj.get("lng");

    const result = store.dispatch(
        homeSearchApiSlice.endpoints.getSearchHomeData.initiate({
            lat,
            lng
        })
    )

    return { data: result };
}

export const searchSuggestionsLoader = ({ request }) => {
    const searchObj = new URL(request.url).searchParams;
    const lat = searchObj.get("lat");
    const lng = searchObj.get("lng");
    const food = searchObj.get("food");

    const result = store.dispatch(
        homeSearchApiSlice.endpoints.getSearchedFoodSuggestions.initiate({
            lat,
            lng,
            food
        })
    )

    return { data: result };
}

export const resultDataLoader = () => {
    const searchObj = new URL(request.url).searchParams;
    const lat = searchObj.get("lat");
    const lng = searchObj.get("lng");
    const str = searchObj.get("str");
    const metadata = searchObj.get("metadata");

    const result = store.dispatch(
        homeSearchApiSlice.endpoints.getSearchedFoodSuggestions.initiate({
            lat,
            lng,
            str,
            metadata
        })
    )

    return { data: result };
}


// throw new Response("Failed to fetch data", {
//             status: err.status,
//             error: err?.data?.error
//         })