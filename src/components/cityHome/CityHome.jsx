import { useLoaderData, Await, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Suspense, useEffect } from "react";
import ShimmerContainer from "./ShimmerContainer";
import { setCity } from "../../features/cityHome/cityHomeSlice";
import FoodieThoughts from "../Home/FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "../Home/TopRestaurantChains";
import OnlineDeliveryRestaurant from "../Home/OnlineDeliveryRestaurant";
import PlaceCardsContainer from "../Home/PlaceCardsContainer";
import cityDataFetcher from "../../utils/cityDataFetcher";

const MainContent = ({ data }) => {
    console.log(data)
    const shimmerArray = Array.from({ length: 4 }, (_, i) => i);

    const mainData = data?.props?.pageProps?.widgetResponse?.success;
    const pageOffset = mainData?.pageOffset;
    const nextFetch = mainData?.nextFetch;
    const cards = mainData?.cards;

    // const dataObject = cityDataFetcher(cards)

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

    // const banner_text = dataObject.banner_text;

    // const foodieThoughtsData = dataObject.foodieThoughtsData;

    // const topRestaurantChainData = dataObject.topRestaurantChain.data;
    // const topRestaurantsTitle = dataObject.topRestaurantChain.title;

    // const onlineDeliveryRestaurantData = dataObject.onlineDeliveryRestaurant.data;
    // const onlineDeliveryRestaurantTitle = dataObject.onlineDeliveryRestaurant.title;

    // const localitiesTitle = dataObject.localities.data;
    // const localitiesData = dataObject.localities.title;

    // const whatEatingCuisineTitle = dataObject.cuisines.data;
    // const whatEatingCuisineData = dataObject.cuisines.title;

    // const restaurantChainInCityTitle = dataObject.restaurantChainInCity.data;
    // const restaurantChainInCityData = dataObject.restaurantChainInCity.title;

    // const popularDishesTitle = dataObject.popularDishes.data;
    // const popularDishesData = dataObject.popularDishes.title;

    return (
        <main className="w-full md:max-w-[1070px] mx-auto pb-14 pt-24 md:pt-28 overflow-x-hidden max-md:px-1.5">
            {/* /Banner Image */}

            <div id="banner" className="flex flex-col mt-0.5 md:mt-1 mb-8 w-full bg-cover  md:h-[50vh] h-[30vh]  bg-[url('/images/food-banner.jpg')] p-5 max-md:bg-right">
                <h1 className="mt-auto text-white text-2xl md:text-4xl max-md:leading-6 order-2">{banner_text}</h1>
                <h2 className="md:text-4xl text-white text-3xl order-1 max-md:-mt-2">ZestyEats</h2>
            </div>

            {/* Foodie Thoughts */}

            {foodieThoughtsData?.length !== 0 && (
                <>
                    <section className="w-full max-w-[1040px] mx-auto ">
                        <FoodieThoughts data={foodieThoughtsData} />
                    </section>
                    <hr className="mt-10 mb-8 text-gray-400" />
                </>
            )}

            {topRestaurantChainData?.length !== 0 && (
                <>
                    <section className="w-full max-w-[1040px] mx-auto">
                        <Suspense
                            fallback={
                                <div className="flex justify-between">
                                    {shimmerArray.map((i) => (
                                        <div key={i} className=" w-60 h-44 rounded-xl shimmerBg" />
                                    ))}
                                </div>
                            }
                        >
                            <TopRestaurantChains
                                data={topRestaurantChainData}
                                heading={topRestaurantsTitle}
                            />
                        </Suspense>
                    </section>
                    <hr className="mt-10 mb-8 text-gray-400" />
                </>
            )}

            {onlineDeliveryRestaurantData?.length !== 0 && (
                <>
                    <section className="w-full">
                        <Suspense
                            fallback={
                                <div className="flex justify-between">
                                    {shimmerArray.map((i) => (
                                        <div key={i} className=" w-60 h-44 rounded-xl shimmerBg" />
                                    ))}
                                </div>
                            }
                        >
                            <OnlineDeliveryRestaurant
                                data={onlineDeliveryRestaurantData}
                                heading={onlineDeliveryRestaurantTitle}
                            />
                        </Suspense>
                    </section>
                    <hr className="mt-10 mb-8 text-gray-400" />
                </>
            )}

            {/* Localities */}

            {localitiesData?.length !== 0 && (
                <>
                    <section
                        className="w-full max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col"
                    >
                        <Suspense
                            fallback={
                                <div className="flex justify-between gap-4">
                                    {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
                                </div>
                            }
                        >
                            <PlaceCardsContainer data={localitiesData} heading={localitiesTitle} pathLogic={() => { }} />
                        </Suspense>
                    </section>
                    <hr className="mt-10 mb-8 text-gray-400" />
                </>
            )}

            {/* What's city eating */}

            {whatEatingCuisineData?.length !== 0 && (
                <>
                    <section
                        className="w-full max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col"
                    >
                        <Suspense
                            fallback={
                                <div className="flex justify-between gap-4">
                                    {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
                                </div>
                            }
                        >
                            <PlaceCardsContainer data={whatEatingCuisineData} heading={whatEatingCuisineTitle} pathLogic={() => { }} />
                        </Suspense>
                    </section>
                    <hr className="mt-10 mb-8 text-gray-400" />
                </>
            )}

            {/*  */}

            {restaurantChainInCityData?.length !== 0 && (
                <>
                    <section
                        className="w-full max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col"
                    >
                        <Suspense
                            fallback={
                                <div className="flex justify-between gap-4">
                                    {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
                                </div>
                            }
                        >
                            <PlaceCardsContainer data={restaurantChainInCityData} heading={restaurantChainInCityTitle} pathLogic={() => { }} />
                        </Suspense>
                    </section>
                    <hr className="mt-10 mb-8 text-gray-400" />
                </>
            )}

            {/* Popular dishes */}

            {popularDishesData?.length !== 0 && (
                <>
                    <section
                        className="w-full max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col"
                    >
                        <Suspense
                            fallback={
                                <div className="flex justify-between gap-4">
                                    {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
                                </div>
                            }
                        >
                            <PlaceCardsContainer data={popularDishesData} heading={popularDishesTitle} pathLogic={() => { }} />
                        </Suspense>
                    </section>
                </>
            )}

        </main>
    );
};

const CityHome = () => {
    const dispatch = useDispatch();
    const { data } = useLoaderData();
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city");

    useEffect(() => {
        dispatch(setCity(city));
    }, []);

    return (
        <Suspense fallback={<ShimmerContainer />}>
            <Await resolve={data}>{(data) => <MainContent data={data} />}</Await>
        </Suspense>
    );
};

export default CityHome;
