import { NavLink, useSearchParams } from "react-router-dom";
import { selectCity, selectLatAndLng } from "../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { Suspense, lazy } from "react";
const PureVegSvg = lazy(() => import("../../utils/PureVegSvg"));
const VegAndNonVegSvg = lazy(() => import("../../utils/VegAndNonVegSvg"));
import updateCityHomeData from "../../utils/updateCityHomeData";
import { selectSecondaryCity, setCityPageLoading, setSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import { useLazyGetDataForCityLocalityCuisineQuery } from "../../features/cityHome/cityHomeApiSlice";
import calDistance from "./../../utils/haversineFormula";

const Banner = ({ data }) => {
  const mainData = data?.card?.card?.info;
  const [lat, lng] = mainData.latLong.split(",");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const { lat: latUser, lng: lngUser } = useSelector(selectLatAndLng);

  const userDistanceFromTheRestaurant = calDistance(lat, latUser, lng, lngUser);

  let deliverable = true;
  if (userDistanceFromTheRestaurant > 10) deliverable = false;

  const opened = mainData.availability.opened;

  const veg = mainData?.veg;
  const citySelector = ( mode === "cityPage" || mode === "dishPage" ) ?  selectSecondaryCity : selectCity;

  const searchedCity = useSelector(citySelector).toLowerCase().replace(/\s/g, "-");

  const dispatch = useDispatch();
  const [trigger] = useLazyGetDataForCityLocalityCuisineQuery()

  const clickHandler = async (city, cityPath, cuisine) => {
    dispatch(setSecondaryCity(city));
    dispatch(setCityPageLoading(true));

    try {
      const data = await trigger({ city: cityPath, type: cuisine }).unwrap();
      updateCityHomeData(data, dispatch);
    } catch (err) {
      console.log("Cant fetch cuisine data", err);
      dispatch(setCityPageLoading(false));
      throw new Error("Cant fetch cuisine data");
    }
  }

  return (
    <div
      id="banner"
      className="w-full p-3 md:p-5 bg-linear-[to_top,#adabab9d,#ffffff] mt-2 md:my-3 rounded-4xl"
    >
      <div
        id="inner-container"
        className="flex flex-col gap-2.5 rounded-3xl w-full overflow-hidden border-[1px] border-[#adabab9d] bg-white"
      >
        <div className="self-center w-full p-3.5 flex flex-col gap-1.5">
          <div id="rating" className="flex gap-2.5 items-center">
            <div className="flex gap-1 items-center">
              <i className="ri-user-star-fill text-green-600 text-xl"></i>
              <p className="font-bold">{`${mainData?.avgRatingString}(${mainData?.totalRatingsString})`}</p>
            </div>
            <p className="text-gray-500">•</p>
            <p className="font-bold">{mainData?.costForTwoMessage}</p>
            <p className="text-gray-500 hidden md:block">•</p>
            {veg ? (<PureVegSvg classes="-ml-3.5 hidden md:inline-flex" />
             ) : ( <VegAndNonVegSvg classes="hidden md:inline-flex px-2 my-1 py-0.5 pr-2" /> )}
          </div>
          <div
            id="cuisines"
            className="text-primary font-bold underline text-sm flex gap-1"
          >
            {mainData?.cuisines.length !== 0 &&
              mainData?.cuisines?.map((text, index, array) => {
                if (index == array.length - 1) {
                  const cuisine = text.toLowerCase().replace(/\s/g, "-") + "-cuisine-";
                  const showCuisine = text.toLowerCase().replace(/\s/g, "-");
                  return <NavLink to={`/cityPage/${searchedCity}?mode=cuisine?type=${showCuisine}`} key={text} onClick={() => clickHandler(text, searchedCity, cuisine)}>{text}</NavLink>;
                }
                const cuisine = text.toLowerCase().replace(/\s/g, "-") + "-cuisine-";
                const showCuisine = text.toLowerCase().replace(/\s/g, "-");

                return <NavLink to={`/cityPage/${searchedCity}?mode=cuisine?type=${showCuisine}`} key={text} onClick={() => clickHandler(text, searchedCity, cuisine)}>{`${text} ,`}</NavLink>;
              })}
          </div>
          <div id="delivery" className="flex gap-2 mt-2">
            <div className="flex flex-col justify-center items-center p-0">
              <div className="rounded-[50%] p-1 bg-[#a7a5a5]"></div>
              <div className="w-0.5 bg-[#a7a5a5] h-7"></div>
              <div className="rounded-[50%] p-1 bg-[#a7a5a5]"></div>
            </div>
            <div className="flex flex-col gap-4 text-black font-bold text-sm">
              <div className="flex gap-2 p-0">
                <p>Outlet</p>
                <p className="text-gray-600 font-semibold">{mainData?.areaName}</p>
                <p className="text-gray-950 hidden md:inline-block">•</p>
                <p className={`${opened ? "text-green-500" : "text-red-600"} font-medium hidden md:inline-block`}>{opened ? "OPEN 😊" : "CLOSED 😟"}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p>{mainData?.sla?.slaString || "25-30 MINS"}</p>
                {!deliverable && <p className="text-red-500 font-medium">(Not delivering to your area)</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {veg ? (
              <PureVegSvg classes="mb-1 -mt-2 max-md:block hidden" />
          ) : (
              <VegAndNonVegSvg classes="hidden ml-3 max-md:inline-flex px-2 my-1 pr-2 py-1 mb-2" />
          )}
          <div className={`flex items-center gap-2 ${veg ? "-mt-3 -ml-3 text-sm" : "-mt-1"}`}>
            <p className="text-gray-950 md:hidden">•</p>
            <p className={`${opened ? "text-green-500" : "text-red-600"} font-medium md:hidden`}>{opened ? "OPEN 😊" : "CLOSED 😟"}</p>
          </div>
        </div>
        <div className="bg-linear-[to_left,rgba(255,81,0,0.15),#ffffff] flex items-center py-3.5 px-2.5">
          <div className="flex items-center gap-2">
            <img
              className="h-4"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
              alt=""
            />
            <p className="text-primary font-bold text-sm">
              Free delivery on orders above ₹199
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
