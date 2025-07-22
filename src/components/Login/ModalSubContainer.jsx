import { useDispatch, useSelector } from "react-redux";
import {
  setHideLogin,
  loginOtpNotSend,
  signUpOtpNotSend,
  selectLoginOtp,
  selectSignUpOtp,
  setLoading,
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
    window.history.back();
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
                {/* because JSX removes the white space between p and button so we have manually added it. */}
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
      <button className="absolute mt-10 left-[50%] transform -translate-1/2 text-center text-lg font-semibold text-blue-500 cursor-pointer border-2 rounded-md px-3.5 py-1.5 active:scale-95 transition-all duration-150 ease-in-out">
        <p className="whitespace-nowrap flex gap-2 items-center">
          Continue with{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
        </p>
      </button>
    </div>
  );
});

export default ModalSubContainer;
