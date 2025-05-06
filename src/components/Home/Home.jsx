import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "./TopRestaurantsChain/TopRestaurantChains";
import OnlineDeliveryRestaurant from "./OnlineDeliveryRestaurant";
import BestPlacesToEat from "./BestPlacesToEat";
import NearByRestaurants from "./NearByRestaurants";
import Loader from "./Loader";

import {
  useGetHomePageDataQuery,
  useLazyGetHomePageDataQuery,
} from "../../features/home/homeApiSlice";

import {
  useLazyLocationByCoordinatesQuery
} from "../../features/home/searchApiSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFoodieThoughtsData,
  addTopRestaurantsData,
  addApiData,
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectIsLoading,
  setLoading,
  addTopRestaurantsTitle,
  addYourCurrentCity,
  addSearchedCityAddress
} from "../../features/home/homeSlice";

export default function Home() {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const FoodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const isLoadingMain = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [triggerHomeAPI, { data, isLoading, isError, error }] =
    useLazyGetHomePageDataQuery();
  const [triggerLoactionByCoordinates] = useLazyLocationByCoordinatesQuery();

  const fetchDefaultHomeAPIData = async () => {
    try {
      let apiResponse = await triggerHomeAPI({ lat: 12.9715987, lng: 77.5945627 }).unwrap();
      console.log(apiResponse)
      if (!apiResponse) return;
      updateHomeRestaurantData(apiResponse);
    } catch (err) {
      dispatch(setLoading(false));
      alert(err.message)
    }
  }
  
  const updateHomeRestaurantData = async (res) => {
    console.log(res)
    if (res?.data?.data?.cards?.[0]?.card?.card?.id === "swiggy_not_present") {
      alert("We don't server in this location");
    } else {
      localStorage.setItem("HomeAPIData", JSON.stringify(res));

      dispatch(addApiData(res));
      dispatch(addFoodieThoughtsData(res));
      dispatch(addTopRestaurantsData(res));
      dispatch(addTopRestaurantsTitle(res));
      dispatch(setLoading(false));
    }
  };

  const updateCityAndAddress = (data) => {
    const localityObject = data?.data?.[0]?.["address_components"].find(
      (item) => item?.["types"].includes("locality")
    );

    dispatch(addYourCurrentCity(localityObject?.["short_name"]));
    dispatch(
      addSearchedCityAddress(data?.data?.[0]?.["formatted_address"])
    );
  }

  useEffect(() => {
    dispatch(setLoading(true));
    const HomeData = JSON.parse(localStorage.getItem("HomeAPIData"));
    if (HomeData) {
      updateHomeRestaurantData(HomeData);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;

        try {
          const data = await triggerLoactionByCoordinates({
            lat1,
            lng1,
          }).unwrap();

          updateCityAndAddress(data);

          const lat = data?.data?.[0]?.geometry?.location?.lat;
          const lng = data?.data?.[0]?.geometry?.location?.lng;

          try {
            const res2 = await triggerHomeAPI({ lat, lng }).unwrap();
            console.log(res2);
            updateHomeRestaurantData(res2);
          } catch (err) {
            alert(err.message);
            fetchDefaultHomeAPIData();
          }
        } catch (err) {
          console.log("Error fetching current location data.");
          fetchDefaultHomeAPIData();
        }
      });
    } else {
     fetchDefaultHomeAPIData();
    }
  }, []);

  return isLoadingMain || isLoading ? (
    <Loader />
  ) : (
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
