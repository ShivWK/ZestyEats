import GeneralHeader from "./GeneralHeader";
import CartHeader from "./CartHeader";
import RestaurantsHeader from "./RestaurantsHeader";
import SpecificFoodHeader from "./SpecificFoodHeader";
import MobileOrdersHeader from "./MobileOrdersHeader";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";

import { selectSecondaryCity } from "../../features/cityHome/cityHomeSlice";

const PageHeader = memo(() => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get("type")
  const city = useSelector(selectSecondaryCity).toUpperCase();


  if (pathname === "/") {
    return <GeneralHeader />;
  } else if (pathname === "/about" || pathname === "/mbAbout") {
    return <GeneralHeader placeholder={"About"} />
  } else if (pathname === "/search" || pathname === "/search/suggestions" || pathname === "/search/searchResult/dishPage" || pathname === "/search/searchResult/restaurantPage" || pathname === "/search/searchResult/cuisinesPage") {
    return <GeneralHeader placeholder={"Search"} />
  } else if (pathname === "/help" || pathname === "/support") {
    return <GeneralHeader placeholder={"HELP & SUPPORT"} />;
  } else if (pathname === "/profile") {
    return <GeneralHeader placeholder={"MY ACCOUNT"} />;
  } else if (pathname === "/cart") {
    return <CartHeader />;
  } else if (pathname.includes("restaurantSpecific") || pathname.includes("dishSearch")) {
    return <RestaurantsHeader />;
  } else if (pathname.includes("specificFood")) {
    return <SpecificFoodHeader />
  } else if (pathname.includes("/cityPage") || pathname.includes("/cityCuisines")) {
    return <GeneralHeader placeholder={city} />
  } else if (pathname === "/mbStaticData") {
    return <GeneralHeader placeholder={type} />
  } else if (pathname === "/ordersAndWishlist") {
    return <MobileOrdersHeader />
  }
  
  return null;
});

export default PageHeader;
