// Done

import {
  setHideLocation,
  setHideLogin,
  setLogInModal,
  selectIsLoggedIn,
} from '../../features/Login/loginSlice';
import {
  selectLatAndLng,
  selectCurrentTheme,
  setCurrentTheme,
  selectUserDetails,
} from '../../features/home/homeSlice';
import NavItem from './NavItem';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';

const Navbar = ({ showAbout, showSearch, showCart }) => {
  // console.log("Navbar rendered")
  const { lat, lng } = useSelector(selectLatAndLng);
  const theme = useSelector(selectCurrentTheme);
  const loggedIn = useSelector(selectIsLoggedIn);
  const userDetails = useSelector(selectUserDetails);

  const dispatch = useDispatch();
  const [showDrop, setShowDrop] = useState(false);
  const isSmall = window.innerWidth <= 768;

  const handleSignIn = useCallback(() => {
    dispatch(setHideLogin(false));
    dispatch(setHideLocation(false));
    dispatch(setLogInModal(true));
  }, [dispatch]);

  return (
    <nav className="max-md:pr-1.5">
      <ul className="flex items-center justify-evenly gap-2 font-sans tracking-wide md:gap-12">
        <li>
          <button
            onBlur={() => setShowDrop(false)}
            onClick={() => setShowDrop(!showDrop)}
            className="group relative flex cursor-pointer items-center justify-center"
          >
            <p className="group flex items-center justify-between gap-3 hover:cursor-pointer">
              {(theme === 'light' || theme === "system_light") ? (
                <i className="fa-solid fa-sun transform text-lg transition-transform duration-150 ease-linear group-hover:text-[#ff5200] active:scale-95 lg:group-hover:translate-x-1" />
              ) : (theme === 'dark' || theme === "system_dark") ? (
                <i className="fa-solid fa-moon transform text-lg transition-transform duration-150 ease-linear group-hover:text-[#ff5200] active:scale-95 lg:group-hover:translate-x-1"></i>
              ) : (
                <i className="ri-computer-fill transform text-lg transition-transform duration-150 ease-linear group-hover:text-[#ff5200] active:scale-95 lg:group-hover:translate-x-1" />
              )}

              <span className={`hidden group-hover:text-[#ff5200] md:block`}>
                Theme
              </span>
            </p>

            <div
              className="absolute top-[35px] left-1/2 -translate-x-1/2 transform rounded bg-white p-1 drop-shadow-[0_0_5px_#6a7282] dark:bg-gray-800"
              style={{
                display: showDrop ? 'block' : 'none',
              }}
            >
              <div className="relative text-sm">
                <ul className="list-none">
                  <li
                    onClick={() => dispatch(setCurrentTheme('light'))}
                    className="hover:bg-primary flex items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1"
                    style={{
                      backgroundColor: theme === 'light' ? '#e5e7eb' : '',
                      color: theme === 'light' ? 'black' : '',
                    }}
                  >
                    <i className="fa-solid fa-sun"></i>
                    <span>Light</span>
                  </li>
                  <li
                    onClick={() => dispatch(setCurrentTheme('dark'))}
                    className="hover:bg-primary mt-0.5 flex items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1"
                    style={{
                      backgroundColor: theme === 'dark' ? '#e5e7eb' : '',
                      color: theme === 'dark' ? 'black' : '',
                    }}
                  >
                    <i className="ri-moon-fill"></i>
                    <span>Dark</span>
                  </li>
                  <li
                    onClick={() => dispatch(setCurrentTheme('system'))}
                    className="hover:bg-primary mt-0.5 flex items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1"
                    style={{
                      backgroundColor: theme === 'system' ? '#e5e7eb' : '',
                      color: theme === 'system' ? 'black' : '',
                    }}
                  >
                    {isSmall ? (
                      <i className="fa-solid fa-mobile" />
                    ) : (
                      <i className="ri-computer-fill"></i>
                    )}
                    <span>System</span>
                  </li>
                </ul>
                <div
                  id="triangle"
                  className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[12px] border-b-[12px] border-l-[12px] border-r-transparent border-b-white border-l-transparent dark:border-b-gray-800"
                ></div>
              </div>
            </div>
          </button>
        </li>
        {showAbout && (
          <NavItem to="about" icon={'fa-utensils text-lg'} text="About" />
        )}
        {showSearch && (
          <NavItem
            to={`search?lat=${lat}&lng=${lng}`}
            icon={'fa-magnifying-glass text-lg'}
            text="Search"
          />
        )}
        <NavItem to="help" icon={'fa-solid fa-handshake-angle'} text="Help" />

        {loggedIn ? (
          <NavItem
            to={isSmall ? '/mobileProfile' : '/profile'}
            icon={'fa-user text-lg'}
            text={userDetails?.userName?.split(' ')[0] || 'User'}
          />
        ) : (
          <button
            onClick={handleSignIn}
            className="group flex items-center justify-between gap-3 hover:cursor-pointer hover:text-[#ff5200]"
          >
            <i className="fas fa-sign-in transform text-lg transition-transform duration-150 ease-linear group-hover:translate-x-1 group-hover:text-[#ff5200]"></i>
            <span className="relative hidden group-hover:text-[#ff5200] md:block">
              Sign In
            </span>
          </button>
        )}

        {showCart && (
          <NavItem
            to="cart"
            icon={'fa-cart-shopping text-lg'}
            text="Cart"
            superScript={true}
          />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

