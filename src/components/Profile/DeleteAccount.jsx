import { useState } from 'react';
import MobileFooterMenu from '../Footer/MobileFooterMenu';
import DotBounceLoader from '../../utils/DotBounceLoader';
import {
  setDeleteModalOpen,
  setHideDeleteModal,
} from '../../features/Login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { selectDeviceFingerPrint } from '../../features/home/homeSlice';

const DeleteAccount = () => {
  const [OTPLoading, setOTPLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deviceId = useSelector(selectDeviceFingerPrint);

  const sendOtpHandler = async () => {
    if (OTPLoading) return;
    setOTPLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/userActivity/deleteAccount/sendOTP`,
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
      setOTPLoading(false);
      dispatch(setDeleteModalOpen(true));
    } catch (err) {
      console.log('Error in sending OTP', err);
      toast.error(err.message);

      setOTPLoading(false);
    }
  };

  return (
    <main className="lg:pt24 pt-16">
      <section className="bg-primary profile-animation relative h-28 overflow-hidden rounded-b-3xl px-3 pt-5 pb-2 dark:bg-gray-800">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-long-line text-2xl font-medium text-white"
        />
        <h1 className="mt-2 text-2xl text-white text-shadow-2xs dark:text-gray-100">
          Delete Your Account
        </h1>
      </section>

      <section className="mt-4 px-2">
        <p className="dark:text-gray-300">
          We're sorry to see you go. Before we proceed, please review the
          details below.
        </p>
        <div className="mx-auto my-3 w-[90%] rounded-md bg-red-300 p-2 text-justify leading-5 dark:bg-[rgb(87,16,16)] dark:text-gray-100">
          <p className="mb-2">
            Deleting your account will permanently remove all your order
            history, saved addresses, and preferences.
          </p>
          <p>You will not be able to recover your account once deleted.</p>
        </div>

        <p className="mt-1 text-center dark:text-gray-300">
          We will send a{' '}
          <span className="font font-semibold text-black dark:text-gray-100">
            one-time password (OTP)
          </span>{' '}
          to your registered email address.
        </p>
        <p className="mt-1 text-center dark:text-gray-300">
          <span className="font-semibold text-black dark:text-gray-100">
            Please make sure you have access to your registered email before
            proceeding.
          </span>
          You will need to enter this OTP to confirm deletion.
        </p>

        <button
          onClick={sendOtpHandler}
          className="bg-primary dark:bg-darkPrimary mx-auto mt-5 flex h-8 w-28 transform items-center justify-center rounded-md font-bold tracking-wider text-white transition-all duration-100 ease-linear active:scale-95"
        >
          {OTPLoading ? <DotBounceLoader /> : 'Send OTP'}
        </button>
      </section>

      <MobileFooterMenu />
    </main>
  );
};

export default DeleteAccount;
