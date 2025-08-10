import {
  selectLocationModal,
  selectLogInModal,
  selectLocationInfoModal
} from "../../features/Login/loginSlice";
import { selectMenuModel } from "../../features/home/restaurantsSlice";
import { selectDpModel } from "../../features/home/homeSlice";
import { selectEditAddressModal } from "../../features/delivery/deliverySlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const HeaderWrapper = ({ children }) => {
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const menuModel = useSelector(selectMenuModel);
  const { OpenLocationInfoModal } = useSelector(selectLocationInfoModal);
  const pathname = useLocation().pathname;
  const editAddressModal = useSelector(selectEditAddressModal);
  
  const isLargeScreen = window.innerWidth >= 768;

  const html = document.documentElement;
  const scrollBarWidth = window.innerWidth - html.clientWidth;

  return (
    <div
      className={`flex justify-center w-full items-center not-dark:shadow-[0_0_20px_1px_rgb(0,0,0,0.3)] max-md:px-1.5 h-16 md:h-20 fixed z-30 dark:bg-gray-800 dark:text-white bg-white`}
      style={{ paddingRight: (isLocationOpen || isLoginOpen || menuModel || OpenLocationInfoModal || editAddressModal) ? (isLargeScreen ? scrollBarWidth : 0) : 0 }}
    >
      {children}
    </div>
  );
};

export default HeaderWrapper;
