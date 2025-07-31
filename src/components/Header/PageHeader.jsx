import GeneralHeader from "./GeneralHeader";
import CartHeader from "./CartHeader";
import RestaurantsHeader from "./RestaurantsHeader";
import SpecificFoodHeader from "./SpecificFoodHeader";
import MobileOrdersHeader from "./MobileOrdersHeader";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";

import { selectSecondaryCity } from "../../features/cityHome/cityHomeSlice";
import MobileCartHeader from "./MobileCartHeader";

const PageHeader = memo(() => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const type = searchParams.get("type")
  const city = useSelector(selectSecondaryCity).toUpperCase();
  const isSmall = window.innerWidth <= 768; 


  if (pathname === "/") {
    return <GeneralHeader />;
  } else if (pathname === "/about" || pathname === "/mbAbout") {
    return <GeneralHeader placeholder={"About"} />
  } else if (pathname === "/search" || pathname === "/search/suggestions" || pathname === "/search/searchResult/dishPage" || pathname === "/search/searchResult/restaurantPage" || pathname === "/search/searchResult/cuisinesPage") {
    return <GeneralHeader placeholder={"Search"} />
  } else if (pathname === "/help" || pathname === "/support") {
    return <GeneralHeader placeholder={"Help & Support"} />;
  } else if (pathname === "/profile" || pathname === "/mobileProfile") {
    return <GeneralHeader placeholder={"My Account"} />;
  } else if (pathname === "/cart") {
    return isSmall ? <MobileCartHeader /> : <CartHeader />;
  } else if (pathname.includes("restaurantSpecific") || pathname.includes("dishSearch")) {
    return <RestaurantsHeader />;
  } else if (pathname.includes("specificFood")) {
    return <SpecificFoodHeader />
  } else if (pathname.includes("cityPage") || pathname.includes("cityCuisines") || pathname.includes("cityRestaurant") || pathname.includes("cityLocality") || pathname.includes("cityDishes")) {
    return <GeneralHeader placeholder={city} />
  } else if (pathname === "/mbStaticData") {
    return <GeneralHeader placeholder={type} />
  } else if (pathname === "/ordersAndWishlist") {
    return <MobileOrdersHeader />
  } else if (pathname.includes("legalAndPolicies")) {
    return <GeneralHeader placeholder={"Legal & Policies"} />
  }
  
  return null;
});

export default PageHeader;
