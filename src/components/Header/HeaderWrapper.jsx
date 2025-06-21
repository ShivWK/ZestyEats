import {
  selectLocationModal,
  selectLogInModal,
} from "../../features/Login/loginSlice";
import { selectMenuModel } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const HeaderWrapper = ({ children }) => {
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const menuModel = useSelector(selectMenuModel);

  return (
    <div
      className="w-full shadow-[0_0_20px_1px_rgb(0,0,0,0.3)] h-20 fixed z-30 bg-white"
      style={{ paddingRight: isLocationOpen || isLoginOpen || menuModel ? 15 : 0 }}
    >
      {children}
    </div>
  );
};

export default HeaderWrapper;
