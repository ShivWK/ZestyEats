import homeSearchApiSlice from "../features/search/homeSearchApiSlice";
import store from "../app/store";

export const searchHomeLoader = ({ request }) => {
    const searchObj = new URL(request.url).searchParams;
    const lat = searchObj.get("lat");
    const lng = searchObj.get("lng");

    try {
        const result = store.dispatch(
            homeSearchApiSlice.endpoints.getSearchHomeData.initiate({
                lat,
                lng
            })
        )

        return { data: result};
    } catch(err) {
        console.log("Failed to fetch data", err);

        throw new Response("Failed to fetch data", {
            status: err.status,
            error: err?.data?.error
        })
    }
}
