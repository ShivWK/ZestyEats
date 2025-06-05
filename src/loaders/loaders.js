import store from "../app/store";
import restaurantsApi from "../features/home/restaurantsApiSlice";
import foodSpecificApiSlice from "../features/home/foodSpecificApiSlice";

export const specificRestroLoader = async ({ params }) => {
  const { lat, lng, id } = params;

  try {
    const result = store
      .dispatch(
        restaurantsApi.endpoints.getSpecificRestaurantData.initiate({
          lat,
          lng,
          id,
        })
      )
      .unwrap();

    return { data: result };
  } catch (err) {
    console.error("Failed to fetch the specific restaurant data");

    throw new Response("Failed to fetch the specific restaurant data", {
      status: err?.status,
      statusText: err?.data?.error,
    })
  }
};

export const specificFoodLoader = ({ request }) => {
    const urlObj = new URL(request.url).searchParams;
    const lat = urlObj.get("lat");
    const lng = urlObj.get("lng");
    const collection_id = urlObj.get("collection_id");
    const tags = urlObj.get("tags");

  try {
    const result = store
      .dispatch(
        foodSpecificApiSlice.endpoints.getFoodSpecificData.initiate({
          lat,
          lng,
          collection_id,
          tags,
        })
      )
      .unwrap();

    return { data: result };
  } catch (err) {
    console.log("failed to failed specific food data");

    throw new Response("failed to fetch specific food data", {
        status: err?.status,
        statusText: err?.data?.error
    })
  }
};