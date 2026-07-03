// Done

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowBottomMenu,
  selectBottomMenu,
} from '../../features/home/homeSlice';
import { NavLink } from 'react-router-dom';
import { selectCart } from '../../features/home/restaurantsSlice';

const MobileFooterMenu = () => {
  // console.log("MobileFooterMenu rendered")
  const [showOnMobile, setShowOnMobile] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const lastScrollTop = useRef(window.scrollY);
  const show = useSelector(selectBottomMenu);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop.current + 10) {
        dispatch(setShowBottomMenu(false));
      } else if (currentScrollTop < lastScrollTop.current - 10) {
        dispatch(setShowBottomMenu(true));
      }

      lastScrollTop.current = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowOnMobile(true);
      } else {
        setShowOnMobile(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    const values = Object.values(cart);
    let count = 0;

    values.forEach((value) => {
      count += value.quantity;
    });

    setCartItemsCount(count);
  }, [cart]);

  return (
    showOnMobile && (
      <div
        className="position fixed right-0 bottom-0 left-0 z-30 flex h-14 w-full transform items-center justify-around bg-white text-2xl text-black shadow-[0_0_20px_1px_rgba(0,0,0,0.3)] transition-transform duration-200 ease-linear dark:bg-gray-800 dark:text-white"
        style={{ transform: show ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <NavLink
          to={'/support?mode=help'}
          style={({ isActive }) => {
            if (isActive) return { color: '#ff5200' };
          }}
        >
          <i className="fa-solid fa-handshake-angle"></i>
        </NavLink>
        <NavLink
          to={'/mbAbout?mode=about'}
          style={({ isActive }) => {
            if (isActive) return { color: '#ff5200' };
          }}
        >
          <i className="ri-information-line"></i>
        </NavLink>

        <NavLink
          to={'/'}
          style={({ isActive }) => {
            if (isActive) return { color: '#ff5200' };
          }}
        >
          <i className="ri-home-8-fill text-3xl"></i>
        </NavLink>
        <NavLink
          to={'/ordersAndWishlist'}
          style={({ isActive }) => {
            if (isActive) return { color: '#ff5200' };
          }}
        >
          <i className="ri-handbag-line"></i>
        </NavLink>

        <NavLink
          to={'/cart'}
          style={({ isActive }) => {
            if (isActive) return { color: '#ff5200' };
          }}
        >
          <i
            className={`fa-solid fa-cart-shopping ${cartItemsCount && 'cart-animation'}`}
          >
            <sub className="text-[10px] text-red-600 dark:text-red-400">
              {cartItemsCount !== 0 && cartItemsCount}
            </sub>
          </i>
        </NavLink>
      </div>
    )
  );
};

export default MobileFooterMenu;
