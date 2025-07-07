import cityHomeApiSlice from "../features/cityHome/cityHomeApiSlice"
import store from "../app/store";

export const cuisineLoader = async ({ request, params }) => {
    const urlObj = new URL(request.url).searchParams;

    const city = params.cityName.toLowerCase();
    const type = urlObj.get('cuisine') + "-cuisine-"

    const result = store.dispatch(
        cityHomeApiSlice.endpoints.getDataForCityLocalityCuisine.initiate({city, type})
    )

    return {data: result};
}