import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Asterisk } from "lucide-react";
import { selectCart } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const NavItem = memo(
  ({ icon, text, onClick = null, superScript = null, to = null }) => {
    const cart = useSelector(selectCart);
    const cartCount = Object.values(cart).length;

    return (
      <li>
        <NavLink
          to={to}
          className={`group flex items-center justify-between gap-3 hover:cursor-pointer active:scale-95 ${(text === "Help" || text === "About" || text === "Cart") && "max-md:hidden"}`}
          style={({ isActive }) => {
            if (isActive) return { color: "#ff5200" };
          }}
          onClick={onClick}
        >
          <i className={`fa-solid ${icon} group-hover:text-[#ff5200] transform ${(!cartCount || !superScript) && "group-hover:translate-x-1"} transition-transform duration-150 ease-linear ${(text !== "Help" || text !== "About" || text !== "Cart") && "max-md:text-xl"} ${(cartCount && superScript) && "cart-animation"}`}>
            {(superScript && cartCount) ? (
              <sup className="text-red-600 text-[10px] -mt-1.5 -ml-0.5 absolute font-extrabold">
                <Asterisk size={16} />
              </sup>
            ) : null}
          </i>
          <span className="relative group-hover:text-[#ff5200] hidden md:block">
            {text}
          </span>
        </NavLink>
      </li>
    );
  }
);

export default NavItem;

// If take any element out of the noemal flow of the document, then parents inherited props wont work on it nly its own props will worf.
