import { useLoaderData, Await, useLocation } from "react-router-dom";
import { Suspense } from "react";
import dishPageDataFetcher from "../../../utils/dishPageDataFetcher";
import BreadcrumbsWrapper from "../../BreadcrumbsWrapper";
import ScooterAnimation from "../../../utils/ScooterAnimation";

const MainData = ({ data }) => {
    const mainData = dishPageDataFetcher(data)
    const dish = decodeURIComponent(useLocation().pathname.split("/").at(-1));

    console.log(mainData);
    console.log(dish)

    return <><main className="w-full md:max-w-[1070px] mx-auto pb-2 md:pb-6 pt-20 md:pt-28 overflow-x-hidden max-md:px-2 flex flex-col gap-2 md:gap-5 min-h-96">
        {mainData.data ? (
            <>
                <section className="self-start">
                    <BreadcrumbsWrapper />
                </section>
                <h1 className="max-md:leading-6 text-xl md:text-3xl">{mainData.heading}</h1>
                <section className="bg-gray-100 rounded p-2 md:p-7 mt-2">
                    <h2 className="text-gray-800 font-bold text-sm md:text-xl">{`${mainData.data.length} dishes found for ${dish}`}</h2>
                    <div className="border-2 mt-4">
                        {mainData.data.map(obj => <p>Hi</p>)}
                    </div>
                </section>
                <div className="md:hidden -mb-5">
                    <ScooterAnimation />
                </div>
            </>
        ) : (
            <h2>Sorry no  restros</h2>
        )}
    </main>
        <div className="hidden md:block -mb-2.5">
            <ScooterAnimation />
        </div>
    </>
}

const PopularDishes = () => {
    const { data } = useLoaderData();

    return <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={data}>
            {data => {
                const dataToSend = data?.data?.props?.pageProps?.widgetResponse?.success?.cards;
                return <MainData data={dataToSend} />
            }}
        </Await>
    </Suspense>
}

export default PopularDishes;