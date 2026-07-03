// Done

import {
  selectLocationModal,
  selectLogInModal,
  selectLocationInfoModal,
  selectDeleteModal,
  selectEditModal,
} from '../../features/Login/loginSlice';
import { selectMenuModel } from '../../features/home/restaurantsSlice';
import { selectEditAddressModal } from '../../features/delivery/deliverySlice';
import { useSelector } from 'react-redux';

const HeaderWrapper = ({ children }) => {
  // console.log("HeaderWrapper rendered")
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const menuModel = useSelector(selectMenuModel);
  const { OpenLocationInfoModal } = useSelector(selectLocationInfoModal);
  const editAddressModal = useSelector(selectEditAddressModal);
  const { deleteModal } = useSelector(selectDeleteModal);
  const { openEditModal } = useSelector(selectEditModal);

  const isLargeScreen = window.innerWidth >= 768;

  const html = document.documentElement;
  const scrollBarWidth = window.innerWidth - html.clientWidth;

  return (
    <div
      className={`fixed z-30 flex h-16 w-full items-center justify-center bg-white not-dark:shadow-[0_0_20px_1px_rgb(0,0,0,0.3)] max-md:px-1.5 md:h-20 dark:bg-gray-800 dark:text-white`}
      style={{
        paddingRight:
          isLocationOpen ||
          isLoginOpen ||
          menuModel ||
          OpenLocationInfoModal ||
          editAddressModal ||
          deleteModal ||
          openEditModal
            ? isLargeScreen
              ? scrollBarWidth
              : 0
            : 0,
      }}
    >
      {children}
    </div>
  );
};

export default HeaderWrapper;
