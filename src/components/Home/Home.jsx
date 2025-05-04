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
  // const [
  //     triggerLoactionByCoordinates,
  //     { isLoading: LocationByCoordinatesLoading },
  //   ] = useLazyLocationByCoordinatesQuery();
  // const [triggerRestaurentDataCall] = useLazyGetHomePageDataQuery();

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(async (position) => {
  //           const lat1 = position.coords.latitude;
  //           const lng1 = position.coords.longitude;
    
  //           try {
  //             const data = await triggerLoactionByCoordinates({
  //               lat1,
  //               lng1,
  //             }).unwrap();

  //             const localityObject = data?.data?.[0]?.["address_components"].find(
  //               (item) => item?.["types"].includes("locality")
  //             );
  //             // Loader required
  //             dispatch(addYourCurrentCity(localityObject?.["short_name"]));
  //             dispatch(
  //               addSearchedCityAddress(data?.data?.[0]?.["formatted_address"])
  //             );
    
  //             const lat = data?.data?.[0]?.geometry?.location?.lat;
  //             const lng = data?.data?.[0]?.geometry?.location?.lng;
    
  //             try {
  //               const res2 = await triggerRestaurentDataCall({ lat, lng });
  //               console.log(res2);
  //               updateHomeRestaurantData(res2); //loader rquired
  //               dispatch(addTopRestaurantsTitle(res2));
  //             } catch (err) {
  //               alert(err.message);
  //             }
  //           } catch (err) {
  //             console.log("Error fetching current location data.");
  //           }
  //         });
  //       } else {
  //         // const lat: 26.8496217,
  //         // const lng: 81.0072193,
  //         // try {
  //         //   const res2 = await triggerRestaurentDataCall({ lat, lng });
  //         //   console.log(res2);
  //         //   updateHomeRestaurantData(res2); //loader rquired
  //         //   dispatch(addTopRestaurantsTitle(res2));
  //         // } catch (err) {
  //         //   alert(err.message);
  //         // }
  //       }
  // }, [])
  
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
