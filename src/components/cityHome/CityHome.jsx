import { useLoaderData, Await, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Suspense, useEffect } from "react";
import ShimmerContainer from "./ShimmerContainer";
import { setCity } from "../../features/cityHome/cityHomeSlice";
import FoodieThoughts from "../Home/FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "../Home/TopRestaurantChains";
import OnlineDeliveryRestaurant from "../Home/OnlineDeliveryRestaurants/OnlineDeliveryRestaurant";
import PlaceCardsContainer from "../Home/PlaceCardsContainer";

const MainContent = ({ data }) => {
    const shimmerArray = Array.from({ length: 4 }, (_, i) => i);

    const mainData = data?.props?.pageProps?.widgetResponse?.success;
    const pageOffset = mainData?.pageOffset;
    const nextFetch = mainData?.nextFetch;
    const cards = mainData?.cards;

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
    ).card?.card?.title;

    const LocalitiesData =  cards?.find((item) => item?.card?.card?.id === "area_list")?.areas;
    const whatEatingCuisineData = cards?.find((item) => item?.card?.card?.id === "cuisines_near_you")?.cuisines;
    const restaurantChainInCityData = cards?.find((item) => item?.card?.card?.id === "brand_page_links")?.brands;
    const popularDishesData = cards?.find((item) => item?.card?.card?.id === "dish_page_links")?.brands;

    return (
        <main className="w-full md:max-w-[1070px] mx-auto pb-14 pt-28 overflow-x-hidden max-md:px-1.5">
            {/* /Banner Image */}

            <div id="banner" className="relative mt-1 mb-8">
                <img
                    src="/images/food-banner.jpg"
                    alt="page banner image"
                    className="w-full object-cover rounded-3xl h-[50vh]"
                />
                <h1 className="absolute top-[70%] left-[3%] text-white text-4xl ">{banner_text}</h1>
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

            {/* {bestCuisionsNearMe?.length !== 0 && (
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
                        <PlaceCardsContainer data={bestCuisionsNearMe} />
                    </Suspense>
                </section>
                <hr className="mt-10 mb-8 text-gray-400" />
            </>
        )} */}
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
