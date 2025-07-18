import { useEffect, useMemo, lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentRestaurant, toggleMenuModel, selectMenuModel } from "../../features/home/restaurantsSlice";
import { useParams } from "react-router-dom";

import Banner from "./Banner";
import Footer from "./Footer";

import Offers from "./Offers";
// const SearchBar = lazy(() => import("./SearchBar"));
import BackToTopBtn from "../BackToTopBtn";

const TopPicksCards = lazy(() => import("./TopPicksCards"));
const ItemsMainHeading = lazy(() => import("./ItemsMainHeading"));
import BreadcrumbsWrapper from "../BreadcrumbsWrapper";
import Menu from "./Menu";
import Filter from "../Home/Filters";
import textToZestyEats from "../../utils/textToZestyEats";

const MainContent = ({ data, routes = true }) => {
  const restaurantData = {};
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const cards = data?.data?.cards;

  const title = textToZestyEats(cards?.[0].card?.card?.text);

  const banner = useMemo(() => cards?.[2], [cards]);
  const opened = banner?.card?.card?.info?.availability.opened;

  restaurantData.metadata = banner?.card?.card?.info;

  const offers = useMemo(() => cards?.[3], [cards]);
  restaurantData.offers = offers?.card?.card?.gridElements?.infoWithStyle?.offers;

  const menu = cards
    ?.at(-1)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1) || [];

  const menuModel = useSelector(selectMenuModel);

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
  }, []);

  const topPicks = useMemo(
    () =>
      menu?.find((item) => {
        return item?.card?.card?.title === "Top Picks";
      }),
    [menu]
  );

  const RestaurantLicenseInfo = useMemo(
    () =>
      menu?.find((item) => {
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

  restaurantData.address = RestaurantAddress?.card?.card;

  const restMenuData = useMemo(() => {
    return menu?.filter((item) => {
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
    <>
      <main className="flex items-center flex-col pt-18 md:pt-24 px-2 md:px-0 mx-auto w-full md:max-w-[800px] scroll-smooth">
        {routes && (
          <div className="mt-3.5 mb-3 self-start text-sm font-semibold w-full overflow-auto hide-scrollbar">
            <BreadcrumbsWrapper normalTextColor={"#4a5565"} mainTextColor={"#101828"} delimiterColor={"text-gray-600"} />
          </div>
        )}

        {/* Title */}
        <div className="w-full mt-0.5 md:mt-2">
          <h1>{title}</h1>
        </div>

        {/* Banner */}
        {banner && <Banner data={banner} opened={opened} />}

        {/* Offers */}
        <section className="w-full max-md:mt-4  my-2">
          {offers && <Offers data={offers} />}
        </section>

        {/* Search */}
        {/* <section className="w-full md:max-w-[775px] my-3 md:my-4">
        <Suspense fallback={<div className="flex relative py-3 items-center justify-center w-full bg-gray-200 rounded-md cursor-pointer">
          <p className="font-semibold text-gray-700">Search for dishes...</p>
          <i className="absolute right-3 fa-solid fa-magnifying-glass text-xl text-gray-500"></i>
        </div>}>
          <SearchBar lat={lat} lng={lng} restaurant_Id={id} name={title} />
        </Suspense>
      </section> */}

        {/* Top Picks */}
        <section className="w-full mt-2">
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
              <TopPicksCards data={topPicks} restaurantData={restaurantData} opened={opened} />
            </Suspense>
          )}
        </section>

        <hr className="mb-2 md:mb-4 mt-6 w-full text-gray-500" />

        {/* Sorting */}
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
                      <div className="w-full p-3 h-56 rounded-xl gap-2 my-2 flex flex-col md:flex-row border-[1px] border-gray-400">
                        <div className="basis-1/2 md:basis-[35%] h-full shimmerBg rounded-xl md:order-2"></div>
                        <div className="h-full basis-[48%] md:basis-[65%] flex md:gap-1.5 gap-4 items-start justify-center flex-col md:order-1">
                          <div className="h-5 w-[80%] rounded shimmerBg"></div>
                          <div className="h-5 w-[50%] rounded shimmerBg"></div>
                          <div className="h-5 w-[60%] rounded shimmerBg"></div>
                          <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
                        </div>
                      </div>
                    }
                  >
                    <ItemsMainHeading
                      key={item?.card?.card?.categoryId || Math.random()}
                      heading={textToZestyEats(item?.card?.card?.title)}
                      categories={item?.card?.card?.categories}
                      topBorder={index === 0}
                      borderBottom={index === restMenuData.length - 1}
                      restaurantData={restaurantData}
                      opened={opened}
                    />
                  </Suspense>
                );
              }

              return (
                <Suspense
                  fallback={
                    <div className="w-full p-3 h-56 rounded-xl gap-2 my-2 flex flex-col md:flex-row border-[1px] border-gray-400">
                      <div className="basis-1/2 md:basis-[35%] h-full shimmerBg rounded-xl md:order-2"></div>
                      <div className="h-full basis-[48%] md:basis-[65%] flex md:gap-1.5 gap-4 items-start justify-center flex-col md:order-1">
                        <div className="h-5 w-[80%] rounded shimmerBg"></div>
                        <div className="h-5 w-[50%] rounded shimmerBg"></div>
                        <div className="h-5 w-[60%] rounded shimmerBg"></div>
                        <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
                      </div>
                    </div>
                  }
                >
                  <ItemsMainHeading
                    key={item?.card?.card?.categoryId || Math.random()}
                    heading={textToZestyEats(item?.card?.card?.title)}
                    items={item?.card?.card?.itemCards}
                    topBorder={index === 0}
                    borderBottom={index === restMenuData.length - 1}
                    restaurantData={restaurantData}
                    opened={opened}
                  />
                </Suspense>
              );
            })}
        </section>
        {/* menu button */}
        <button onClick={() => dispatch(toggleMenuModel())} className={`fixed bottom-4 md:bottom-3.5 right-4 md:right-[300px] py-4 px-3.5 rounded-md bg-black text-white text-xs font-bold shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] cursor-pointer active:scale-95 transform transition-all duration-150 ease-in-out ${menuModel && "md:hidden"}`}
        >
          MENU
        </button>
        <BackToTopBtn percentage={20} />
      </main>
      <footer className="w-full md:max-w-[800px] mx-auto bg-gray-100">
        <Footer license={RestaurantLicenseInfo} address={RestaurantAddress} />
      </footer>
    </>
  );
};

export default MainContent;
