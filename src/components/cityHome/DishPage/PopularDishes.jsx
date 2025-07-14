import { useLoaderData, Await, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import dishPageDataFetcher from "../../../utils/dishPageDataFetcher";
import BreadcrumbsWrapper from "../../BreadcrumbsWrapper";
import ScooterAnimation from "../../../utils/ScooterAnimation";
import RestaurantCart from "./RestaurantCard";
import DishShimmer from "./DishShimmer";
import { useDispatch } from "react-redux";
import { setSecondaryCity } from "../../../features/cityHome/cityHomeSlice";
import BackToTopBtn from "../../BackToTopBtn";

const MainData = ({ data }) => {
    // console.log(data)

    const mainData = dishPageDataFetcher(data);
    const dish = decodeURIComponent(useLocation().pathname.split("/").at(-1));

    if (mainData?.data) {
        const [lastLength, setLastLength] = useState(10);
        const [isComplete, setComplete] = useState(false);
        const [currentDataSet, setCurrentDataSet] = useState(mainData.data.slice(0, lastLength));

        const loadMoreClickHandler = () => {
            setCurrentDataSet(prv => [...prv, ...mainData.data.slice(lastLength, lastLength + 10)]);
            setLastLength(prv => prv + 10);

            if (currentDataSet.length === mainData.data.length) setComplete(true);
        }

        return <>
        <main className="w-full md:max-w-[1070px] mx-auto overflow-hidden pb-2 md:pb-6 pt-[5rem] md:pt-28 overflow-x-hidden max-md:px-2 flex flex-col gap-2.5 md:gap-5 min-h-96">
                    <section className="self-start">
                        <BreadcrumbsWrapper />
                    </section>
                    <h1 className="max-md:leading-6 text-xl md:text-3xl">{mainData.heading}</h1>
                    <section className="flex flex-col gap-0.5 md:gap-1 bg-gray-200 rounded p-1 pb-4 pt-3 md:p-7 mt-2 md:pb-5">
                        <h2 className="text-gray-800 text-[1.10rem] font-bold md:text-xl ml-1.5">{`${mainData.data.length} dishes found for ${dish}`}</h2>
                        <div className="">
                            {currentDataSet.map(obj => <RestaurantCart key={obj.restaurant.info.id} data={obj} latLng={mainData.latLng} />)}
                        </div>
                        {!isComplete && (
                            <button onClick={loadMoreClickHandler} className="px-4 py-1 border-[1px] border-primary rounded bg-primary text-white font-semibold w-fit self-center cursor-pointer active:scale-95 active:bg-gray-300 active:border-gray-500 active:text-black transition-all duration-100 ease-linear ">Load more</button>
                        )}
                    </section>
                    <div className="md:hidden -mb-5">
                        <ScooterAnimation />
                    </div>
                    <BackToTopBtn />
        </main>
            <div className="hidden md:block -mb-2.5">
                <ScooterAnimation />
            </div>
        </>
    } else {
        return <main className="w-full md:max-w-[1070px] mx-auto overflow-hidden pb-2 md:pb-6 pt-[5rem] md:pt-28 overflow-x-hidden max-md:px-2 flex flex-col gap-2.5 md:gap-5 min-h-96">
            <p>Sorry no data</p>
        </main>
    }
}

const PopularDishes = () => {
    const dispatch = useDispatch();
    const { data } = useLoaderData();
    const { cityName } = useParams();

    useEffect(() => {
        dispatch(setSecondaryCity(cityName));
    }, [])

    return <Suspense fallback={<DishShimmer />}>
        <Await resolve={data}>
            {data => {
                const dataToSend = data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
                return <MainData data={dataToSend} />
            }}
        </Await>
    </Suspense>
}

export default PopularDishes;