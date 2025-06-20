import GeneralHeader from "./GeneralHeader";
import CartHeader from "./CartHeader";
import RestaurantsHeader from "./RestaurantsHeader";
import SpecificFoodHeader from "./SpecificFoodHeader";
import { useLocation } from "react-router-dom";
import { memo } from "react";

const PageHeader = memo(() => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <GeneralHeader />;
  } else if (pathname === "/about") {
    return <GeneralHeader placeholder={"About"} />
  } else if (pathname === "/search" || pathname === "/search/suggestions" || pathname === "/search/searchResult/dishPage" || pathname === "/search/searchResult/restaurantPage") {
    return <GeneralHeader placeholder={"Search"} />
  } else if (pathname === "/offers-dinouts") {
    return <GeneralHeader placeholder={"Offers"} />
  } else if (pathname === "/help") {
    return <GeneralHeader placeholder={"HELP & SUPPORT"} />;
  } else if (pathname === "/profile") {
    return <GeneralHeader placeholder={"MY ACCOUNT"} />;
  } else if (pathname === "/cart") {
    return <CartHeader />;
  } else if (pathname.includes("restaurantSpecific") || pathname.includes("dishSearch")) {
    return <RestaurantsHeader />;
  } else if (pathname.includes("specificFood")) {
    return <SpecificFoodHeader />
  }

  return null;
});

export default PageHeader;
