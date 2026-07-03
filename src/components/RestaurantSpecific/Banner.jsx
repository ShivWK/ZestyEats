import { Link, useSearchParams } from 'react-router-dom';
import { selectCity, selectLatAndLng } from '../../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { lazy } from 'react';
const PureVegSvg = lazy(() => import('../../utils/PureVegSvg'));
const VegAndNonVegSvg = lazy(() => import('../../utils/VegAndNonVegSvg'));
import updateCityHomeData from '../../utils/updateCityHomeData';
import {
  selectSecondaryCity,
  setCityPageLoading,
  setSecondaryCity,
} from '../../features/cityHome/cityHomeSlice';
import { useLazyGetDataForCityLocalityCuisineQuery } from '../../features/cityHome/cityHomeApiSlice';
import calDistance from './../../utils/haversineFormula';

const Banner = ({ data }) => {
  const mainData = data?.card?.card?.info;
  const [lat, lng] = mainData.latLong.split(',');
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  const { lat: latUser, lng: lngUser } = useSelector(selectLatAndLng);

  const userDistanceFromTheRestaurant = calDistance(lat, latUser, lng, lngUser);

  let deliverable = true;
  if (userDistanceFromTheRestaurant > 10) deliverable = false;

  const opened = mainData.availability.opened;

  const veg = mainData?.veg;
  const citySelector =
    mode === 'cityPage' || mode === 'dishPage'
      ? selectSecondaryCity
      : selectCity;

  const searchedCity = useSelector(citySelector)
    .toLowerCase()
    .replace(/\s/g, '-');

  const dispatch = useDispatch();
  const [trigger] = useLazyGetDataForCityLocalityCuisineQuery();

  const clickHandler = async (city, cityPath, cuisine) => {
    dispatch(setSecondaryCity(city));
    dispatch(setCityPageLoading(true));

    try {
      const data = await trigger({ city: cityPath, type: cuisine }).unwrap();
      updateCityHomeData(data, dispatch);
    } catch (err) {
      console.log('Cant fetch cuisine data', err);
      dispatch(setCityPageLoading(false));
      throw new Error('Cant fetch cuisine data');
    }
  };

  return (
    <div
      id="banner"
      className="mt-2 w-full rounded-4xl bg-gradient-to-t from-[#c7c6c69d] to-[#ffffff] p-3 md:my-3 md:p-5 dark:from-[rgba(254,250,250,0.62)] dark:to-black"
    >
      <div
        id="inner-container"
        className="flex w-full flex-col gap-2.5 overflow-hidden rounded-3xl border border-[#c7c6c69d] bg-white dark:border-0 dark:bg-gray-800"
      >
        <div className="flex w-full flex-col gap-1.5 self-center p-3.5">
          <div
            id="rating"
            className="flex items-center gap-2.5 dark:text-white"
          >
            <div className="flex items-center gap-1">
              <i className="ri-user-star-fill text-xl text-green-600 dark:text-green-400"></i>
              <p className="font-bold">{`${mainData?.avgRatingString}(${mainData?.totalRatingsString})`}</p>
            </div>
            <p className="text-gray-500 dark:text-gray-300">•</p>
            <p className="font-bold">{mainData?.costForTwoMessage}</p>
            <p className="hidden text-gray-500 md:block dark:text-gray-300">
              •
            </p>
            {veg ? (
              <PureVegSvg classes="hidden md:inline-flex" />
            ) : (
              <VegAndNonVegSvg classes="hidden md:inline-flex px-2 my-1 py-0.5 pr-2" />
            )}
          </div>
          <div
            id="cuisines"
            className="text-primary flex gap-1 text-sm font-bold underline"
          >
            {mainData?.cuisines.length !== 0 &&
              mainData?.cuisines?.map((text, index, array) => {
                if (index == array.length - 1) {
                  const cuisine =
                    text.toLowerCase().replace(/\s/g, '-') + '-cuisine-';
                  const showCuisine = text.toLowerCase().replace(/\s/g, '-');
                  return (
                    <Link
                      to={`/cityPage/${searchedCity}?mode=cuisine?type=${showCuisine}`}
                      key={text}
                      onClick={() => clickHandler(text, searchedCity, cuisine)}
                    >
                      {text}
                    </Link>
                  );
                }
                const cuisine =
                  text.toLowerCase().replace(/\s/g, '-') + '-cuisine-';
                const showCuisine = text.toLowerCase().replace(/\s/g, '-');

                return (
                  <Link
                    to={`/cityPage/${searchedCity}?mode=cuisine?type=${showCuisine}`}
                    key={text}
                    onClick={() => clickHandler(text, searchedCity, cuisine)}
                  >{`${text} ,`}</Link>
                );
              })}
          </div>
          <div id="delivery" className="mt-2 flex gap-2">
            <div className="flex flex-col items-center justify-center p-0">
              <div className="rounded-[50%] bg-[#a7a5a5] p-1"></div>
              <div className="h-7 w-0.5 bg-[#a7a5a5]"></div>
              <div className="rounded-[50%] bg-[#a7a5a5] p-1"></div>
            </div>
            <div className="flex flex-col gap-4 text-sm font-bold text-black">
              <div className="flex gap-2 p-0">
                <p className="dark:text-white">Outlet</p>
                <p className="font-semibold text-gray-600 dark:text-gray-300">
                  {mainData?.areaName}
                </p>
                <p className="hidden text-gray-950 md:inline-block dark:text-gray-300">
                  •
                </p>
                <p
                  className={`${opened ? 'text-green-500 dark:text-green-400' : 'text-red-600'} hidden font-semibold md:inline-block`}
                >
                  {opened ? 'OPEN 😊' : 'CLOSED 😟'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="dark:text-white">
                  {mainData?.sla?.slaString || '25-30 MINS'}
                </p>
                {!deliverable && (
                  <p className="font-medium text-red-500">
                    (Not delivering to your area)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {veg ? (
            <PureVegSvg classes="mb-1 ml-3 -mt-2 max-md:inline-flex hidden" />
          ) : (
            <VegAndNonVegSvg classes="hidden ml-3 max-md:inline-flex px-2 my-1 pr-2 py-1 mb-2" />
          )}
          <div
            className={`flex items-center gap-2 ${veg ? '-mt-3 text-sm' : '-mt-1'}`}
          >
            <p className="text-gray-950 md:hidden dark:text-gray-300">•</p>
            <p
              className={`${opened ? 'text-green-500 dark:text-green-400' : 'text-red-600'} font-medium md:hidden`}
            >
              {opened ? 'OPEN 😊' : 'CLOSED 😟'}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-linear-[to_left,rgba(255,81,0,0.15),#ffffff] px-2.5 py-3.5 dark:bg-linear-[to_left,rgba(255,81,0,0.15),#1e2939]">
          <div className="flex items-center gap-2">
            <img
              className="h-4"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
              alt=""
            />
            <p className="text-primary text-sm font-bold">
              Free delivery on orders above ₹199
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
