import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import ShimmerContainer from "./ShimmerContainer";
import useScrollToTop from "../../utils/useScrollToTop";
import MainContent from "./MainContent";

const RestaurantSpecific = () => {
  const result = useLoaderData();
  useScrollToTop();

  return (
    <Suspense fallback={<ShimmerContainer />}>
      <Await resolve={result.data}>
        {(data) => <MainContent data={data} />}
      </Await>
    </Suspense>
  );
};

export default RestaurantSpecific;
