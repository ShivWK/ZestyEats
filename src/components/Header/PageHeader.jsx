import HelpHeader from "./HelpHeader";
import HomeHeader from "./HomeHeader";
import ProfileHeader from "./ProfileHeader";
import CartHeader from "./CartHeader";
import { useLocation } from "react-router-dom";

export default function PageHeader() {
  const { pathname } = useLocation();

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
  }

  return null;
}
