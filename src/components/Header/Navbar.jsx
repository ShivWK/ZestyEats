import NavItem from "./NavItem";
import {
  setHideLocation,
  setHideLogin,
  setLogInModal,
  setLoginHovered,
} from "../../features/Login/loginSlice";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useState } from "react";

const Navbar = memo(({ showAbout, showSearch, showOffers, showCart }) => {
  const { lat, lng } = useSelector(selectLatAndLng);
  const loggedIn = false;
  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = useState(false);
  const [theme, setTheme] = useState("Light");

  const handleSignIn = useCallback(() => {
    dispatch(setHideLogin(false));
    dispatch(setHideLocation(false));
    dispatch(setLogInModal(true));
  }, [setLogInModal]);

  const hoverHandler = () => {
    dispatch(setLoginHovered());
  };

  return (
    <nav className="max-md:pr-1.5">
      <ul className="flex gap-2 md:gap-12 font-[620] items-center justify-evenly text-md">
        <li>
          <button
            onBlur={() => setShowDrop(false)}
            onClick={() => setShowDrop(!showDrop)}
            className="group relative cursor-pointer text-xl"
          >
            {theme === "Light" ? (
              <i className="fa-solid fa-sun group-hover:text-[#ff5200] active:scale-95 " />
            ) : theme === "Dark" ? (
              <i class="ri-moon-fill group-hover:text-[#ff5200] active:scale-95"></i>
            ) : (
              <i class="ri-computer-fill group-hover:text-[#ff5200] active:scale-95"></i>
            )}
            {/* <i class="ri-smartphone-line text-2xl"></i> */}
            <div
              className="absolute rounded top-[120%] left-1/2 transform -translate-x-1/2 p-1 bg-white shadow-[0_0_5px_1px_#6a7282] text-sm"
              style={{
                display: showDrop ? "block" : "none",
              }}
            >
              <ul className="list-none">
                <li
                  onClick={(e) => {
                    setTheme("Light");
                  }}
                  className="flex gap-2 items-center py-1.5 px-3.5 md:py-1 md:px-3 hover:bg-primary hover:text-white transition-all duration-100 rounded"
                  style={{
                    backgroundColor: theme === "Light" ? "#e5e7eb" : "",
                    color: theme === "Light" ? "black" : ""
                  }}
                >
                  <i className="fa-solid fa-sun "></i>
                  <span>Light</span>
                </li>
                <li
                  onClick={(e) => {
                    setTheme("Dark");
                  }}
                  className="flex gap-2 items-center py-1.5 px-3.5 md:py-1 md:px-3 hover:bg-primary hover:text-white transition-all duration-100 rounded"
                  style={{
                    backgroundColor: theme === "Dark" ? "#e5e7eb" : "",
                    color: theme === "Dark" ? "black" : ""
                  }}
                >
                  <i className="ri-moon-fill"></i>
                  <span>Dark</span>
                </li>
                <li
                  onClick={(e) => {
                    setTheme("System");
                  }}
                  className="flex gap-2 items-center py-1.5 px-3.5 md:py-1 md:px-3 hover:bg-primary hover:text-white transition-all duration-100 rounded"
                  style={{
                    backgroundColor: theme === "System" ? "#e5e7eb" : "",
                    color: theme === "System" ? "black" : ""
                  }}
                >
                  <i className="ri-computer-fill"></i>
                  <span>System</span>
                </li>
              </ul>
            </div>
          </button>
        </li>
        {showAbout && (
          <NavItem to="about" icon={"fa-utensils text-lg"} text="About" />
        )}
        {showSearch && (
          <NavItem
            to={`search?lat=${lat}&lng=${lng}`}
            icon={"fa-magnifying-glass text-lg"}
            text="Search"
          />
        )}
        {/* {showOffers && (
          <NavItem
            to="offers-dinouts"
            icon={"ri-discount-percent-line text-xl"}
            text="Offers"
            superScript={"NEW"}
          />
        )} */}
        <NavItem to="help" icon={"fa-solid fa-handshake-angle"} text="Help" />
        {loggedIn ? (
          <NavItem to={"/profile"} icon={"fa-user text-lg"} text={`User`} />
        ) : (
          <button
            onMouseEnter={hoverHandler}
            onClick={handleSignIn}
            className="group flex items-center justify-between gap-3 hover:cursor-pointer :hover:font-[#ff5200]"
          >
            <i className="fas fa-sign-in text-lg group-hover:text-[#ff5200] transform group-hover:translate-x-1 transition-transform duration-150 ease-linear"></i>
            <span className="relative group-hover:text-[#ff5200] hidden md:block">Sign In</span>
          </button>
        )}
        {showCart && (
          <NavItem to="cart" icon={"fa-cart-shopping text-lg"} text="Cart" />
        )}
      </ul>
    </nav>
  );
});

export default Navbar;
