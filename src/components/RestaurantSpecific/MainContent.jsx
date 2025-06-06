import { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import Banner from "./Banner";
import Footer from "./Footer";
// import ItemsMainHeading from "./ItemsMainHeading";
import SortingButtons from "./SortingButtons";
import Offers from "./Offers";
import SearchBar from "./SearchBar";
import { useParams, useNavigate } from "react-router-dom";
const TopPicksCards = lazy(() => import("./TopPicksCards"));
const ItemsMainHeading = lazy(() => import("./ItemsMainHeading"));
import {
  selectSearchedCity,
  selectYourCurrentCity,
} from "../../features/home/homeSlice";

const MainContent = ({ data, routes = true }) => {
  const { lat, lng, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCity = useSelector(selectYourCurrentCity);
  const searchedCity = useSelector(selectSearchedCity);
  const cards = data?.data?.cards;
  const title = cards?.[0].card?.card?.text;
  const navigation = useMemo(() => cards?.[1], [cards]);
  const banner = useMemo(() => cards?.[2], [cards]);
  const offers = useMemo(() => cards?.[3], [cards]);
  const menu = cards
    ?.at(-1)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1);

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
  }, []);

  const topPicks = useMemo(
    () =>
      menu.find((item) => {
        return item?.card?.card?.title === "Top Picks";
      }),
    [menu]
  );

  // console.log("Top Picks", topPicks);

  const RestaurantLicenseInfo = useMemo(
    () =>
      menu.find((item) => {
        return (
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
        );
      }),
    [menu]
  );

  // console.log("Restaurant License Info", RestaurantLicenseInfo);

  const RestaurantAddress = useMemo(
    () =>
      menu.find((item) => {
        return (
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
        );
      }),
    [menu]
  );

  // console.log("Restaurant Address", RestaurantAddress);

  const restMenuData = useMemo(() => {
    return menu.filter((item) => {
      return (
        item?.card?.card?.title !== "Top Picks" &&
        item?.card?.card?.["@type"] !==
          "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo" &&
        item?.card?.card?.["@type"] !==
          "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
      );
    });
  });

  // const Route = `${currentCity || searchedCity} | Navigate / ${title}`
  const route = (
    <div className="flex gap-1 items-center text-gray-600 text-xs">
      <p>{`${currentCity || searchedCity} |`}</p>
      <p className="cursor-pointer" onClick={() => navigate(-1)}>Navigate</p>
      <p className="text-gray-900">{`/ ${title}`}</p>
    </div>
  );

  // console.log("Rest Data", restMenuData);

  return (
    <div className="flex items-center flex-col pt-24 mx-auto w-full max-w-[800px]">
      {routes && (
        <div className="mt-3.5 mb-3 self-start text-sm font-semibold">
          {route}
        </div>
      )}

      {/* Title */}
      <div className="w-full max-w-[775px] mt-2">
        <h1>{title}</h1>
      </div>

      {/* Banner */}
      {banner && <Banner data={banner} />}

      {/* Offers */}
      <section className="w-full max-w-[775px] my-2">
        {offers && <Offers data={offers} />}
      </section>

      {/* Search */}
      <section className="w-full max-w-[775px] my-6">
        <SearchBar lat={lat} lng={lng} restro_Id={id} name={title} />
      </section>

      {/* Top Picks */}
      <section className="w-full max-w-[775px] mt-2">
        {topPicks && (
          <Suspense
            fallback={
              <div className="flex justify-between">
                <div className="w-64 h-60 rounded-xl shimmerBg">
                </div>
                <div className="w-64 h-60 rounded-xl shimmerBg">
                </div>
                <div className="w-64 h-60 rounded-xl shimmerBg">
                </div>
              </div>
            }
          >
            <TopPicksCards data={topPicks} />
          </Suspense>
        )}
      </section>

      <hr className="mb-4 w-full text-gray-500" />

      {/* Sorting */}
      <SortingButtons />

      <section className="w-full max-w-[775px] mt-4 first:border-t-gray-200 first:border-t-[16px]">
        {restMenuData.length > 0 &&
          restMenuData.map((item, index) => {
            if (item?.card?.card?.categories) {
              return (
                <Suspense
                  fallback={
                    <div className="w-full h-36 rounded-xl shimmerBg mt-2.5">
  
                    </div>
                  }
                >
                  <ItemsMainHeading
                    key={item?.card?.card?.categoryId || Math.random()}
                    heading={item?.card?.card?.title}
                    categories={item?.card?.card?.categories}
                    topBorder={index === 0}
                    borderBottom={index === restMenuData.length - 1}
                  />
                </Suspense>
              );
            }

            return (
              <Suspense
                fallback={
                  <div className="w-full h-36 rounded-xl shimmerBg mt-2.5">

                  </div>
                }
              >
                <ItemsMainHeading
                  key={item?.card?.card?.categoryId || Math.random()}
                  heading={item?.card?.card?.title}
                  items={item?.card?.card?.itemCards}
                  topBorder={index === 0}
                  borderBottom={index === restMenuData.length - 1}
                />
              </Suspense>
            );
          })}
      </section>

      <footer className="w-full max-w-[775px]">
        <Footer license={RestaurantLicenseInfo} address={RestaurantAddress} />
      </footer>

      {/* menu button */}
      <button className="fixed bottom-3.5 right-72 h-[12vh] w-[12vh] rounded-[50%] bg-black text-white text-xs font-bold shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] cursor-pointer">
        MENU
      </button>
    </div>
  );
};

export default MainContent;
