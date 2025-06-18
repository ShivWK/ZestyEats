import {
  NavLink,
  useLoaderData,
  Await,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import { Suspense } from "react";
import Ui3Shimmer from "./Ui3Shimmer";

const RestroData = ({ data, lat, lng }) => {
  const dispatch = useDispatch();
  const cards =
    data?.data?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
  const clickedRestro = cards?.[0]?.card?.card?.info;
  const moreRestrosCardContainer = cards?.[1]?.card?.card;
  const moreText = moreRestrosCardContainer?.title;
  const moreRestros = moreRestrosCardContainer?.restaurants?.map(
    (data) => data.info
  );

  const handleClick = (name) => {
    dispatch(addCurrentRestaurant(name));
  };

  const Card = ({ data }) => {
    console.log(data);

    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${data?.cloudinaryImageId}`;
    const path = `/restaurantSpecific/${lat}/${lng}/${data?.id}/${data?.name}`;

    return (
      <NavLink
        to={path}
        onClick={() => handleClick(data?.name)}
        className="flex basis-[49%] w-1/2 pt-3 px-4 gap-3 cursor-pointer bg-white pb-8"
      >
        <div className="relative">
          <img
            src={imageUrl}
            alt="dish image"
            className="object-cover h-28 rounded-md"
            height={90}
            width={100}
          />
          {data?.aggregatedDiscountInfoV3 && (
            <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 gap-0 bg-white flex flex-col justify-center items-center px-1.5 py-0.5 text-sm rounded-md max-w-[100%] shadow-[0_0_10px_1px_#1e2939]">
              <p className="text-primary font-bold tracking-tight whitespace-nowrap">
                {data?.aggregatedDiscountInfoV3?.header}
              </p>
              <p className="text-primary text-xs font-semibold tracking-tight -mt-0.5 whitespace-nowrap">
                {data?.aggregatedDiscountInfoV3?.subHeader}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-1 justify-center flex-col">
          <p className="font-bold text-gray-800 w-64 overflow-hidden">
            {data?.name}
          </p>
          <div className="flex gap-1 items-center text-gray-500 font-bold text-sm">
            <i className="ri-star-fill" />
            <p>{data?.avgRating}</p>
            <p>•</p>
            <p>{data?.sla?.slaString}</p>
            <p>•</p>
            <p>{data?.costForTwoMessage}</p>
          </div>
          <div className="w-60">
            <p className="text-sm">{data?.cuisines?.join(", ")}</p>
          </div>
        </div>
      </NavLink>
    );
  };

  return (
    <div className="p-3 pt-8 w-full bg-gray-100 flex flex-col">
      <Card data={clickedRestro} />
      {moreText && <p className="font-bold mt-8 mb-6">{moreText}</p>}
      <div className="flex flex-wrap gap-1 gap-y-3 justify-between">
        {moreRestros && moreRestros.map((data) => <Card data={data} />)}
      </div>
    </div>
  );
};

// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/RX_THUMBNAIL/IMAGES/VENDOR/2025/6/9/135f09ab-8f1b-4185-8d77-73f5fcd99d77_16866.JPG

// url: https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${data?.cloudinaryImageId}

const DishData = ({ data }) => {};

const MainContent = ({ resolvedData }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return type === "Dish" ? (
    <DishData data={resolvedData} lat={lat} lng={lng} />
  ) : (
    <RestroData data={resolvedData} lat={lat} lng={lng} />
  );
};

const SearchResult = () => {
  const { data } = useLoaderData();

  return (
    <Suspense fallback={<Ui3Shimmer />}>
      <Await resolve={data}>
        {(data) => <MainContent resolvedData={data} />}
      </Await>
    </Suspense>
  );
};

export default SearchResult;
