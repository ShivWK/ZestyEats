import homeSearchApiSlice from "../features/search/homeSearchApiSlice";
import store from "../app/store";

export const searchHomeLoader = ({ request }) => {
  const searchObj = new URL(request.url).searchParams;
  const lat = searchObj.get("lat");
  const lng = searchObj.get("lng");

  const result = store.dispatch(
    homeSearchApiSlice.endpoints.getSearchHomeData.initiate({
      lat,
      lng,
    })
  );

  return { data: result };
};

export const searchSuggestionsLoader = ({ request }) => {
  const searchObj = new URL(request.url).searchParams;
  const lat = searchObj.get("lat");
  const lng = searchObj.get("lng");
  const food = searchObj.get("food");

  const result = store.dispatch(
    homeSearchApiSlice.endpoints.getSearchedFoodSuggestions.initiate({
      lat,
      lng,
      food,
    })
  );

  return { data: result };
};

export const resultDataLoader = ({ request }) => {
  const searchObj = new URL(request.url).searchParams;
  const lat = searchObj.get("lat");
  const lng = searchObj.get("lng");
  const str = searchObj.get("str");
  const metadata = searchObj.get("metadata");
  const mode = searchObj.get("mode");
  const submitAction = searchObj.get("submitAction");
  const selectedPLTab = searchObj.get("selectedPLTab")

  const result =
    mode === "parent"
      ? store.dispatch(
          homeSearchApiSlice.endpoints.getSuggestedData.initiate({
            lat,
            lng,
            str,
            metadata,
          })
        )
      : store.dispatch(
          homeSearchApiSlice.endpoints.getTabClickData.initiate({
            lat,
            lng,
            str,
            submitAction,
            selectedPLTab,
          })
        );

  return { data: result };
};

// throw new Response("Failed to fetch data", {
//             status: err.status,
//             error: err?.data?.error
//         })
