import { useParams, useLoaderData, Await } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, lazy } from "react";
import { setSecondaryCity, selectSecondaryCity, setLocalityLatAndLng } from "../../features/cityHome/cityHomeSlice";
import useScrollToTop from "../../utils/useScrollToTop";

import FoodieThoughts from "../Home/FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "../Home/TopRestaurantChains";

const OnlineDeliveryRestaurant = lazy(() => import("../Home/OnlineDeliveryRestaurant"));
const PlaceCardsContainer = lazy(() => import("../Home/PlaceCardsContainer"));

import BackToTopBtn from "../BackToTopBtn";
import HomeShimmer from "../Home/HomeShimmer";
import cityLocalityDataFetcher from "../../utils/cityLocalityDataFetcher";

const MainContent = ({ data }) => {
    const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
    const mainData = cityLocalityDataFetcher(data);
    const dispatch = useDispatch();

    const secondaryCity = useSelector(selectSecondaryCity);

    const banner_text = mainData.bannerText;
    const foodieThoughtsData = mainData.foodieData;
    const topRestaurantChainData = mainData.restaurantChain.data;
    const topRestaurantsTitle = mainData.restaurantChain.title;
    const onlineDeliveryRestaurantData = mainData.onlineRestaurant.data;
    const onlineDeliveryRestaurantTitle = mainData.onlineRestaurant.title;
    const whatEatingCuisineData = mainData.cuisines.data;
    const whatEatingCuisineTitle = mainData.cuisines.title;
    const localityLatAndLng = mainData.localityLatAndLng;

    useEffect(() => {
        dispatch(setLocalityLatAndLng(localityLatAndLng));
    })

    const whatEatingClickHandler = async (data, trigger, setLoading, updateData, dispatch, setSecondaryCity) => {
        dispatch(setSecondaryCity(secondaryCity))

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <main className="w-full md:max-w-[1070px] mx-auto pb-2 md:pb-4 pt-20 md:pt-28 overflow-x-hidden max-md:px-1.5">
            {/* /Banner Image */}

            <div
                id="banner"
                className="flex flex-col mt-0.5 md:mt-1 mb-4 md:mb-8 w-full bg-cover max-md:rounded-e-3xl md:rounded-t-4xl md:h-[50vh] h-[30vh]  bg-[url('/images/food-banner.jpg')] p-5 max-md:pl-2.5 max-md:bg-right"
            >
                <h1 className="mt-auto text-white text-2xl md:text-4xl max-md:leading-6 order-2">
                    {banner_text}
                </h1>
                <h2 className="md:text-4xl text-white text-3xl order-1 max-md:-mt-2">
                    ZestyEats
                </h2>
            </div>

            {/* Foodie Thoughts */}

            {foodieThoughtsData?.length !== 0 && (
                <>
                    <section className="w-full max-w-[1040px] mx-auto ">
                        <FoodieThoughts data={foodieThoughtsData} />
                    </section>
                    <hr className="mt-10 mb-4 md:mb-8 text-gray-400" />
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
                    <hr className="mt-10 mb-4 md:mb-8 text-gray-400" />
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
                    <hr className="mt-10 mb-4 md:mb-8 text-gray-400" />
                </>
            )}

            {/* What's city eating */}

            {whatEatingCuisineData?.length !== 0 && (
                <section
                    className="w-full md:max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col mb-7"
                >
                    <Suspense
                        fallback={
                            <div className="flex justify-between gap-4">
                                {shimmerArray.map((i) => (
                                    <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />
                                ))}
                            </div>
                        }
                    >
                        <PlaceCardsContainer
                            data={whatEatingCuisineData}
                            heading={whatEatingCuisineTitle}
                            targetedCity={secondaryCity}
                            clickHandler={whatEatingClickHandler}
                            path={"SetCuisine"}
                        />
                    </Suspense>
                </section>
            )}

            {/* <BackToTopBtn percentage={40} /> */}
        </main>
    );
};

const CityLocality = () => {
    useScrollToTop();
    const dispatch = useDispatch();
    const { cityName: city } = useParams();
    const { data } = useLoaderData();

    useEffect(() => {
        dispatch(setSecondaryCity(city));
    }, []);

    return <Suspense fallback={<main className="w-full md:max-w-[1070px] mx-auto pb-8 md:pb-10 pt-20 md:pt-28 overflow-x-hidden max-md:px-1.5">
        <HomeShimmer />
    </main>}>
        <Await resolve={data}>
            {data => {
                const cardData = data?.data?.props?.pageProps?.widgetResponse?.success?.cards;

                if (!cardData) {
                    return <main className="w-full md:max-w-[1070px] mx-auto pb-4 pt-28 md:pt-40 overflow-x-hidden max-md:px-3 flex flex-col gap-2 items-center min-h-96">
                        <p className="text-5xl">😔</p>
                        <p className="text-center mt-2 text-2xl font-bold text-gray-900">No data available for this locality right now.</p> 
                        <p className="text-center text-xl font-semibold text-gray-600">We’re working to bring more restaurants and offers to this area. Stay tuned!</p>
                    </main>
                }

                return <MainContent data={cardData} />
            }}
        </Await>
    </Suspense>
};

export default CityLocality;
