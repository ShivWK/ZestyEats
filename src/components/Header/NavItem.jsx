import { memo } from "react";
import { NavLink } from "react-router-dom";

const NavItem = memo(
  ({ icon, text, onClick = null, superScript = null, to = null }) => {
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
          <i className={`fa-solid ${icon} group-hover:text-[#ff5200] ${(text !== "Help" || text !== "About" || text !== "Cart") && "max-md:text-xl"}`}></i>
          <span className="relative group-hover:text-[#ff5200] hidden md:block">
            {text}
            {superScript ? (
              <sup className="text-primary text-[10px] ml-0.5 absolute top-1 font-extrabold">
                {superScript}
              </sup>
            ) : null}
          </span>
        </NavLink>
      </li>
    );
  }
);

export default NavItem;

// If take any element out of the noemal flow of the document, then parents inherited props wont work on it nly its own props will worf.
