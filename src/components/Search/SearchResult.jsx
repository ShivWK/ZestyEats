import {
  NavLink,
  useLoaderData,
  Await,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import { Suspense, useState } from "react";
import Ui3Shimmer from "./Ui3Shimmer";
import useScrollToTop from "../../utils/useScrollToTop";

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
          <div className="flex gap-1 items-center text-gray-500 font-semibold text-sm">
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
        {moreRestros &&
          moreRestros.map((data) => <Card key={data?.id} data={data} />)}
      </div>
    </div>
  );
};

const DishData = ({ data, lat, lng }) => {
  const dispatch = useDispatch();
  const cards =
    data?.data?.data?.cards?.[1].groupedCard?.cardGroupMap?.DISH?.cards.slice(
      1
    );

  const handleClick = (name) => {
    dispatch(addCurrentRestaurant(name));
  };

  // https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/FOOD_CATALOG/IMAGES/CMS/2025/4/14/da1beec1-7773-44fe-9db8-e339bab8ed5b_db51f5ce-bedd-453c-ae70-76776d5a5636.jpeg

  const Card = (data) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const mainData = data?.data?.card?.card;
    const disData = mainData?.info;
    const restroData = mainData?.restaurant?.info;
    const path = `/restaurantSpecific/${lat}/${lng}/${restroData?.id}/${restroData?.name}`;
    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${disData?.imageId}`;

    return (
      <div className="basis-[49%] pb-1 border-2 border-gray-300 rounded-md bg-white">
        <NavLink
          to={path}
          onClick={() => handleClick(restroData?.name)}
          className="flex group justify-between  p-3 w-full cursor-pointer"
        >
          <div>
            <p className="font-bold text-gray-800 w-64 overflow-hidden">
              {restroData?.name}
            </p>
            <div className="flex gap-1 items-center text-gray-500 font-semibold text-sm">
              <i className="ri-star-fill" />
              <p>{restroData?.avgRating}</p>
              <p>•</p>
              <p>{restroData?.sla?.slaString}</p>
              <p>•</p>
              <p>{restroData?.costForTwoMessage}</p>
            </div>
          </div>
          <i className="ri-arrow-right-long-fill text-2xl text-gray-600 ursor-pointer transform group-hover:translate-x-[6px] transition-all duration-150 ease-in-out"></i>
        </NavLink>
        <hr className="text-gray-300 my-1.5" />
        <div className="flex justify-between bg-white">
          <div className="flex flex-col gap-3 p-4">
            {disData.isVeg === 1 ? (
              <svg
                width="15"
                height="15"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5"
                  y="5"
                  width="90"
                  height="90"
                  fill="none"
                  stroke="green"
                  strokeWidth="8"
                />
                <circle cx="50" cy="50" r="25" fill="green" />
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="5"
                  y="5"
                  width="90"
                  height="90"
                  fill="none"
                  stroke="red"
                  strokeWidth="8"
                />
                <polygon points="50,20 78.86,70 21.14,70" fill="red" />
              </svg>
            )}
            <div className="h-4 w-36 shimmerBg break-all">
              {/* hhhhhhhhhhhhhhhhhhhhhhhhhhmmmmmmmmhh */}
            </div>
            <div className="h-4 w-32 shimmerBg"></div>
            <div className="h-4 w-20 shimmerBg"></div>
          
            <div
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
              id="moreCities"
              className="flex gap-2.5 cursor-pointer border-2 border-gray-500 px-2 py-0.5 w-fit rounded-2xl items-center transition-all duration-300 linear hover:bg-gray-100"
            >
              <p className="font-normal text-sm text-gray-900 select-none">
                More Details
              </p>
              <i
                className="fa-solid fa-caret-down text-gray-900 transition-all duration-300 linear"
                style={{
                  transform: isDescriptionOpen ? "rotate(-180deg)" : "",
                }}
              ></i>
            </div>
          </div>
          <div className="relative h-36 w-36 rounded-xl overflow-hidden shrink-0 m-2">
            <img
              src={isError ? "/images/fallback.png" : imageUrl}
              className="absolute top-0 left-0 h-full w-full object-center object-cover"
              alt={disData?.name}
              onError={() => setIsError(true)}
            />
            <button className="absolute py-1 px-8 rounded bg-green-400 text-white font-semibold tracking-tight mt-auto top-[75%] transform -translate-x-1/2 left-1/2 cursor-pointer active:scale-95 transition-all duration-150 ease-in-out ">
              Add
            </button>
          </div>
        </div>
        {isDescriptionOpen && (
          <div className="px-2 text-gray-600 font-medium">
            <hr className="text-gray-300 my-1" />
            <p>{disData?.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-start flex-wrap gap-2.5 gap-y-4 w-full justify-between mt-2.5 bg-gray-200 p-1.5 rounded-md">
      {cards.map((item) => (
        <Card key={item?.card?.card?.info?.id} data={item} />
      ))}
    </div>
  );
};

const MainContent = ({ resolvedData }) => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [currentType, setCurrentType] = useState(type);

  const clickHandler = (type) => {
    if (currentType !== type) {
      setCurrentType(type);

      if (type === "Restaurant") {
      } else {
      }
    }
  };

  return (
    <div>
      <div className="flex gap-3 my-5">
        <button
          onClick={() => clickHandler("Restaurant")}
          className="py-1.5 font-bold px-4 rounded-3xl hover:bg-gray-200 border-[1px] border-gray-400 cursor-pointer"
          style={{
            backgroundColor: currentType === "Restaurant" ? "black" : "white",
            color: currentType === "Restaurant" ? "white" : "black",
          }}
        >
          Restaurant
        </button>
        <button
          onClick={() => clickHandler("Dish")}
          className="py-1.5 font-bold px-4 rounded-3xl hover:bg-gray-200 border-[1px] border-gray-400 cursor-pointer"
          style={{
            backgroundColor: currentType === "Dish" ? "black" : "white",
            color: currentType === "Dish" ? "white" : "black",
          }}
        >
          Dish
        </button>
      </div>
      {currentType === "Dish" ? (
        <DishData data={resolvedData} lat={lat} lng={lng} />
      ) : (
        <RestroData data={resolvedData} lat={lat} lng={lng} />
      )}
    </div>
  );
};

const SearchResult = () => {
  const { data } = useLoaderData();
  useScrollToTop();

  return (
    <Suspense fallback={<Ui3Shimmer />}>
      <Await resolve={data}>
        {(data) => <MainContent resolvedData={data} />}
      </Await>
    </Suspense>
  );
};

export default SearchResult;

// Dish CLick https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=Burger%20King&trackingId=undefined&submitAction=STORED_SEARCH&queryUniqueId=&selectedPLTab=DISH

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=Burger%20King&trackingId=null&submitAction=STORED_SEARCH&queryUniqueId=35d6af70-5d94-004b-a26f-19c5ef469c2a&selectedPLTab=DISH

// Restro click https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=burger&trackingId=undefined&submitAction=ENTER&queryUniqueId=&selectedPLTab=RESTAURANT
