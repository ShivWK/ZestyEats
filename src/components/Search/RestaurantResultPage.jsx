import { useDispatch } from "react-redux";
import { addCurrentRestaurant, setMenuItems } from "../../features/home/restaurantsSlice";
import {
  NavLink,
  Await,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useState } from "react";
import Ui4Shimmer from "./Ui4Shimmer";
import useScrollToTop from "../../utils/useScrollToTop";

const Card = ({ data, lat, lng }) => {
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${data?.cloudinaryImageId}`;
  const path = `/restaurantSpecific/${lat}/${lng}/${data?.id}/${data?.name}`;

  const handleClick = (name) => {
    dispatch(addCurrentRestaurant(name));
    dispatch(setMenuItems({ mode: "empty" }));
  };

  return (
    <NavLink
      to={path}
      onClick={() => handleClick(data?.name)}
      className="flex basis-full md:basis-[49%] w-1/2 pt-3 px-4 gap-3 cursor-pointer bg-white pb-8"
    >
      <div className="relative shrink-0">
        <img
          src={ isError ? "/images/fallback.png" : imageUrl}
          alt="dish image"
          className="object-cover h-28 rounded-md"
          height={90}
          width={100}
          onError={() => setIsError(true)}
        />
        {data?.aggregatedDiscountInfoV3 && (
          <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 gap-0 bg-white flex flex-col justify-center items-center px-1.5 py-0.5 text-sm rounded-md max-w-[100%] shadow-[0_0_10px_1px_#1e2939] max-md:text-sm">
            <p className="text-primary font-bold tracking-tight whitespace-nowrap">
              {data?.aggregatedDiscountInfoV3?.header}
            </p>
            <p className="text-primary text-xs font-semibold tracking-tight -mt-0.5 whitespace-nowrap">
              {data?.aggregatedDiscountInfoV3?.subHeader}
            </p>
          </div>
        )}
      </div>
      <div className="flex gap-1 justify-center flex-col w-[65%] md:w-[70%]">
        <p className="font-bold text-gray-800 w-full truncate">
          {data?.name}
        </p>
        <div className="flex max-md:items-start flex-col md:flex-row gap-1 items-center text-gray-500 font-semibold text-sm">
          <div className="flex flex-row gap-1 items-center">
            <i className="ri-star-fill text-green-700 mb-0.5" />
            <p>{data?.avgRating}</p>
            <p>•</p>
            <p>{data?.sla?.slaString}</p>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <p className="md:block hidden">•</p>
            <p>{data?.costForTwoMessage}</p>
          </div>
        </div>
        <div className="line-clamp-2">
          <p className="text-sm">{data?.cuisines?.join(", ")}</p>
        </div>
      </div>
    </NavLink>
  );
};

const MainContent = ({ data, lat, lng, mode }) => {
  useScrollToTop();
  const cards =
    mode === "parent"
      ? data?.data?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT
        ?.cards
      : data?.data?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.RESTAURANT
        ?.cards;

  const clickedRestro = cards?.[0]?.card?.card?.info;
  const moreRestrosCardContainer = cards?.[1]?.card?.card;
  const moreText = moreRestrosCardContainer?.title;
  const moreRestros = moreRestrosCardContainer?.restaurants?.map(
    (data) => data.info
  );

  const tabRestaurantData = cards?.map((data) => data?.card?.card?.info);

  console.log(tabRestaurantData)

  return (
    <div className="p-3 pt-18 w-full bg-gray-100 flex flex-col">
      {mode === "parent" ? (
        <>
          {clickedRestro && (
            <div className="flex w-full"><Card data={clickedRestro} lat={lat} lng={lng} /></div>
          )}
          {moreText && <p className="font-bold mt-8 mb-6">{moreText}</p>}
          <div className="flex flex-wrap gap-1 gap-y-3 justify-between">
            {moreRestros &&
              moreRestros.map((data) => (
                <Card key={data?.id} data={data} lat={lat} lng={lng} />
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-1 gap-y-3 justify-between">
          {tabRestaurantData ? (
            tabRestaurantData.map((data) => (
              <Card key={data?.id} data={data} lat={lat} lng={lng} />
            ))
          ) : (
            <p className="font-semibold text-center py-4">
              Sorry no data for this restaurant
            </p>
          )}
        </div>
      )}
      {mode === "parent" && !clickedRestro && !moreRestros && (
        <p className="font-semibold text-center py-4">
          Sorry no data for this restaurant
        </p>
      )}
    </div>
  );
};

const RestaurantResultPage = () => {
  const { data } = useLoaderData();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const mode = searchParams.get("mode");

  return (
    <Suspense fallback={<Ui4Shimmer />}>
      <Await resolve={data}>
        {(data) => <MainContent data={data} lat={lat} lng={lng} mode={mode} />}
      </Await>
    </Suspense>
  );
};

export default RestaurantResultPage;
