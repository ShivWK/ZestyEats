import {
  selectMenuItems,
  toggleMenuModel,
  selectVegVariant,
  selectHideMenu,
  setHideMenu
} from "../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import textToZestyEats from "../../utils/textToZestyEats";
import { useRef } from "react";

const Menu = () => {
  const menuItems = useSelector(selectMenuItems);
  const dispatch = useDispatch();
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);
  const isMenuModelOpen = useSelector(selectHideMenu);

  const clickHandler = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const handleAnimationEnd = (e) => {
    const ele = e.target.classList;

    if (ele.contains("hide-menu")) {
      dispatch(toggleMenuModel());
      dispatch(setHideMenu(false));
    }
  }

  return (
    <div
      onClick={() => {
        dispatch(setHideMenu(true))
      }}
      className="fixed inset-0 bg-black/30 top-0 left-0 w-[100%] h-[100%] z-40"
    >
      <div onAnimationEnd={handleAnimationEnd} className={`menu-wrapper fixed ${!isMenuModelOpen ? "show-menu" : "hide-menu"} left-1/2 transform -translate-x-1/2 z-50 max-md:min-w-[75%] max-md:max-w-[80%] min-w-[28%] max-w-[40%] bg-primary dark:bg-black rounded-xl py-2 pt-0.5 overflow-hidden max-lg:flex flex-col`}>
      <button className="self-end text-white/80 mr-2 lg:hidden">
        <i className="ri-close-circle-fill text-2xl"></i>
      </button>

        <div className="pretty-scrollbar text-gray-300 max-h-80 overflow-auto px-3">
          {menuItems.length > 0 ? (
            menuItems.map((item) => {
              if (!vegOption && item.veg) return;
              if (!nonVegOption && item.nonVeg) return;

              const path = item.title?.replace(/\s/g, "-");
              const key = path + Math.random();

              return (
                <button
                  key={key}
                  onClick={(e) => {
                    clickHandler(path);
                    dispatch(setHideMenu(true));
                    e.stopPropagation();
                  }}
                  className="block py-1.5 lg:py-2 w-full font-bold text-white hover:bg-gray-400 active:bg-gray-400 px-2 lg:px-4 rounded-lg"
                >
                  <p className="leading-5">{textToZestyEats(item.title)}</p>
                </button>
              );
            })
          ) : (
            <p className="text-center my-1 font-bold text-white">
              Looks like the chef is still cooking up the menu
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;


// in mobile screen make sure when menu model is open the it can be closed by back button click , current when back button is clicked the complete page get backed.