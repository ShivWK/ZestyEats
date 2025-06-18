import { useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Await } from "react-router-dom";

const SearchResult = () => {
    const { data } = useLoaderData();

    return <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={data}>{data => console.log(data)}</Await>
    </Suspense>
}

export default SearchResult;

