import { useState, Suspense, use } from "react";
import { useLoaderData, Await, NavLink, useSearchParams } from "react-router-dom";
import useScrollToTop from "../../utils/useScrollToTop";
import Ui1Shimmer from "./Ui1Shimmer";

const MainContent = ({ data }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
 
  const cards = data?.data?.data?.cards;
  const itemCards = cards?.[1]?.card?.card?.imageGridCards?.info;

  return (
    <div className="flex flex-col w-fit mx-auto gap-5 mt-4">
      <h1>{"Heading"}</h1>
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        {itemCards.map((item) => {
          const queryObj = new URL(item?.action?.link).searchParams;
          const path = `suggestions?lat=${lat}&lng=${lng}&food=${queryObj.get("query")}`;
          return (
            <NavLink
              key={item.id}
              to={path}
              className="shimmerBg h-36 w-28 rounded-xl shrink-0"
            >
              <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item?.imageId}`} alt="" />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

const SearchHome = () => {
  const data = useLoaderData();
  useScrollToTop();

  return (
    <Suspense fallback={<Ui1Shimmer />}>
      <Await resolve={data?.data}>
        {(resolveData) => <MainContent data={resolveData} />}
      </Await>
    </Suspense>
  );
};

export default SearchHome;
