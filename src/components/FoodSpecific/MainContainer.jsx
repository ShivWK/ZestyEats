// Done

import Cards from '../Home/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFoodCategory } from './../../features/header/headerSlice';
import { selectVegVariant } from '../../features/home/restaurantsSlice';
import { useEffect, useRef, useState } from 'react';
import BreadcrumbsWrapper from '../BreadcrumbsWrapper';
import Filter from '../Home/Filters';
import ScooterAnimation from '../../utils/ScooterAnimation';
import NoData from '../../utils/NoData';

const MainContainer = ({ data }) => {
  // console.log("FoodSpecific MainContainer rendered")
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);
  const [noData, setNoData] = useState(false);
  const mainRef = useRef(null);
  const dispatch = useDispatch();

  const cards = data?.data?.cards;
  const banner = cards?.[0]?.card?.card;
  const title = banner?.title;
  const description = banner?.description;
  const unwantedTypes = [
    'type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead',
    'type.googleapis.com/swiggy.gandalf.widgets.v2.InlineViewFilterSortWidget',
    'type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget',
  ];

  const mainData = cards?.filter((obj) => {
    const type = obj?.card?.card?.['@type'];
    return type && !unwantedTypes.includes(type);
  });

  const dataToSend = mainData?.map((card) => card?.card?.card?.info);

  useEffect(() => {
    dispatch(setCurrentFoodCategory(title));
  }, [dispatch, title]);

  useEffect(() => {
    if (!mainRef.current) return;

    const visibleElementsCount = Array.from(mainRef.current.children).filter(
      (ele) => ele.style.display !== 'none',
    ).length;

    setNoData(visibleElementsCount === 0);
  }, [vegOption, nonVegOption]);

  return cards ? (
    <>
      <main className="relative mx-auto flex w-full flex-col gap-3 overflow-hidden p-3 pt-20 pb-0 md:max-w-[1210px] md:gap-5 md:pt-32 md:pb-5">
        <div>
          <BreadcrumbsWrapper
            normalTextColor={'#4a5565'}
            mainTextColor={'#101828'}
            delimiterColor={'text-gray-600'}
          />
        </div>
        <h1 className="heading mx-0 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {title}
        </h1>
        <p className="description -mt-2 mb-2 text-lg font-medium text-gray-800 max-md:leading-6 md:-mt-4 dark:text-gray-300">
          {description}
        </p>
        <div className="-mt-4 -mb-1 md:-mt-5 md:-mb-2">
          <Filter />
        </div>
        <div className="restro-count text-2xl font-bold tracking-tight dark:text-gray-200">
          <p>Explore Restaurants</p>
        </div>
        <div className="flex justify-center">
          <div ref={mainRef} className="flex w-full flex-wrap gap-9 py-1">
            {noData ? (
              <NoData
                text1="No restaurants available for the selected filter."
                text2=""
              />
            ) : (
              dataToSend.map((item, index) => {
                if (!vegOption && item.veg) return;
                if (!nonVegOption && !item.veg) return;

                return <Cards key={index} data={item} from="specificFood" />;
              })
            )}
          </div>
        </div>
        <div className="md:hidden">
          <ScooterAnimation />
        </div>
      </main>
      {!noData && (
        <div className="hidden md:block">
          <ScooterAnimation />
        </div>
      )}
    </>
  ) : (
    <main className="flex items-center justify-center bg-gray-300">
      <p className="font-semibold text-gray-800">{`Sorry we do not have any restaurants for ${title} in your location`}</p>
    </main>
  );
};

export default MainContainer;
