import {
  selectMenuItems,
  toggleMenuModel,
  selectVegVariant,
  selectHideMenu,
  setHideMenu,
} from '../../features/home/restaurantsSlice';
import { useSelector, useDispatch } from 'react-redux';
import textToZestyEats from '../../utils/textToZestyEats';
import { useRef } from 'react';

const Menu = () => {
  const menuItems = useSelector(selectMenuItems);
  const dispatch = useDispatch();
  const { vegOption, nonVegOption } = useSelector(selectVegVariant);
  const isMenuModelOpen = useSelector(selectHideMenu);

  const clickHandler = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnimationEnd = (e) => {
    const ele = e.target.classList;

    if (ele.contains('hide-menu')) {
      dispatch(toggleMenuModel());
      dispatch(setHideMenu(false));
    }
  };

  return (
    <div
      onClick={() => {
        dispatch(setHideMenu(true));
      }}
      className="fixed inset-0 top-0 left-0 z-40 h-[100%] w-[100%] bg-black/30 dark:bg-black/40"
    >
      <div
        onAnimationEnd={handleAnimationEnd}
        className={`menu-wrapper fixed ${!isMenuModelOpen ? 'show-menu' : 'hide-menu'} bg-primary left-1/2 z-50 max-w-[40%] min-w-[28%] -translate-x-1/2 transform flex-col overflow-hidden rounded-xl py-1 pt-0.5 max-lg:flex max-md:max-w-[80%] max-md:min-w-[75%] dark:bg-red-800/99`}
      >
        <div className="pretty-scrollbar max-h-80 overflow-auto px-3 py-1 text-gray-300">
          {menuItems.length > 0 ? (
            menuItems.map((item) => {
              if (!vegOption && item.veg) return;
              if (!nonVegOption && item.nonVeg) return;

              const path = item.title?.replace(/\s/g, '-');
              const key = path + Math.random();

              return (
                <button
                  key={key}
                  onClick={(e) => {
                    clickHandler(path);
                    dispatch(setHideMenu(true));
                    e.stopPropagation();
                  }}
                  className="block w-full rounded-lg px-2 py-1.5 font-bold text-white hover:bg-gray-400 active:bg-gray-400 lg:px-4 lg:py-2"
                >
                  <p className="leading-5">{textToZestyEats(item.title)}</p>
                </button>
              );
            })
          ) : (
            <p className="my-1 text-center font-bold text-white">
              Looks like the chef is still cooking up the menu
            </p>
          )}
        </div>

        <button className="mt-1 transform self-center rounded bg-black px-3 py-0.5 font-semibold text-gray-200 transition-all duration-100 ease-linear active:scale-95 lg:hidden">
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default Menu;

// in mobile screen make sure when menu model is open the it can be closed by back button click , current when back button is clicked the complete page get backed.
