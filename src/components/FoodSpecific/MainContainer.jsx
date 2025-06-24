import Cards from "./../Home/Cards";
import { useDispatch } from "react-redux";
import { setCurrentFoodCategory } from "./../../features/header/headerSlice";
import { useEffect } from "react";
import BreadcrumbsWrapper from "../BreadcrumbsWrapper";

const MainContainer = ({ data }) => {
  const dispatch = useDispatch();
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

  return ( cards ?
    <div className="flex flex-col gap-5 w-full md:max-w-[1210px] md:pt-32 pt-24 p-3 mx-auto pb-16">
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
      <p className="description text-lg font-semibold text-gray-800 -mt-2">
        {description}
      </p>
      {/* <div className="shorter rounded-md flex gap-3">
            <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
            <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
            <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
        </div> */}
      <div className="restro-count text-2xl font-bold tracking-tight">
        Explore Restaurants
      </div>
      <div className="flex justify-center">
        <div className="flex w-full gap-9 p-1 flex-wrap">
          {dataToSend.map((item, index) => {
            return <Cards key={index} data={item} from="specificFood" />;
          })}
        </div>
      </div>
    </div>
    : <div className="flex items-center justify-center bg-gray-300">
      <p className="text-gray-800 font-semibold">{`Sorry we do not have any restaurants for ${title} in your location`}</p>
    </div>
  );
};

export default MainContainer;

// width = 360px
// height = 384px
