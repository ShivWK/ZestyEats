import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, lazy } from "react";
import { selectCityLatAndLng, setSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import useScrollToTop from "../../utils/useScrollToTop";

import FoodieThoughts from "../Home/FoodieThoughts/FoodieThoughts";
import TopRestaurantChains from "../Home/TopRestaurantChains";

const OnlineDeliveryRestaurant = lazy(() =>
  import("../Home/OnlineDeliveryRestaurant")
);
const PlaceCardsContainer = lazy(() => import("../Home/PlaceCardsContainer"));

import {
  selectCityLoading,
  selectPageData,
  selectSecondaryCity
} from "../../features/cityHome/cityHomeSlice";
import BackToTopBtn from "../BackToTopBtn";
import HomeShimmer from "../Home/HomeShimmer";

const MainContent = () => {
  const shimmerArray = Array.from({ length: 4 }, (_, i) => i);
  const data = useSelector(selectPageData);
  const secondaryCity = useSelector(selectSecondaryCity);
  const cityLatAndLng = useSelector(selectCityLatAndLng);

  // console.log(cityLatAndLng)

  const banner_text = data.cityBannerText;
  const foodieThoughtsData = data.cityFoodieData;
  const topRestaurantChainData = data.cityRestaurantChainData;
  const topRestaurantsTitle = data.cityRestaurantChainTitle;
  const onlineDeliveryRestaurantData = data.cityOnlineDeliveryRestaurantData;
  const onlineDeliveryRestaurantTitle = data.cityOnlineDeliveryRestaurantTitle;
  const localitiesTitle = data.cityLocalitiesTitle;
  const localitiesData = data.cityLocalitiesData;
  const whatEatingCuisineTitle = data.cityCuisinesTitle;
  const whatEatingCuisineData = data.cityCuisinesData;
  const restaurantChainInCityTitle = data.restaurantChainInCityTitle;
  const restaurantChainInCityData = data.restaurantChainInCityData;
  const popularDishesTitle = data.popularDishInCityTitle;
  const popularDishesData = data.popularDishInCityData;

  const placeCardClickHandler = async (data, trigger, setLoading, updataCityData, dispatch, setSecondaryCity) => {
    dispatch(setSecondaryCity(secondaryCity))

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }


  return (
    <main className="w-full md:max-w-[1070px] mx-auto pb-10 md:pb-10 pt-20 md:pt-28 overflow-x-hidden max-md:px-1.5">
      {/* /Banner Image */}

      <div
        id="banner"
        className="flex flex-col mt-0.5 md:mt-1 mb-8 w-full bg-cover  md:h-[50vh] h-[30vh]  bg-[url('/images/food-banner.jpg')] p-5 max-md:pl-2.5 max-md:bg-right"
      >
        <h1 className="mt-auto text-white text-2xl md:text-4xl max-md:leading-6 order-2">
          {banner_text}
        </h1>
        <h2 className="md:text-4xl text-white text-3xl order-1 max-md:-mt-2">
          ZestyEats
        </h2>
      </div>

      {/* Foodie Thoughts */}

      {foodieThoughtsData?.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto ">
            <FoodieThoughts data={foodieThoughtsData} />
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {topRestaurantChainData?.length !== 0 && (
        <>
          <section className="w-full max-w-[1040px] mx-auto">
            <Suspense
              fallback={
                <div className="flex justify-between">
                  {shimmerArray.map((i) => (
                    <div key={i} className=" w-60 h-44 rounded-xl shimmerBg" />
                  ))}
                </div>
              }
            >
              <TopRestaurantChains
                data={topRestaurantChainData}
                heading={topRestaurantsTitle}
              />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {onlineDeliveryRestaurantData?.length !== 0 && (
        <>
          <section className="w-full">
            <Suspense
              fallback={
                <div className="flex justify-between">
                  {shimmerArray.map((i) => (
                    <div key={i} className=" w-60 h-44 rounded-xl shimmerBg" />
                  ))}
                </div>
              }
            >
              <OnlineDeliveryRestaurant
                data={onlineDeliveryRestaurantData}
                heading={onlineDeliveryRestaurantTitle}
              />
            </Suspense>
          </section>
          <hr className="mt-10 mb-8 text-gray-400" />
        </>
      )}

      {/* Localities */}

      {localitiesData?.length !== 0 && (
        <>
          <section
            className="w-full md:max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col mb-7"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4">
                  {shimmerArray.map((i) => (
                    <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />
                  ))}
                </div>
              }
            >
              <PlaceCardsContainer
                data={localitiesData}
                heading={localitiesTitle}
                targetedCity={secondaryCity}
                path="SetLocality"
                clickHandler={placeCardClickHandler}
              />
            </Suspense>
          </section>
          {/* <hr className="mt-10 mb-8 text-gray-400" /> */}
        </>
      )}

      {/* What's city eating */}

      {whatEatingCuisineData?.length !== 0 && (
        <>
          <section
            className="w-full md:max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col mb-7"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4">
                  {shimmerArray.map((i) => (
                    <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />
                  ))}
                </div>
              }
            >
              <PlaceCardsContainer
                data={whatEatingCuisineData}
                heading={whatEatingCuisineTitle}
                targetedCity={secondaryCity}
                clickHandler={placeCardClickHandler}
                path={"SetCuisine"}
              />
            </Suspense>
          </section>
          {/* <hr className="mt-10 mb-8 text-gray-400" /> */}
        </>
      )}

      {/* Restaurant Chain in city */}

      {restaurantChainInCityData?.length !== 0 && (
        <>
          <section
            className="w-full md:max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col mb-7"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4">
                  {shimmerArray.map((i) => (
                    <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />
                  ))}
                </div>
              }
            >
              <PlaceCardsContainer
                data={restaurantChainInCityData}
                heading={restaurantChainInCityTitle}
                clickHandler={placeCardClickHandler}
                targetedCity={secondaryCity}
                path="SetRestaurant"
              />
            </Suspense>
          </section>
          {/* <hr className="mt-10 mb-8 text-gray-400" /> */}
        </>
      )}

      {/* Popular dishes */}

      {popularDishesData?.length !== 0 && (
        <>
          <section
            className="w-full md:max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col"
          >
            <Suspense
              fallback={
                <div className="flex justify-between gap-4">
                  {shimmerArray.map((i) => (
                    <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />
                  ))}
                </div>
              }
            >
              <PlaceCardsContainer
                data={popularDishesData}
                heading={popularDishesTitle}
                targetedCity={secondaryCity}
                path="SetDish"
                clickHandler={placeCardClickHandler}
              />
            </Suspense>
          </section>
        </>
      )}
      <BackToTopBtn percentage={40} />
    </main>
  );
};

const CityHome = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { cityName: city } = useParams();
  const loading = useSelector(selectCityLoading);

  useEffect(() => {
    dispatch(setSecondaryCity(city));
  }, []);

  return loading ? (
    <main className="w-full md:max-w-[1070px] mx-auto pb-8 md:pb-10 pt-20 md:pt-28 overflow-x-hidden max-md:px-1.5">
      <HomeShimmer />
    </main>
  ) : (
    <MainContent />
  );
};

export default CityHome;


// fetch("https://www.swiggy.com/api/seo/getListing?lat=12.960059122809971&lng=77.57337538383284&apiV2=true", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,hi;q=0.8",
//     "content-type": "application/json",
//     "latitude": "12.960059122809971",
//     "longitude": "77.57337538383284",
//     "priority": "u=1, i",
//     "searchstring": "cheese-pizza",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin"
//   },
//   "referrer": "https://www.swiggy.com/city/bangalore/cheese-pizza-dish-restaurants",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"selectedPlTab\":\"RESTAURANT\",\"query\":\"cheese-pizza\",\"seoParams\":{\"apiName\":\"RestaurantSearchApi\",\"brandId\":\"\",\"seoUrl\":\"www.swiggy.com/city/bangalore/cheese-pizza-dish-restaurants\",\"pageType\":\"CITY_DISH_PAGE\",\"businessLine\":\"FOOD\"},\"supportedMarketplaces\":[{\"marketplaceId\":\"SWIGGY\",\"businessLineId\":\"FOOD\"}],\"submitAction\":\"ENTER\",\"redirection\":\"true\",\"categoryPage\":\"FOOD\",\"supportedTabs\":[\"DISH\",\"RESTAURANT\"],\"marketplaces\":[{\"marketplaceId\":\"SWIGGY\",\"businessLineId\":\"FOOD\"}],\"sldEnabled\":true}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });