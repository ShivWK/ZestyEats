import NavItem from "./NavItem";
import { openLogInModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function handleClick() {
  toast("Click hu ji");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(openLogInModal());
  };

  return (
    <nav>
      <ul className="flex gap-12 font-[620] items-center justify-evenly text-md">
        <NavItem
          to="about"
          onClick={handleClick}
          icon={"fa-solid fa-utensils text-lg"}
          text="About"
        />
        <NavItem
          to="search"
          onClick={handleClick}
          icon={"fa-magnifying-glass text-lg"}
          text="Search"
        />
        <NavItem
          to="offers-dinouts"
          onClick={handleClick}
          icon={"ri-discount-percent-line text-xl"}
          text="Offers"
          superScript={"NEW"}
        />
        <NavItem
          to="help"
          onClick={handleClick}
          icon={"fa-life-ring text-lg"}
          text="Help"
        />
        <NavItem
          onClick={handleSignIn}
          icon={"fa-user text-lg"}
          text="Sign In"
        />
        <NavItem
          to="cart"
          onClick={handleClick}
          icon={"fa-cart-shopping text-lg"}
          text="Cart"
        />
      </ul>
    </nav>
  );
}
