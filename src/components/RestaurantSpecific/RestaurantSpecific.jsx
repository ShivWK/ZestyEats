import { useParams, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import store from "../../app/store";
import restaurantsApi from "../../features/home/restaurantsApiSlice";
import ShimmerContainer from "./ShimmerContainer";
import useScrollToTop from "../../utils/useScrollToTop";
import MainContent from "./MainContent";

export const loader = async ({ params }) => {
  const { lat, lng, id } = params;

  const result = store.dispatch(
    restaurantsApi.endpoints.getSpecificRestaurantData.initiate({
      lat,
      lng,
      id,
    })
  ).unwrap();

  return { data: result };
};

const RestaurantSpecific = () => {
  const routeParams = useParams();
  const result = useLoaderData();
  useScrollToTop();

  return (
    <Suspense fallback={<ShimmerContainer />}>
      <Await resolve={result.data}>
        {(data) => (
          <MainContent routeParams={routeParams} data={data}/>
        )}
      </Await>
    </Suspense>
  );
};

export default RestaurantSpecific;
