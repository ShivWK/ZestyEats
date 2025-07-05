import Cards from "./../Home/Cards";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFoodCategory } from "./../../features/header/headerSlice";
import { selectVegVariant } from "../../features/home/restaurantsSlice";
import { useEffect } from "react";
import BreadcrumbsWrapper from "../BreadcrumbsWrapper";
import Filter from "../Home/Filters";

const MainContainer = ({ data }) => {
  const dispatch = useDispatch();
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

  const cards = data?.data?.cards;
  const banner = cards?.[0]?.card?.card;
  const title = banner?.title;
  const description = banner?.description;
  const unwantedTypes = [
    "type.googleapis.com/swiggy.gandalf.widgets.v2.CollectionMasthead",
    "type.googleapis.com/swiggy.gandalf.widgets.v2.InlineViewFilterSortWidget",
    "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget",
  ];

  const mainData = cards?.filter((obj) => {
    const type = obj?.card?.card?.["@type"];
    return type && !unwantedTypes.includes(type);
  });

  const dataToSend = mainData.map((card) => card?.card?.card?.info);

  useEffect(() => {
    dispatch(setCurrentFoodCategory(title));
  }, []);

  return (cards ?
    <div className="relative flex flex-col gap-3 md:gap-5 w-full overflow-hidden md:max-w-[1210px] md:pt-32 pt-20 p-3 mx-auto pb-4 md:pb-5">
      <div>
        <BreadcrumbsWrapper
          normalTextColor={"#4a5565"}
          mainTextColor={"#101828"}
          delimiterColor={"text-gray-600"}
        />
      </div>
      <h1 className="heading text-black md:text-5xl text-4xl font-bold tracking-tight mx-0">
        {title}
      </h1>
      <p className="description text-lg font-semibold text-gray-800 -mt-2 max-md:leading-6">
        {description}
      </p>
      <div className="md:-mt-5 -mt-4 -mb-1 md:-mb-2">
        <Filter />
      </div>
      <div className="restro-count text-2xl font-bold tracking-tight">
        <p>Explore Restaurants</p>
      </div>
      <div className="flex justify-center">
        <div className="flex w-full gap-9 p-1 flex-wrap">
          {dataToSend.map((item, index) => {

            if (!vegOption && item.veg) return;
            if (!nonVegOption && !item.veg) return;

            return <Cards key={index} data={item} from="specificFood" />;
          })}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 w-fit my-2 animate-dishes">
        <i className="ri-verified-badge-fill text-xl md:text-2xl text-black"></i>
        <i className="ri-bowl-fill text-2xl md:text-3xl text-black"></i>
        <i className="ri-e-bike-2-fill text-2xl md:text-3xl text-black"></i>
      </div>
    </div>
    : <div className="flex items-center justify-center bg-gray-300">
      <p className="text-gray-800 font-semibold">{`Sorry we do not have any restaurants for ${title} in your location`}</p>
    </div>
  );
};

export default MainContainer;

