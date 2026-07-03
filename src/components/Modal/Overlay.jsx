// Done
import {
  selectLogInModal,
  setHideLocation,
  setHideLogin,
  setModalTrace,
  setLoginOpened,
} from '../../features/Login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

const Overlay = () => {
  // console.log("Overlay rendered");
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(selectLogInModal);
  const handleClick = () => {
    if (isLoginOpen) {
      dispatch(setModalTrace({ mode: 'empty' }));
      dispatch(setLoginOpened(false));
      dispatch(setHideLogin(true));
    } else {
      dispatch(setHideLocation(true));
    }

    window.history.back();
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 top-0 left-0 z-40 h-full w-full bg-black opacity-65"
    ></div>
  );
};

export default Overlay;
