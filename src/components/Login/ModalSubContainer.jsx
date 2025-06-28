import { useDispatch, useSelector } from "react-redux";
import {
  setHideLogin,
  loginOtpNotSend,
  signUpOtpNotSend,
  selectLoginOtp,
  selectSignUpOtp,
  setLoading
} from "../../features/Login/loginSlice";
import { memo } from "react";

const ModalSubContainer = memo(({ children, member, handleSwitch }) => {
  const dispatch = useDispatch();
  const isLoginOtpSend = useSelector(selectLoginOtp);
  const isSigUpOtpSend = useSelector(selectSignUpOtp);

  const handleClose = () => {
    if (isLoginOtpSend) dispatch(loginOtpNotSend());
    else dispatch(signUpOtpNotSend());

    dispatch(setHideLogin(true));
  };

  const handleBack = () => {
    if (isLoginOtpSend) {
      dispatch(loginOtpNotSend());
      dispatch(setLoading(false));
    } else {
      dispatch(signUpOtpNotSend());
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] h-auto mt-7">
      <button
        className="group cursor-pointer mb-4"
        onClick={isLoginOtpSend || isSigUpOtpSend ? handleBack : handleClose}
      >
        {isLoginOtpSend || isSigUpOtpSend ? (
          <i className="ri-arrow-left-line text-xl group-hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.08)] rounded-[50%] transition-all duration-150 ease-in-out"></i>
        ) : (
          <i className="ri-close-large-fill text-xl group-hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.08)] rounded-[50%] transition-all duration-150 ease-in-out"></i>
        )}
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h2>
            {member ? (isLoginOtpSend ? "Enter OTP" : "Login") : "Sign up"}
          </h2>
          {member ? (
            isLoginOtpSend ? (
              <p className="font-semibold">
                We've sent an OTP to your phone number
              </p>
            ) : (
              <p className="font-semibold">
                or{" "}
                {/* beause JSX removes the white space between p and button so we have manually added it. */}
                <button
                  className="text-primary cursor-pointer"
                  onClick={handleSwitch}
                >
                  create an account
                </button>
              </p>
            )
          ) : (
            <p className="font-semibold">
              or{" "}
              <button
                className="text-primary cursor-pointer"
                onClick={handleSwitch}
              >
                login to your account
              </button>
            </p>
          )}
          {member ? (
            isLoginOtpSend ? (
              ""
            ) : (
              <hr className="w-8 border-t-2 font-bold mt-6" />
            )
          ) : (
            <hr className="w-8 border-t-2 font-bold mt-6" />
          )}
        </div>
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
          height="110px"
          width="110px"
          alt="Profile_dummy_image"
          className="h-20 w-20 md:h-[110px] md:w-[110px]"
        />
      </div>
      {children}
      <button
        className="absolute mt-16 left-[50%] transform -translate-1/2 text-center text-lg font-semibold text-blue-500 cursor-pointer border-2 rounded-md px-3.5 py-1.5 active:scale-95 transition-all duration-150 ease-in-out"
      >
        <p className="whitespace-nowrap">Login/SignUp with Google</p>
      </button>
    </div>
  );
});

export default ModalSubContainer;
