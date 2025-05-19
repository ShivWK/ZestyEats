import FoodieThoughts from "./FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "./TopRestaurantChains";
import OnlineDeliveryRestaurant from "./OnlineDeliveryRestaurants/OnlineDeliveryRestaurant";
import BestPlacesToEat from "./BestPlacesToEat";
import CuisionsNearMe from "./CuisionsNearMe";
import NearByRestaurants from "./NearByRestaurants";
import Loader from "../Loader";

import { useLazyGetHomePageDataQuery } from "../../features/home/homeApiSlice";
import { useLazyLocationByCoordinatesQuery } from "../../features/home/searchApiSlice";
import { useGetSpecificRestaurantDataQuery, useLazyGetSpecificRestaurantDataQuery } from "../../features/home/restaurantsApiSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFoodieThoughtsData,
  selectTopRestaurantsData,
  selectOnlineDeliveryRestaurants,
  selectIsLoading,
  setLoading,
  addYourCurrentCity,
  addSearchedCity,
  addSearchedCityAddress,
  selectBestPlacesToEat,
  selectBestCuisionsNearMe,
  selectNearByRestaurants,
} from "../../features/home/homeSlice";

import { updateHomeRestaurantData } from "../../utils/updateHomeData";
import { updateCurrentCity } from "../../utils/addCurrentCity";

export default function Home() {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const onlineDeliveryRestaurant = useSelector(selectOnlineDeliveryRestaurants);
  const bestPlacesToEaNearMe = useSelector(selectBestPlacesToEat);
  const bestCuisionsNearMe = useSelector(selectBestCuisionsNearMe);
  const nearByRestaurants = useSelector(selectNearByRestaurants);
  const isLoadingMain = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [triggerHomeAPI, { isLoading }] = useLazyGetHomePageDataQuery();
  const [triggerLoactionByCoordinates] = useLazyLocationByCoordinatesQuery();
  const [trigger] = useLazyGetSpecificRestaurantDataQuery();
  // const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // async function call() {
    //   try {
    //     let response = await trigger({ lat: 26.9124336, lng: 75.7872709, id: 47595}).unwrap();

    //     console.log(response);
    //   } catch(err) {
    //     console.error(err);
    //   }
    // }

    // call();
  }, []);

  // 26.9124336 75.7872709

  // https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.9124336&lng=75.7872709&restaurantId=47595&catalog_qa=undefined&submitAction=ENTER

  //  https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.9124336&lng=75.7872709&restaurantId=90186&catalog_qa=undefined&submitAction=ENTER

  const fetchDefaultHomeAPIData = async () => {
    try {
      let apiResponse = await triggerHomeAPI({
        lat: 12.9715987,
        lng: 77.5945627,
      }).unwrap();
      if (!apiResponse) return;
      updateHomeRestaurantData(apiResponse, dispatch, 12.9715987, 77.5945627);
    } catch (err) {
      dispatch(setLoading(false));
      alert(err.message);
    }
  };

  useEffect(() => {
    const HomeData = JSON.parse(localStorage.getItem("HomeAPIData"));
    const lat = JSON.parse(localStorage.getItem("lat"));
    const lng = JSON.parse(localStorage.getItem("lng"));

    if (HomeData && lat && lng) {
      updateHomeRestaurantData(HomeData, dispatch, lat, lng);
      const searchedCity = JSON.parse(localStorage.getItem("searchedCity"));
      const searchedCityAddress = JSON.parse(
        localStorage.getItem("searchedCityAddress")
      );
      const currentCity = JSON.parse(localStorage.getItem("currentCity"));

      dispatch(
        addSearchedCity(searchedCity === "undefined" ? "" : searchedCity)
      );
      dispatch(
        addSearchedCityAddress(
          searchedCityAddress === "undefined" ? "" : searchedCityAddress
        )
      );
      dispatch(
        addYourCurrentCity(currentCity === "undefined" ? "" : currentCity)
      );
    } else if (navigator.geolocation) {
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
            // console.log(res2);
            updateHomeRestaurantData(res2, dispatch, lat, lng);
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
    <main className="w-full max-w-[1070px] mx-auto pb-14 pr-1 pt-24">
      {foodieThoughtsData.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto ">
            <FoodieThoughts isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-8 text-gray-300" />
        </>
      )}
      {topRestaurantsChainsData.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto">
            <TopRestaurantChains isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-8 text-gray-300" />
        </>
      )}
      {onlineDeliveryRestaurant.length !== 0 && (
        <>
          <section className="w-full">
            <OnlineDeliveryRestaurant isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-8 text-gray-300" />
        </>
      )}
      {bestPlacesToEaNearMe.length !== 0 && (
        <>
          <section
            className="w-full max-w-[1000px] mx-auto flex items-center gap-4
           flex-col"
          >
            <BestPlacesToEat isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-8 text-gray-300" />
        </>
      )}
      {bestCuisionsNearMe.length !== 0 && (
        <>
          <section
            className="w-full max-w-[1000px] mx-auto flex items-center gap-4
           flex-col"
          >
            <CuisionsNearMe isLoading={isLoading} />
          </section>
          <hr className="mt-10 mb-8 text-gray-300" />
        </>
      )}
      {nearByRestaurants.length !== 0 && (
        <section
          className="w-full max-w-[1000px] mx-auto flex justify-start gap-4 
         flex-col"
        >
          <NearByRestaurants />
        </section>
      )}
    </main>
  );
}

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.
