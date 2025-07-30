import { Link } from "react-router-dom";
import {
  selectLogInModal,
  selectIsMember,
  setHideLogin,
} from "../../features/Login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { motion } from "motion/react";
import ReCAPTCHA from "react-google-recaptcha";

const Form = ({
  btnId,
  children,
  reference,
  handleSubmit,
  handleOtpVerification,
  signingStatement,
  isOtpSend = false,
  isLoading,
  errorMessage
}) => {
  const isLogInModelOpen = useSelector(selectLogInModal);
  const member = useSelector(selectIsMember);
  const dispatch = useDispatch();

  const handlePageSwitch = () => {
    dispatch(setHideLogin(true));
  }

  return (
    <form
      ref={reference}
      className="mt-5 notFirst-notLast"
      autoComplete="off"
    >
      {children}

      {isOtpSend ? (
        <motion.button
          type="button"
          disabled={isLoading}
          onClick={handleOtpVerification}
          className="flex justify-center items-center
           bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg"
          style={{ cursor: isLoading ? "auto" : "pointer" }}
          whileTap={{ scale: isLoading ? 0 : 0.95 }}
        >
          {isLoading ? <Loader size="small" /> : "VERIFY OTP"}
        </motion.button>
      ) : (
        <motion.button
          id={btnId}
          disabled={isLoading}
          type="button"
          onClick={handleSubmit}
          className="flex justify-center items-center bg-primary dark:bg-darkPrimary font-bold text-white w-full h-11 mt-5 rounded-lg"
          style={{ cursor: isLoading ? "auto" : "pointer" }}
          whileTap={{ scale: isLoading ? 0 : 0.95 }}
        >
          {isLoading ? (
            <Loader size="small" />
          ) : member ? (
            "LOGIN"
          ) : (
            "CONTINUE"
          )}
        </motion.button>
      )}
      {!isOtpSend && (
        <p className="text-center text-xs mt-2 font-bold text-gray-600 dark:text-gray-200">
          {signingStatement} , I accept the{" "}
          <Link
            to="/legalAndPolicies?mode=termsAndConditions"
            onClick={handlePageSwitch}
            className="text-blue-600 dark:text-blue-400">
            Terms & Conditions
          </Link>
          {" "}
          &
          {" "}
          <Link
            to="/legalAndPolicies?mode=privacyPolicy"
            onClick={handlePageSwitch} 
            className="text-blue-600 dark:text-blue-400">
            Privacy Policy
          </Link>
        </p>
      )}

      {(errorMessage && isOtpSend ) && <p className="text-center text-red-600 text-sm tracking-wide font-medium mt-8 break-words">
        {errorMessage}
      </p>}

    </form>
  );
};

export default Form;
