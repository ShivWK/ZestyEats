import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "./TopRestaurantsChain/TopRestaurantChains";
import OnlineDeliveryRestaurant from "./OnlineDeliveryRestaurant";
import BestPlacesToEat from "./BestPlacesToEat";
import NearByRestaurants from "./NearByRestaurants";
import Loader from "../Loader";

import { useLazyGetHomePageDataQuery } from "../../features/home/homeApiSlice";

import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectIsLoading,
  setLoading,
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
} from "../../features/home/homeSlice";

import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { updateCurrentCity } from "../../utils/addCurrentCity";

export default function Home() {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const FoodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const isLoadingMain = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [triggerHomeAPI, { isLoading }] = useLazyGetHomePageDataQuery();
  const [triggerLoactionByCoordinates] = useLazyLocationByCoordinatesQuery();
  const [firstRender, setFirstRender] = useState(true);

 useEffect(()=>{
   if (firstRender) {
    dispatch(setLoading(true));
    const HomeData = JSON.parse(localStorage.getItem("HomeAPIData"));
    if (HomeData) {
      updateHomeRestaurantData(HomeData, dispatch);
      setFirstRender(false);
    }

    const searchedCity = JSON.parse(localStorage.getItem("searchedCity"));
    const searchedCityAddress = JSON.parse(
      localStorage.getItem("searchedCityAddress")
    );
    const currentCity = JSON.parse(localStorage.getItem("currentCity"));

    dispatch(addSearchedCity(searchedCity === "undefined" ? "" : searchedCity));
    dispatch(addSearchedCityAddress(searchedCityAddress === "undefined" ? "" : searchedCityAddress));
    dispatch(addYourCurrentCity(currentCity === "undefined" ? "" : currentCity));
  }
 }, [])

  const fetchDefaultHomeAPIData = async () => {
    try {
      let apiResponse = await triggerHomeAPI({
        lat: 12.9715987,
        lng: 77.5945627,
      }).unwrap();
      if (!apiResponse) return;
      updateHomeRestaurantData(apiResponse, dispatch);
    } catch (err) {
      dispatch(setLoading(false));
      alert(err.message);
    }
  };

  useEffect(() => {
    if (!firstRender) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;

        try {
          const data = await triggerLoactionByCoordinates({
            lat1,
            lng1,
          }).unwrap();

          updateCurrentCity(data, dispatch);

          const lat = data?.data?.[0]?.geometry?.location?.lat;
          const lng = data?.data?.[0]?.geometry?.location?.lng;

          try {
            const res2 = await triggerHomeAPI({ lat, lng }).unwrap();
            console.log(res2);
            updateHomeRestaurantData(res2, dispatch);
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
    <Loader size={"large"} />
  ) : (
    <main className="w-full max-w-[1070px] mx-auto pb-14 pr-1 pt-20">
      {FoodieThoughtsData.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto ">
            <FoodieThoughts isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-9 text-gray-300" />
        </>
      )}
      {topRestaurantsChainsData.length !== 0 && (
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
