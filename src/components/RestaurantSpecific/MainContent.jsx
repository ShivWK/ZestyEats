import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import Banner from "./Banner";
import TopPicksCards from "./TopPicksCards";

const MainContent = ({ data, routes = true }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
  }, []);

  const cards = data?.data?.cards;
  const title = cards?.[0].card?.card?.text;

  const navigation = cards?.[1];
  const banner = cards?.[2];
  const offers = cards?.[3];
  const menu = cards
    ?.at(-1)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1);

  const topPicks = menu.find((item) => {
    return item?.card?.card?.title === "Top Picks";
  });

  // console.log("Top Picks", topPicks);

  const recommendations = menu.find((item) => {
    return item?.card?.card?.title === "Recommended";
  });

  // console.log("Recommendations", recommendations);

  const RestaurantLicenseInfo = menu.find((item) => {
    return (
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo"
    );
  });

  // console.log("Restaurant License Info", RestaurantLicenseInfo);

  const RestaurantAddress = menu.find((item) => {
    return (
      item?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
    );
  });

  // console.log("Restaurant Address", RestaurantAddress);

  const restMenuData = menu.filter((item) => {
    return (
      item?.card?.card?.title !== "Top Picks" &&
      item?.card?.card?.title !== "Recommended" &&
      item?.card?.card?.["@type"] !==
        "type.googleapis.com/swiggy.presentation.food.v2.RestaurantLicenseInfo" &&
      item?.card?.card?.["@type"] !==
        "type.googleapis.com/swiggy.presentation.food.v2.RestaurantAddress"
    );
  });

  // console.log("Rest Data", restMenuData);

  return (
    <div className="flex items-center flex-col pt-24 mx-auto w-full max-w-[800px]">
      {routes && (
        <div className="mt-3.5 mb-3 self-start text-sm font-semibold">
          <p>Routes</p>
        </div>
      )}
      <div className="w-full max-w-[775px] mt-2">
        <h1>{title}</h1>
      </div>
      {<Banner data={banner} />}
      <hr />
      {topPicks && <TopPicksCards data={topPicks} />}

      {/* menu button */}
      <button className="fixed bottom-3.5 right-72 h-[12vh] w-[12vh] rounded-[50%] bg-black text-white text-xs font-bold shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] cursor-pointer">
        MENU
      </button>
    </div>
  );
};

export default MainContent;
