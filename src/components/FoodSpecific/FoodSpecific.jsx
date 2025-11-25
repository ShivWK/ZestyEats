// Done

import { useLoaderData } from "react-router-dom";
import useScrollToTop from "../../utils/useScrollToTop";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import ShimmerContainer from "./ShimmerContainer";
import MainContainer from "./MainContainer";

const FoodSpecific = () => {
    // console.log("FoodSpecific rendered")
    useScrollToTop();
    const {data} = useLoaderData();

    return (
        <Suspense fallback={<ShimmerContainer />}>
            <Await resolve={data}>
                {data => <MainContainer data={data}/>}
            </Await>
        </Suspense>
    );
};

export default FoodSpecific;

