import HelpHeader from "./HelpHeader";
import HomeHeader from "./HomeHeader";
import ProfileHeader from "./ProfileHeader";
import CartHeader from "./CartHeader";
import RestaurantsHeader from "./RestaurantsHeader";
import { useLocation } from "react-router-dom";

export default function PageHeader() {
  const { pathname } = useLocation();
  // console.log(pathname);

  if (
    pathname === "/about" ||
    pathname === "/search" ||
    pathname === "/offers-dinouts" ||
    pathname === "/"
  ) {
    return <HomeHeader />;
  } else if (pathname === "/help") {
    return <HelpHeader />;
  } else if (pathname === "/profile") {
    return <ProfileHeader />;
  } else if (pathname === "/cart") {
    return <CartHeader />;
  } else if (pathname.includes("restaurantSpecific")) {
    return <RestaurantsHeader />
  }

  return null;
}
