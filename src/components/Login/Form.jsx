import { Link } from 'react-router-dom';
import {
  selectIsMember,
  setHideLogin,
  selectErrorMessage,
} from '../../features/Login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { motion } from 'motion/react';

const Form = ({
  btnId,
  children,
  reference,
  handleSubmit,
  handleOtpVerification,
  signingStatement,
  isOtpSend = false,
  isLoading,
}) => {
  const member = useSelector(selectIsMember);
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  const handlePageSwitch = () => {
    dispatch(setHideLogin(true));
  };

  return (
    <form ref={reference} className="notFirst-notLast mt-5" autoComplete="off">
      {children}

      {isOtpSend ? (
        <motion.button
          type="button"
          disabled={isLoading}
          onClick={handleOtpVerification}
          className="bg-primary mt-5 flex h-11 w-full items-center justify-center rounded-lg font-bold text-white"
          style={{ cursor: isLoading ? 'auto' : 'pointer' }}
          whileTap={{ scale: isLoading ? 0 : 0.95 }}
        >
          {isLoading ? <Loader size="small" /> : 'VERIFY OTP'}
        </motion.button>
      ) : (
        <motion.button
          id={btnId}
          disabled={isLoading}
          type="button"
          onClick={handleSubmit}
          className="bg-primary dark:bg-darkPrimary mt-5 flex h-11 w-full items-center justify-center rounded-lg font-bold text-white"
          style={{ cursor: isLoading ? 'auto' : 'pointer' }}
          whileTap={{ scale: isLoading ? 0 : 0.95 }}
        >
          {isLoading ? <Loader size="small" /> : member ? 'LOGIN' : 'CONTINUE'}
        </motion.button>
      )}
      {!isOtpSend && (
        <p className="mt-2 text-center text-xs font-bold text-gray-600 dark:text-gray-200">
          {signingStatement} , I accept the{' '}
          <Link
            to="/legalAndPolicies?mode=termsAndConditions"
            onClick={handlePageSwitch}
            className="text-blue-600 dark:text-blue-400"
          >
            Terms & Conditions
          </Link>{' '}
          &{' '}
          <Link
            to="/legalAndPolicies?mode=privacyPolicy"
            onClick={handlePageSwitch}
            className="text-blue-600 dark:text-blue-400"
          >
            Privacy Policy
          </Link>
        </p>
      )}

      {errorMessage && isOtpSend && (
        <p className="mt-8 text-center text-sm font-medium tracking-wide break-words text-gray-800 dark:text-gray-200">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default Form;
