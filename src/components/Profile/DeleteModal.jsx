import { selectUserDetails } from '../../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDeleteModal,
  setDeleteModalOpen,
  setHideDeleteModal,
} from '../../features/Login/loginSlice';
import { setIsLoggedIn } from '../../features/Login/loginSlice';
import { setIsLoggedInHome } from '../../features/home/homeSlice';

import {
  setIsLoggedInRestro,
  setItemToCart,
  toggleItemsToBeAddedInCart,
  setFavoriteRestaurant,
  addToWishlistItem,
} from '../../features/home/restaurantsSlice';

import { addRecentLocations } from '../../features/home/homeSlice';
import { selectDeviceFingerPrint } from '../../features/home/homeSlice';
import { useState } from 'react';
import DotBounceLoader from '../../utils/DotBounceLoader';
import OtpEntry from './OtpEntry';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import cleanOnLogout from '../../utils/logoutCleaner';
import OtpCounter from './OtpCounter';

const DeleteModal = () => {
  const deviceId = useSelector(selectDeviceFingerPrint);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [disableVerify, setDisableVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [stepCount, setStepCount] = useState(1);
  const navigate = useNavigate();

  const { hideDeleteModal } = useSelector(selectDeleteModal);
  const dispatch = useDispatch();

  const { userEmail } = useSelector(selectUserDetails);
  const email = `${userEmail.slice(0, 2)}●●●●●●${userEmail.slice(10)}`;

  const animationEndHandler = (e) => {
    const classList = e.target.classList;

    if (classList.contains('animate-hideDeleteModal')) {
      dispatch(setDeleteModalOpen(false));
      dispatch(setHideDeleteModal(false));
    }
  };

  const verifyClickHandler = async (e) => {
    if (verifyLoading) return;
    if (disableVerify) return;

    if (otp.length !== 6) {
      toast.info('Please enter six digit OTP');
      return;
    }

    e.stopPropagation();

    setVerifyLoading(true);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/userActivity/deleteOTP`,
        {
          method: 'POST',

          headers: {
            'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
            'Content-Type': 'application/json',
            'x-user-agent': navigator.userAgent,
            'x-language': navigator.language,
            'x-resolution': `${screen.height}x${screen.width}`,
            'x-device-id': deviceId,
          },

          body: JSON.stringify({
            otp,
            email: userEmail,
          }),

          credentials: 'include',
        },
      );

      const result = await resp.json();
      if (!resp.ok) throw new Error(result.message);

      setVerified(true);
      setStepCount(2);
      setDeleteAccount(true);
      setVerifyLoading(false);
    } catch (err) {
      console.log('Error in verifying OTP', err);
      toast.error(err.message);

      setVerifyLoading(false);
    }
  };

  // session is not getting deleted

  const deleteHandler = async (e) => {
    e.stopPropagation();
    setDeleteLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/userActivity/deleteAccount/deleteAccount`,
        {
          method: 'POST',
          headers: {
            'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
            'Content-Type': 'application/json',
            'x-user-agent': navigator.userAgent,
            'x-language': navigator.language,
            'x-resolution': `${screen.height}x${screen.width}`,
            'x-device-id': deviceId,
          },
          credentials: 'include',
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      console.log(data.message);
      setDeleteLoading(false);
      dispatch(setHideDeleteModal(true));
      navigate('/', { replace: true });
      dispatch(setIsLoggedIn(false));
      dispatch(setIsLoggedInHome(false));
      dispatch(setIsLoggedInRestro(false));
      localStorage.setItem('auth', 'false');
      cleanOnLogout({
        dispatch,
        setItemToCart,
        toggleItemsToBeAddedInCart,
        setFavoriteRestro: setFavoriteRestaurant,
        addRecentLocations,
        addToWishlistItem,
      });
    } catch (err) {
      console.log('Error in sending OTP', err);
      toast.error(err.message);

      setOTPLoading(false);
    }
  };

  return (
    <div
      onClick={() => {
        dispatch(setHideDeleteModal(true));
      }}
      className="absolute top-0 left-0 z-60 flex h-full w-full items-center justify-center bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={animationEndHandler}
        className={`bg-white p-3 dark:bg-gray-800 ${!hideDeleteModal ? 'animate-showDeleteModal' : 'animate-hideDeleteModal'} w-[80%] rounded-md lg:w-[25%]`}
      >
        <p className="mb-1 text-center text-sm font-bold tracking-wider text-gray-400">{`Step ${stepCount} of 2`}</p>

        <p className="text-center text-black dark:text-gray-200">{`OTP is sent to your email ${email}`}</p>

        <OtpEntry setOtp={setOtp} verify={verified} count={6} />

        {!verified && <OtpCounter disableVerify={setDisableVerify} />}

        <div>
          {deleteAccount && (
            <p className="text-center dark:text-gray-200">
              OTP verified ✅ Are you sure? This action cannot be undone.
            </p>
          )}
          <div className="mt-1.5 flex items-center justify-between">
            <button
              onClick={() => dispatch(setHideDeleteModal(true))}
              className="flex h-8 basis-[48%] cursor-pointer items-center justify-center rounded-md bg-green-500 font-bold tracking-wider text-white transition-all duration-100 ease-linear hover:bg-green-600 active:scale-95"
            >
              Cancel
            </button>

            {deleteAccount ? (
              <button
                onClick={deleteHandler}
                className="flex h-8 basis-[48%] cursor-pointer items-center justify-center rounded-md bg-red-500 font-bold tracking-wider text-white transition-all duration-100 ease-linear hover:bg-red-600"
              >
                {deleteLoading ? <DotBounceLoader /> : 'Delete'}
              </button>
            ) : (
              <button
                onClick={verifyClickHandler}
                className={`flex h-8 basis-[48%] items-center justify-center rounded-md font-bold tracking-wider ${disableVerify ? 'cursor-not-allowed border-2 border-gray-400 bg-gray-300 text-gray-400 dark:text-gray-800' : 'cursor-pointer bg-red-500 text-white hover:bg-red-600 active:scale-95'} transition-all duration-100 ease-linear`}
              >
                {verifyLoading ? <DotBounceLoader /> : 'Verify'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
