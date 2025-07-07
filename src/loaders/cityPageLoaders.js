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

export const restaurantLoader = async ({ request, params }) => {
    const urlObj = new URL(request.url).searchParams;

    const city = params.cityName.toLowerCase();
    const restaurant = urlObj.get('restaurant').toLowerCase().replace(/\s/g, "-");

    const result = store.dispatch(
        cityHomeApiSlice.endpoints.getRestaurantChainInCityData.initiate({city, restaurant})
    )

    return {data: result};
}
