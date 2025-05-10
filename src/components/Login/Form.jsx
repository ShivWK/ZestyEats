import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { selectlogInModal } from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";
import Loader from "../Loader";

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

  return (
    <form
      ref={refference}
      className="mt-10 li-notfirst-andlast"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {children}

      {isOtpSend ? (
        <button
          type="button"
          disabled={isLoading ? true : false}
          onClick={handleOtpVerification}
          className="flex justify-center items-center
           bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg"
          style={{ cursor: isLoading ? "auto" : "pointer" }}
        >
          {isLoading ? <Loader size="small" /> : "VERIFY OTP"}
        </button>
      ) : (
        <button
          id={btnId}
          disabled={isLoading ? true : false}
          type="submit"
          className="flex justify-center items-center
           bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg cursor-"
          style={{ cursor: isLoading ? "auto" : "pointer",
           }}
        >
          {isLoading ? (
            <Loader size="small" />
          ) : isLogInModelOpen ? (
            "LOGIN"
          ) : (
            "CONTINUE"
          )}
        </button>
      )}
      {guestLogin && !isOtpSend && (
        <button
          type="button"
          onClick={handleGuestLogin}
          className="font-bold text-[#6e6e6e] w-full h-11 mt-2 rounded-lg cursor-pointer hover:text-primary"
        >
          Login as Guest
        </button>
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
