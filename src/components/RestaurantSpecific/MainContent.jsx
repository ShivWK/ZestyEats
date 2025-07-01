import { useEffect, useMemo, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRestaurant, selectMenuItems, toggleMenuModel, selectMenuModel } from "../../features/home/restaurantsSlice";
import { useParams } from "react-router-dom";

import Banner from "./Banner";
import Footer from "./Footer";
import SortingButtons from "./SortingButtons";
import Offers from "./Offers";
import SearchBar from "./SearchBar";
import BackToTopBtn from "../BackToTopBtn";

const TopPicksCards = lazy(() => import("./TopPicksCards"));
const ItemsMainHeading = lazy(() => import("./ItemsMainHeading"));
import BreadcrumbsWrapper from "../BreadcrumbsWrapper";
import Menu from "./Menu";
import Filter from "../Home/Filters";
import textToZestyEats from "../../utils/textToZestyEats";

const MainContent = ({ data, routes = true }) => {
  const { lat, lng, id } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const cards = data?.data?.cards;
  const title = textToZestyEats(cards?.[0].card?.card?.text);
  const banner = useMemo(() => cards?.[2], [cards]);
  const offers = useMemo(() => cards?.[3], [cards]);
  const menu = cards
    ?.at(-1)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1) || [];

  const menuModel = useSelector(selectMenuModel);

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

  const RestaurantAddress = useMemo(
    () =>
      menu?.find((item) => {
        return (
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
        );
      }),
    [menu]
  );

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

  return (
    <div className="flex items-center flex-col pt-18 md:pt-24 px-2.5 md:px-0 mx-auto w-full md:max-w-[800px] scroll-smooth">
      {routes && (
        <div className="mt-3.5 mb-3 self-start text-sm font-semibold w-full overflow-auto hide-scrollbar">
          <BreadcrumbsWrapper normalTextColor={"#4a5565"} mainTextColor={"#101828"} delimiterColor={"text-gray-600"} />
        </div>
      )}

      {/* Title */}
      <div className="w-full max-w-[775px] mt-2">
        <h1>{title}</h1>
      </div>

      {/* Banner */}
      {banner && <Banner data={banner} />}

      {/* Offers */}
      <section className="w-full  my-2">
        {offers && <Offers data={offers} />}
      </section>

      {/* Search */}
      <section className="w-full max-w-[775px] my-3 md:my-4">
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

      <hr className="mb-4 mt-6 w-full text-gray-500" />

      {/* Sorting */}
      {/* <SortingButtons /> */}
      <Filter text1="Veg" text2="Non Veg" />

      {/* Menu */}
      {menuModel && <Menu clickHandler={setShowMenu} />}

      <section className="w-full  mt-4 first:border-t-gray-200 first:border-t-[16px]">
        {restMenuData?.length > 0 &&
          restMenuData?.map((item, index) => {
            if (item?.card?.card?.categories) {
              return (
                <Suspense
                  key={item?.card?.card?.categoryId || Math.random()}
                  fallback={
                    <div className="w-full h-36 rounded-xl shimmerBg mt-2.5" />
                  }
                >
                  <ItemsMainHeading
                    key={item?.card?.card?.categoryId || Math.random()}
                    heading={textToZestyEats(item?.card?.card?.title)}
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
                  <div className="w-full h-36 rounded-xl shimmerBg mt-2.5" />
                }
              >
                <ItemsMainHeading
                  key={item?.card?.card?.categoryId || Math.random()}
                  heading={textToZestyEats(item?.card?.card?.title)}
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
      <button onClick={() => dispatch(toggleMenuModel())} className={`fixed bottom-4 md:bottom-3.5 right-4 md:right-[300px] py-4 px-3.5 rounded-md bg-black text-white text-xs font-bold shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] cursor-pointer active:scale-95 transform transition-all duration-150 ease-in-out ${menuModel ? "md:mr-[15px]" : ""}`}
      >
        MENU
      </button>
      <BackToTopBtn percentage={20} />
    </div>
  );
};

export default MainContent;
