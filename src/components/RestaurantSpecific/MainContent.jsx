import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import Banner from "./Banner";
import TopPicksCards from "./TopPicksCards";
import Footer from "./Footer";
import ItemsMainHeading from "./ItemsMainHeading";

const MainContent = ({ data, routes = true }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCurrentRestaurant(title));
  }, []);

  const cards = data?.data?.cards;
  const title = cards?.[0].card?.card?.text;

  const navigation = useMemo(() => cards?.[1], [cards]);
  const banner = useMemo(() => cards?.[2], [cards]);
  const offers = useMemo(() => cards?.[3], [cards]);
  const menu = cards
    ?.at(-1)
    ?.groupedCard?.cardGroupMap?.REGULAR?.cards.slice(1);

  const topPicks = useMemo(
    () =>
      menu.find((item) => {
        return item?.card?.card?.title === "Top Picks";
      }),
    [menu]
  );

  // console.log("Top Picks", topPicks);

  const recommendations = useMemo(
    () =>
      menu.find((item) => {
        return item?.card?.card?.title === "Recommended";
      }),
    [menu]
  );

  // console.log("Recommendations", recommendations);

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

  console.log("Rest Data", restMenuData);

  return (
    <div className="flex items-center flex-col pt-24 mx-auto w-full max-w-[800px]">
      {routes && (
        <div className="mt-3.5 mb-3 self-start text-sm font-semibold">
          <p>Routes</p>
        </div>
      )}

      {/* Title */}
      <div className="w-full max-w-[775px] mt-2">
        <h1>{title}</h1>
      </div>

      {/* Banner */}
      {<Banner data={banner} />}
      <hr />

      {/* Top Picks */}
      <section className="w-full max-w-[775px] mt-2">
        {topPicks && <TopPicksCards data={topPicks} />}
      </section>

      <section className="w-full max-w-[775px] mt-2 first:border-t-gray-200 first:border-t-[16px]">
        {restMenuData.length > 0 &&
          restMenuData.map((item, index) => {
            return (
              <ItemsMainHeading
                key={item?.card?.card?.title}
                heading={item?.card?.card?.title}
                items={item?.card?.card?.itemCards}
                topBorder={index === 0}
              />
            );
          })}
      </section>

      <footer>
        <Footer />
      </footer>

      {/* menu button */}
      <button className="fixed bottom-3.5 right-72 h-[12vh] w-[12vh] rounded-[50%] bg-black text-white text-xs font-bold shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] cursor-pointer">
        MENU
      </button>
    </div>
  );
};

export default MainContent;
