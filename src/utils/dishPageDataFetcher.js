const dishPageDataFetcher = ( cards ) => {
    const title = cards?.find(item => item?.card?.card?.id === "popular_restaurants_title")
                    ?.card?.card?.title || "Best Restaurants for your dish" ;

    const dishesData = cards?.find(item => item?.card?.card?.id === "dish_group_grid_widget")
                    ?.card?.card?.gridElements?.infoWithStyle?.dishGroups;

    const { lat, lng }= cards?.at(-1)?.card?.card;

    return {
        heading: title,
        data: dishesData,
        latLng: {lat, lng}
    }
}

export default dishPageDataFetcher;