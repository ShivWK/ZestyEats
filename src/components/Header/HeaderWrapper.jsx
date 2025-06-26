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
  const isLargeScreen = window.innerWidth >= 768;

  return (
    <div
      className="flex justify-center w-full items-center shadow-[0_0_20px_1px_rgb(0,0,0,0.3)] max-md:px-1.5 h-16 md:h-20 fixed z-30 bg-white"
      style={{ paddingRight: (isLocationOpen || isLoginOpen || menuModel) ? (isLargeScreen ? 15 : 0) : 0 }}
    >
      {children}
    </div>
  );
};

export default HeaderWrapper;
