import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "./TopRestaurantsChain/TopRestaurantChains";
import OnlineDeliveryRestaurant from "./OnlineDeliveryRestaurant";
import BestPlacesToEat from "./BestPlacesToEat";
import NearByRestaurants from "./NearByRestaurants";
import { useGetHomePageDataQuery } from "../../features/home/homeApiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoodieThoughtsData,
  addTopRestaurantsData,
  addApiData,
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
} from "../../features/home/homeSlice";

export default function Home() {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const FoodieThoughtsData = useSelector(selectFoodieThoughtsData);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetHomePageDataQuery({
    lat: 26.8496217,
    lng: 81.0072193,
  });

  useEffect(() => {
    if (!data) return;
    dispatch(addApiData(data));
    dispatch(addFoodieThoughtsData(data));
    dispatch(addTopRestaurantsData(data));
  }, [data]);

  return (
    <main className="w-full max-w-[1070px] mx-auto pb-14 pr-1">
      {FoodieThoughtsData && (
        <>
          <section className="w-full max-w-[1040px] mx-auto">
            <FoodieThoughts isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-9 text-gray-300" />
        </>
      )}
      {topRestaurantsChainsData && (
        <>
          <section className="w-full max-w-[1040px] mx-auto">
            <TopRestaurantChains isLoading={isLoading} />
          </section>
        </>
      )}
      <section>{/* <OnlineDeliveryRestaurant /> */}</section>
      <section>{/* <BestPlacesToEat /> */}</section>
      <section>{/* <NearByRestaurants /> */}</section>
    </main>
  );
}

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.
