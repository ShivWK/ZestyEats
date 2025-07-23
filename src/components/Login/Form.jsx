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
  recaptchaReference
}) => {
  const isLogInModelOpen = useSelector(selectLogInModal);
  const member = useSelector(selectIsMember);
  const dispatch = useDispatch();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handlePageSwitch = () => {
    dispatch(setHideLogin(true));
  }

  return (
    <form
      ref={reference}
      className="mt-5 notFirst-notLast"
      // onSubmit={handleSubmit}
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
          className="flex justify-center items-center
           bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg cursor-"
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
        <p className="text-center text-xs mt-2 font-bold text-gray-600">
          {signingStatement} , I accept the{" "}
          <Link
            to="/legalAndPolicies?mode=termsAndConditions"
            onClick={handlePageSwitch}
            className="text-blue-600">
            Terms & Conditions
          </Link>
          {" "}
          &
          {" "}
          <Link
            to="/legalAndPolicies?mode=privacyPolicy"
            onClick={handlePageSwitch} 
            className="text-blue-600">
            Privacy Policy
          </Link>
        </p>
      )}
      <ReCAPTCHA
        sitekey={siteKey}
        size="invisible"
        ref={recaptchaReference}
        onErrorCapture={(err) => console.error(err)}
      />
    </form>
  );
};

export default Form;
