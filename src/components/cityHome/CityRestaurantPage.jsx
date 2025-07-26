import Cards from "../Home/Cards";
import { useDispatch, useSelector } from "react-redux";
import { setSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import { selectVegVariant } from "../../features/home/restaurantsSlice";
import { Suspense, useEffect, useState } from "react";
import BreadcrumbsWrapper from "../BreadcrumbsWrapper";
import Filter from "../Home/Filters";
import ScooterAnimation from "../../utils/ScooterAnimation";
import { Await, useParams, useLoaderData } from "react-router-dom";
import ShimmerContainer from "../FoodSpecific/ShimmerContainer";

const MainContainer = ({ data }) => {
    const { vegOption, nonVegOption } = useSelector(selectVegVariant);

    const restaurantTitle = data?.find(card => card?.card?.card?.id === "popular_restaurants_title")?.card?.card?.title;

    const info = data?.find(card => card?.card?.card?.id === "restaurant_grid_listing_v2");

    if (!info) {
        return <main className="relative flex flex-col justify-center gap-3 md:gap-5 w-full overflow-hidden md:max-w-[1210px] md:pt-32 pt-20 p-3 mx-auto pb-4 md:pb-5 h-72">
            <p className="text-5xl text-center">😞</p>
            <p className="text-gray-800 font-semibold text-center">Oops! No outlets found right now.
                This restaurant doesn’t have any active locations at the moment.</p>
        </main>
    } else {
        const mainData = info?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        const dataToMap = mainData.map(data => data?.info)

        return (
            <>
                <main className="relative flex flex-col gap-3 md:gap-5 w-full overflow-hidden md:max-w-[1210px] md:pt-32 pt-20 p-2 pb-0 mx-auto">
                    <div>
                        <BreadcrumbsWrapper
                            normalTextColor={"#4a5565"}
                            mainTextColor={"#101828"}
                            delimiterColor={"text-gray-600"}
                        />
                    </div>
                    <h1 className="heading dark:text-white text-black md:text-4xl text-2xl font-bold tracking-tight mx-0">
                        {restaurantTitle}
                    </h1>
                    <p className="description md:text-lg font-medium md:-mt-4 -mt-2 mb-2 text-gray-800 max-md:leading-6 dark:text-gray-300">
                        Hungry? ZestyEats has you covered. Explore and order from multiple outlets in just a few taps.
                    </p>
                    <div className="md:-mt-5 -mt-4 -mb-1 md:-mb-2">
                        <Filter />
                    </div>
                    <div className="restro-count text-2xl font-bold tracking-tight dark:text-gray-200">
                        <p>Where Do You Want to Order From?</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex w-full gap-9 p-1 flex-wrap">
                            {dataToMap.map((item, index) => {

                                if (!vegOption && item.veg) return;
                                if (!nonVegOption && !item.veg) return;

                                return <Cards key={index} data={item} from="specificFood" />;
                            })}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <ScooterAnimation />
                    </div>
                </main>
                <div className="hidden md:block">
                    <ScooterAnimation />
                </div>
            </>
        );
    }
};

const CityRestaurantPage = () => {
    const dispatch = useDispatch();
    const { data } = useLoaderData();
    const { cityName } = useParams();

    useEffect(() => {
        dispatch(setSecondaryCity(cityName))
    }, []);

    return <Suspense fallback={<ShimmerContainer />}>
        <Await resolve={data}>
            {data => {
                const dataToMAp = data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
                console.log(dataToMAp)

                return <MainContainer data={dataToMAp} />
            }
            }
        </Await>
    </Suspense>
}

export default CityRestaurantPage;
