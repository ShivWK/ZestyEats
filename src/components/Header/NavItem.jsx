// Done

import { NavLink } from 'react-router-dom';
import { Asterisk } from 'lucide-react';
import { selectCart } from '../../features/home/restaurantsSlice';
import { useSelector } from 'react-redux';

const NavItem = ({
  icon,
  text,
  onClick = null,
  superScript = null,
  to = null,
}) => {
  const cart = useSelector(selectCart);
  const cartCount = Object.values(cart).length;
  // console.log("NavItem rendered")
  return (
    <li>
      <NavLink
        to={to}
        className={`group flex items-center gap-3 hover:cursor-pointer active:scale-95 dark:text-gray-100 ${(text === 'Help' || text === 'About' || text === 'Cart') && 'max-md:hidden'}`}
        style={({ isActive }) => {
          if (isActive) return { color: '#ff5200' };
        }}
        onClick={onClick}
      >
        <i
          className={`fa-solid ${icon} transform group-hover:text-[#ff5200] ${(!cartCount || !superScript) && 'lg:group-hover:translate-x-1'} transition-transform duration-150 ease-linear ${(text !== 'Help' || text !== 'About' || text !== 'Cart') && 'max-md:text-xl'} ${cartCount && superScript && 'cart-animation'}`}
        >
          {superScript && cartCount ? (
            <sup className="absolute -mt-1.5 -ml-0.5 text-[10px] font-extrabold text-red-600">
              <Asterisk size={16} />
            </sup>
          ) : null}
        </i>
        <span className="relative hidden max-w-24 truncate group-hover:text-[#ff5200] md:block">
          {text}
        </span>
      </NavLink>
    </li>
  );
};

export default NavItem;
