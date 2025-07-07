import { useParams, useLoaderData, Await } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
// import useScrollToTop from "../../utils/useScrollToTop";
import CuisineShimmer from "./CuisineShimmer";

const OnlineDeliveryRestaurant = lazy(() =>
    import("../Home/OnlineDeliveryRestaurant")
);

import {
    selectCityLatAndLng,
    selectSecondaryCity,
    setSecondaryCity
} from "../../features/cityHome/cityHomeSlice";
import BackToTopBtn from "../BackToTopBtn";
import ScooterAnimation from "../../utils/ScooterAnimation";

const MainContent = ({ data }) => {
    // const {lat, lng} = useSelector(selectCityLatAndLng)
    // console.log(lat, lng)

    const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
    const secondaryCity = useSelector(selectSecondaryCity);
    const onlineDeliveryCity = secondaryCity[0].toUpperCase() + secondaryCity.slice(1)

    const bannerText = data?.find(card => card?.card?.card?.id === "best_restaurants_header")
        ?.card?.card?.title;

    const OnlineRestaurantData = data?.find(card => card?.card?.card?.id === "restaurant_grid_listing_v2"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    return <><main className="w-full md:max-w-[1070px] mx-auto pt-20 md:pt-28 overflow-x-hidden max-md:px-1.5">
        {/* /Banner Image */}

        <div
            id="banner"
            className="flex flex-col mt-0.5 md:mt-1 mb-8 w-full bg-cover  md:h-[50vh] h-[30vh]  bg-[url('/images/food-banner.jpg')] p-5 max-md:pl-2.5 max-md:bg-right"
        >
            <h1 className="mt-auto text-white text-2xl md:text-4xl max-md:leading-6 order-2">
                {bannerText}
            </h1>
            <h2 className="md:text-4xl text-white text-3xl order-1 max-md:-mt-2">
                ZestyEats
            </h2>
        </div>

        {OnlineRestaurantData?.length !== 0 && (
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
                            data={OnlineRestaurantData}
                            heading={`Restaurants with online food delivery ${onlineDeliveryCity}`}
                        />
                    </Suspense>
                </section>
            </>
        )}
        <div className="my-5 md:hidden">
            <ScooterAnimation />
        </div>

        {/* <BackToTopBtn percentage={40} /> */}
    </main>
        <div className=" hidden md:block my-8">
            <ScooterAnimation />
        </div>
    </>
}

const CityCuisines = () => {
    const dispatch = useDispatch();
    const { data } = useLoaderData();
    const { cityName } = useParams();

    useEffect(() => {
        dispatch(setSecondaryCity(cityName))
    }, []);

    return <Suspense fallback={<>
        <main className="w-full md:max-w-[1070px] mx-auto pt-20 md:pt-28 overflow-x-hidden max-md:px-1.5">
            <CuisineShimmer />
            <div className="my-5 md:hidden">
                <ScooterAnimation />
            </div>
        </main>
        <div className="my-8 md:block hidden">
            <ScooterAnimation />
        </div>
    </>
    }>
        <Await resolve={data}>
            {data => {
                const dataToSend = data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
                return <MainContent data={dataToSend} />
            }}
        </Await>
    </Suspense>
}

export default CityCuisines;

