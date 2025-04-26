import { NavLink } from "react-router-dom";

const Form = ({
  children,
  guestLogin,
  handleClick,
  handleGuestLogin = null,
  buttonText,
  signingStatement,
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
      {guestLogin && (
        <button
          type="button"
          onClick={handleGuestLogin}
          className="font-bold text-[#6e6e6e] w-full h-11 mt-2 rounded-lg cursor-pointer hover:text-primary"
        >
          Login as Guest
        </button>
      )}
      <p className="text-xs font-semibold text-gray-800 mt-1 text-center">
        {`${signingStatement}, I accept the`}
        <NavLink className="font-bold text-black">
          {" "}
          Terms & Conditions & Privacy Policy
        </NavLink>
      </p>
    </form>
  );
};

export default Form;
