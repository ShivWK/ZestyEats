import {
  selectMenuItems,
  toggleMenuModel,
  selectVegVariant
} from "../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";

const Menu = () => {
  const menuItems = useSelector(selectMenuItems);
  const dispatch = useDispatch();
  const { vegOption, nonVegOption } = useSelector(selectVegVariant)

  const clickHandler = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      onClick={() => dispatch(toggleMenuModel())}
      className="fixed inset-0 bg-black/30 top-0 left-0 w-[100%] h-[100%] z-40"
    >
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-primary pretty-scrollbar text-gray-300 max-h-80 overflow-auto min-w-[28%] max-w-[40%] dark:bg-black px-3 py-2 rounded-xl opacity-100 z-50 max-md:min-w-[70%] max-md:max-w-[80%]">
        {menuItems.length > 0 ? (
          menuItems.map((item) => {
            
            if (vegOption) {
              if (item.nonVeg) return;
            } else if (nonVegOption) {
              if (item.veg) return;
            }

            const path = item.title?.replace(/\s/g, "-");
            const key = path + Math.random();

            return (
              <button
                key={key}
                onClick={() => clickHandler(path)}
                className="block py-2 w-full font-bold text-white hover:bg-gray-400 active:bg-gray-400 px-4 rounded-lg"
              >
                <p>{item.title}</p>
              </button>
            );
          })
        ) : <p className="text-center my-1 font-bold text-white">Looks like the chef is still cooking up the menu</p>
        }
      </div>
    </div>
  );
};

export default Menu;
