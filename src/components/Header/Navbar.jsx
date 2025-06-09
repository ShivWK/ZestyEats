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
  const loggedIn = false;
  const dispatch = useDispatch();

  const handleSignIn = useCallback(() => {
    dispatch(openLogInModal());
  }, [dispatch, openLogInModal]);

  return (
    <nav>
      <ul className="flex gap-12 font-[620] items-center justify-evenly text-md">
        <button className="group cursor-pointer text-xl active:scale-95">
          <i className="fa-solid fa-sun group-hover:text-[#ff5200]"></i>
          {/* <i class="ri-moon-clear-fill"></i> */}
          {/* <i class="ri-moon-fill"></i> */}
          {/* <i class="ri-computer-fill"></i> */}
          {/* <i class="ri-smartphone-line text-2xl"></i> */}
        </button>
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
          icon={"fa-solid fa-handshake-angle"}
          text="Help"
        />
        {/* <i class="fa-solid fa-handshake-angle"></i> */}
        {loggedIn ? (<NavItem
          to={"/profile"}
          icon={"fa-user text-lg"}
          text={`User`}
        />) : (
          <button onClick={handleSignIn} className="group flex items-center justify-between gap-3 hover:cursor-pointer :hover:font-[#ff5200]" >
            <i className="fas fa-sign-in text-lg group-hover:text-[#ff5200]"></i>
            <span className="relative group-hover:text-[#ff5200]">Sign In</span>
          </button>
        )

        }
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