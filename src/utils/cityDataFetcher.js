const cityDataFetcher = (cards) => {
    const banner_text = cards.find(
        (item) => item?.card?.card?.id === "best_restaurants_header"
    )?.card?.card?.title;

    const foodieThoughtsData =
        cards?.find((item) => item?.card?.card?.id === "whats_on_your_mind")?.card
            ?.card?.imageGridCards?.info || [];

    const topRestaurantChainData =
        cards?.find((item) => item?.card?.card?.id === "top_brands_for_you")
            ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    const topRestaurantsTitle = cards?.find((item) => item?.card?.card?.id === "top_brands_for_you")
        ?.card?.card?.header?.title;

    const onlineDeliveryRestaurantData =
        cards?.find((item) => item?.card?.card?.id === "restaurant_grid_listing_v2")
            ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    const onlineDeliveryRestaurantTitle = cards?.find(
        (item) => item?.card?.card?.id === "popular_restaurants_title"
    )?.card?.card?.title;

    const localitiesObject = cards?.find((item) => item?.card?.card?.id === "area_list")
        ?.card?.card;
    const localitiesTitle = localitiesObject?.title;
    const localitiesData = localitiesObject?.areas;

    const whatEatingCuisineObject = cards?.find((item) => item?.card?.card?.id === "cuisines_near_you")
        ?.card?.card;
    const whatEatingCuisineTitle = whatEatingCuisineObject?.title;
    const whatEatingCuisineData = whatEatingCuisineObject?.cuisines;

    const restaurantChainInCityObject = cards?.find((item) => item?.card?.card?.id === "brand_page_links")
        ?.card?.card;
    const restaurantChainInCityTitle = restaurantChainInCityObject?.title;
    const restaurantChainInCityData = restaurantChainInCityObject?.brands;

    const popularDishesObject = cards?.find((item) => item?.card?.card?.id === "dish_page_links")
        ?.card?.card;
    const popularDishesTitle = popularDishesObject?.title;
    const popularDishesData = popularDishesObject?.brands;

    return {
        banner_text,
        foodieThoughtsData,
        topRestaurantChain: {
            data: topRestaurantChainData,
            title: topRestaurantsTitle
        },
        onlineDeliveryRestaurant: {
            data: onlineDeliveryRestaurantData,
            title: onlineDeliveryRestaurantTitle,
        },
        localities: {
            data: localitiesData,
            title: localitiesTitle
        },
        cuisines: {
            data: whatEatingCuisineData,
            title: whatEatingCuisineTitle
        },
        restaurantChainInCity: {
            data: restaurantChainInCityData,
            title: restaurantChainInCityTitle
        },
        popularDishes: {
            data: popularDishesData,
            title: popularDishesTitle
        }
    }
}

export default cityDataFetcher;