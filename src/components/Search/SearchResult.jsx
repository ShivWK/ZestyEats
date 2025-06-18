import { useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Await } from "react-router-dom";
import Ui3Shimmer from "./Ui3Shimmer";

const SearchResult = () => {
    const { data } = useLoaderData();

    return <Suspense fallback={<Ui3Shimmer />}>
        <Await resolve={data}>{data => console.log(data)}</Await>
    </Suspense>
}

export default SearchResult;

