import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  selectlogInModal,
  selectIsMember,
} from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { motion } from "motion/react";

const Form = ({
  btnId,
  children,
  refference,
  guestLogin = false,
  handleSubmit,
  handleGuestLogin = null,
  handleOtpVerification,
  signingStatement,
  isOtpSend = false,
  isLoading,
}) => {
  const isLogInModelOpen = useSelector(selectlogInModal);
  const member = useSelector(selectIsMember);

  return (
    <form
      ref={refference}
      className="mt-10 notFirst-notLast"
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
      {guestLogin && !isOtpSend && (
        <motion.button
          type="button"
          onClick={handleGuestLogin}
          className="font-bold text-[#6e6e6e] w-full h-11 mt-2 rounded-lg cursor-pointer hover:text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login as Guest
        </motion.button>
      )}
      {!isOtpSend && (
        <p className="text-center text-xs mt-2 font-bold text-gray-600">
          {signingStatement} , I accept the{" "}
          <NavLink to="/terms" className="text-black">
            Terms & Conditions & Privacy Policy
          </NavLink>
        </p>
      )}
    </form>
  );
};

export default Form;
