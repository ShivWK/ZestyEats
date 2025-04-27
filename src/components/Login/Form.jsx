import { NavLink } from "react-router-dom";

const Form = ({
  children,
  guestLogin,
  handleClick,
  handleGuestLogin = null,
  buttonText,
  signingStatement,
  isOtpSend = false,
}) => {
  return (
    <form className="mt-10">
      {children}
      <button
        onClick={handleClick}
        className="bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg cursor-pointer"
      >
        {buttonText}
      </button>
      {guestLogin && !isOtpSend && (
        <button
          type="button"
          onClick={handleGuestLogin}
          className="font-bold text-[#6e6e6e] w-full h-11 mt-2 rounded-lg cursor-pointer hover:text-primary"
        >
          Login as Guest
        </button>
      )}
      { !isOtpSend && (
        <p className="text-center text-xs mt-2 font-bold text-gray-600">
          {signingStatement} , I accept the{" "}   
          <NavLink to="/terms" className="text-black">
          Terms & Conditions & Privacy Policy
          </NavLink>
        </p>
        )
      }
    </form>
  );
};

export default Form;
