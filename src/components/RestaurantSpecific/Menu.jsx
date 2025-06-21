import {
  selectMenuItems,
  toggleMenuModel,
} from "../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const menuItems = useSelector(selectMenuItems);
  const dispatch = useDispatch();

  const clickHandler = (e, id) => {
    
    document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
    dispatch(toggleMenuModel());
    // e.stopPropagation();
  }

  return (
    <div
      onClick={() => dispatch(toggleMenuModel())}
      className="fixed inset-0 bg-black/30 top-0 left-0 w-[100%] h-[100%] z-20"
    >
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-primary hide-scrollbar pl-2 text-gray-300 max-h-80 overflow-auto dark:bg-gray-600 p-3 rounded-xl opacity-100">
        {menuItems.length > 0 &&
          menuItems.map((item) => {
            const path = item.replace(/\s/g, "-");
            const key = path + Math.random();
            return (
              <button
                key={key}
                onClick={() => clickHandler(e, path)}
                className="block py-2 font-bold text-white hover:bg-gray-400 pr-11 pl-2 rounded"
              >
                <p>{item}</p>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Menu;
