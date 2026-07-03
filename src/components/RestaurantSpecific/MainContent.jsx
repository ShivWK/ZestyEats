import { useEffect, useMemo, lazy, Suspense, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCurrentRestaurant,
  toggleMenuModel,
  selectMenuModel,
} from '../../features/home/restaurantsSlice';
import { selectVegVariant } from '../../features/home/restaurantsSlice';
import { useParams } from 'react-router-dom';

import Banner from './Banner';
import Footer from './Footer';
import NoData from '../../utils/NoData';

import Offers from './Offers';
const SearchBar = lazy(() => import('./SearchBar'));
import BackToTopBtn from '../BackToTopBtn';

const TopPicksCards = lazy(() => import('./TopPicksCards'));
const ItemsMainHeading = lazy(() => import('./ItemsMainHeading'));
import BreadcrumbsWrapper from '../BreadcrumbsWrapper';
import Menu from './Menu';
import Filter from '../Home/Filters';
import textToZestyEats from '../../utils/textToZestyEats';
import useScrollToTop from '../../utils/useScrollToTop';

const MainContent = ({ data, routes = true }) => {
  useScrollToTop();
  const restaurantData = {};
  const [showMenu, setShowMenu] = useState(false);
  const [noData, setNoData] = useState(false);
  const mainRef = useRef(null);

  const dispatch = useDispatch();
  const cards = data?.data?.cards;

  const title = textToZestyEats(cards?.[0].card?.card?.text);

  const banner = useMemo(() => cards?.[2], [cards]);
  const opened = banner?.card?.card?.info?.availability.opened;

  restaurantData.metadata = banner?.card?.card?.info;

  const offers = useMemo(() => cards?.[3], [cards]);
  restaurantData.offers =
    offers?.card?.card?.gridElements?.infoWithStyle?.offers;

  const menu =
    cards?.at(-1)?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1) || [];

  const menuModel = useSelector(selectMenuModel);
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
  }, []);

  const topPicks = useMemo(
    () =>
      menu?.find((item) => {
        return item?.card?.card?.title === 'Top Picks';
      }),
    [menu],
  );

  const RestaurantLicenseInfo = useMemo(
    () =>
      menu?.find((item) => {
        return (
          item?.card?.card?.['@type'] ===
          'type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo'
        );
      }),
    [menu],
  );

  const RestaurantAddress = useMemo(
    () =>
      menu?.find((item) => {
        return (
          item?.card?.card?.['@type'] ===
          'type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress'
        );
      }),
    [menu],
  );

  restaurantData.address = RestaurantAddress?.card?.card;

  const restMenuData = useMemo(() => {
    return menu?.filter((item) => {
      return (
        item?.card?.card?.title !== 'Top Picks' &&
        item?.card?.card?.['@type'] !==
          'type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo' &&
        item?.card?.card?.['@type'] !==
          'type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress'
      );
    });
  });

  useEffect(() => {
    setTimeout(() => {
      if (!mainRef.current) return;

      const visibleElementsCount = Array.from(mainRef.current.children).filter(
        (ele) => ele.style.display !== 'none',
      ).length;

      setNoData(visibleElementsCount === 0);
    }, 500);
  }, [vegOption, nonVegOption]);

  return (
    <>
      <main className="mx-auto flex w-full flex-col items-center scroll-smooth px-2 pt-18 md:max-w-[800px] md:px-0 md:pt-24">
        {routes && (
          <div className="hide-scrollbar mt-3.5 mb-3 w-full self-start overflow-auto text-sm font-semibold">
            <BreadcrumbsWrapper
              normalTextColor={'#4a5565'}
              mainTextColor={'#101828'}
              delimiterColor={'text-gray-600'}
            />
          </div>
        )}

        {/* Title */}
        <div className="mt-0.5 w-full md:mt-2">
          <h1 className="dark:text-white">{title}</h1>
        </div>

        {/* Banner */}
        {banner && <Banner data={banner} opened={opened} />}

        {/* Offers */}
        <section className="my-2 w-full max-md:mt-4">
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
        <section ref={mainRef} className="mt-2 w-full">
          {topPicks && (
            <Suspense
              ref={mainRef}
              fallback={
                <div className="flex justify-between overflow-hidden">
                  <div className="shimmerBg h-60 w-64 shrink-0 rounded-xl"></div>
                  <div className="shimmerBg h-60 w-64 shrink-0 rounded-xl"></div>
                  <div className="shimmerBg h-60 w-64 shrink-0 rounded-xl"></div>
                </div>
              }
            >
              <TopPicksCards
                data={topPicks}
                restaurantData={restaurantData}
                opened={opened}
              />
            </Suspense>
          )}
        </section>

        <hr className="mt-6 mb-2 w-full text-gray-500 md:mb-4 dark:text-gray-300" />

        {/* Sorting */}
        <Filter text1="Veg" text2="Non Veg" />

        {/* Menu */}
        {menuModel && <Menu clickHandler={setShowMenu} />}

        <section
          ref={mainRef}
          className="mt-4 w-full first:border-t-[16px] first:border-t-gray-200"
        >
          {noData ? (
            <NoData />
          ) : (
            restMenuData?.length > 0 &&
            restMenuData?.map((item, index) => {
              if (item?.card?.card?.categories) {
                return (
                  <Suspense
                    key={index}
                    fallback={
                      <div className="my-2 flex h-56 w-full flex-col gap-2 rounded-xl border-[1px] border-gray-400 p-3 md:flex-row">
                        <div className="shimmerBg h-full basis-1/2 rounded-xl md:order-2 md:basis-[35%]"></div>
                        <div className="flex h-full basis-[48%] flex-col items-start justify-center gap-4 md:order-1 md:basis-[65%] md:gap-1.5">
                          <div className="shimmerBg h-5 w-[80%] rounded"></div>
                          <div className="shimmerBg h-5 w-[50%] rounded"></div>
                          <div className="shimmerBg h-5 w-[60%] rounded"></div>
                          <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
                        </div>
                      </div>
                    }
                  >
                    <ItemsMainHeading
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
                    <div className="my-2 flex h-56 w-full flex-col gap-2 rounded-xl border-[1px] border-gray-400 p-3 md:flex-row">
                      <div className="shimmerBg h-full basis-1/2 rounded-xl md:order-2 md:basis-[35%]"></div>
                      <div className="flex h-full basis-[48%] flex-col items-start justify-center gap-4 md:order-1 md:basis-[65%] md:gap-1.5">
                        <div className="shimmerBg h-5 w-[80%] rounded"></div>
                        <div className="shimmerBg h-5 w-[50%] rounded"></div>
                        <div className="shimmerBg h-5 w-[60%] rounded"></div>
                        <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
                      </div>
                    </div>
                  }
                >
                  <ItemsMainHeading
                    heading={textToZestyEats(item?.card?.card?.title)}
                    items={item?.card?.card?.itemCards}
                    topBorder={index === 0}
                    borderBottom={index === restMenuData.length - 1}
                    restaurantData={restaurantData}
                    opened={opened}
                  />
                </Suspense>
              );
            })
          )}
        </section>

        {/* menu button */}
        <button
          onClick={() => dispatch(toggleMenuModel())}
          className={`menu-button fixed right-4 transform cursor-pointer rounded-md bg-black px-3.5 py-4 text-xs font-bold text-white shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] transition-all duration-200 ease-linear active:scale-95 md:right-[300px] dark:bg-red-800 dark:shadow-[0_0_10px_5px_rgba(159,7,18,0.4)] ${menuModel && 'md:hidden'}`}
        >
          MENU
        </button>

        <BackToTopBtn percentage={20} />
      </main>
      <footer className="mx-auto w-full bg-gray-100 md:max-w-[800px]">
        <Footer license={RestaurantLicenseInfo} address={RestaurantAddress} />
      </footer>
    </>
  );
};

export default MainContent;
