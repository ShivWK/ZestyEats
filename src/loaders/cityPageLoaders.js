import cityHomeApiSlice from "../features/cityHome/cityHomeApiSlice"
import store from "../app/store";

export const cuisineLoader = async ({ request, params }) => {
    const urlObj = new URL(request.url).searchParams;

    const city = params.cityName.toLowerCase().replace(/\s/g, "-");
    const type = urlObj.get('cuisine') + "-cuisine-"

    const result = store.dispatch(
        cityHomeApiSlice.endpoints.getDataForCityLocalityCuisine.initiate({city, type})
    )

    return {data: result};
}

export const restaurantLoader = async ({ request, params }) => {
    const urlObj = new URL(request.url).searchParams;

    const city = params.cityName.toLowerCase().replace(/\s/g, "-");
    const restaurant = urlObj.get('restaurant').toLowerCase().replace(/\s/g, "-");

    const result = store.dispatch(
        cityHomeApiSlice.endpoints.getRestaurantChainInCityData.initiate({city, restaurant})
    )

    return {data: result};
}

export const localityLoader = async ({ params }) => {
    const city = params.cityName.toLowerCase().replace(/\s/g, "-");
    const type = params.locality.toLowerCase().replace(/\s/g, "-") + "-";

    const result = store.dispatch(
        cityHomeApiSlice.endpoints.getDataForCityLocalityCuisine.initiate({city, type})
    )

    return {data: result};
}

export const dishLoader = async ({ params }) => {
    const city = params.cityName.toLowerCase().replace(/\s/g, "-");
    const dish = params.dish.toLowerCase().replace(/\s/g, "-");

    const result = store.dispatch(
        cityHomeApiSlice.endpoints.getDishInCityData.initiate({city, dish})
    )

    return {data: result};
}