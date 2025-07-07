const cityLocalityDataFetcher = ( cards ) => {
    const bannerText = cards?.find((item) => item?.card?.card?.id === "best_restaurants_header")
                    ?.card?.card?.title || "";

    const foodieData = cards?.find((item) => item?.card?.card?.id === "whats_on_your_mind")
                    ?.card?.card?.imageGridCards?.info || [];

    const topChainRestaurantData = cards?.find((item) => item?.card?.card?.id === "top_brands_for_you")
                    ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    const topChainRestaurantTitle = cards?.find((item) => item?.card?.card?.id === "top_brands_for_you")
                    ?.card?.card?.header?.title;

    const onlineDeliveryRestaurantData =  cards?.find((item) => item?.card?.card?.id === "restaurant_grid_listing_v2")?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    const onlineDeliveryRestaurantTitle = cards?.find((item) => item?.card?.card?.id === "popular_restaurants_title")?.card?.card?.title;

    const cuisineData = cards?.find((item) => item?.card?.card?.id === "cuisines_near_you")
                    ?.card?.card?.cuisines || [];
    const cuisineTitle = cards?.find((item) => item?.card?.card?.id === "cuisines_near_you")
                    ?.card?.card?.title;

    const { lat, lng } = cards.at(-1)?.card?.card;
                    
    return {
        bannerText,
        foodieData,
        restaurantChain: {data: topChainRestaurantData, title: topChainRestaurantTitle},
        onlineRestaurant: {data: onlineDeliveryRestaurantData, title: onlineDeliveryRestaurantTitle},
        cuisines: {data: cuisineData, title: cuisineTitle},
        localityLatAndLng: {lat, lng}
    }
}

export default cityLocalityDataFetcher