import NavItem from "./NavItem";
import { openLogInModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { memo, useCallback } from "react";

const Navbar = memo(({
  showAbout,
  showSearch,
  showOffers,
  showCart,
}) => {
  const dispatch = useDispatch();

  const handleSignIn = useCallback(() => {
    dispatch(openLogInModal());
  }, [dispatch, openLogInModal]);

  return (
    <nav>
      <ul className="flex gap-12 font-[620] items-center justify-evenly text-md">
        {showAbout && (
          <NavItem
            to="about"
            icon={"fa-utensils text-lg"}
            text="About"
          />
        )}
        {showSearch && (
          <NavItem
            to="search"
            icon={"fa-magnifying-glass text-lg"}
            text="Search"
          />
        )}
        {showOffers && (
          <NavItem
            to="offers-dinouts"
            icon={"ri-discount-percent-line text-xl"}
            text="Offers"
            superScript={"NEW"}
          />
        )}
        <NavItem
          to="help"
          icon={"fa-life-ring text-lg"}
          text="Help"
        />
        <NavItem
          to={"/profile"}
          // onClick={handleSignIn}
          icon={"fa-user text-lg"}
          text="Sign In"
        />
        {showCart && (
          <NavItem
            to="cart"
            icon={"fa-cart-shopping text-lg"}
            text="Cart"
          />
        )}
      </ul>
    </nav>
  );
})

export default Navbar;