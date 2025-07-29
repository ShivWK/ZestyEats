import { useDispatch, useSelector } from "react-redux";
import { isValidElement, cloneElement, useRef } from "react";
import { Link } from "react-router";

import {
  setHideLogin,
  selectLoginOtp,
  selectSignUpOtp,
  setLoading,
  setModalTrace,
  setLoginOpened,
  signUpOtpSend,
  loginOtpSend,
  selectOtpOnPhone
} from "../../features/Login/loginSlice";
import ReCAPTCHA from "react-google-recaptcha";

import { memo } from "react";

const ModalSubContainer = memo(({ children, member, handleSwitch }) => {
  const dispatch = useDispatch();
  const isLoginOtpSend = useSelector(selectLoginOtp);
  const isSigUpOtpSend = useSelector(selectSignUpOtp);
  const otpOnPhone = useSelector(selectOtpOnPhone);
  const recaptchaReference = useRef(null);
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleClose = () => {
    if (isLoginOtpSend) dispatch(loginOtpSend(false));
    else dispatch(signUpOtpSend(false));

    dispatch(setModalTrace({ mode: "empty" }));
    dispatch(setLoginOpened(false));
    dispatch(setHideLogin(true));

    window.history.back();
  };

  const handleBack = () => {
    if (isLoginOtpSend) {
      dispatch(loginOtpSend(false));
      dispatch(setLoading(false));
    } else {
      dispatch(signUpOtpSend(false));
      dispatch(setLoading(false));
    }
  };

  async function fetchIdToken() {
    const code = "4%2F0AVMBsJg9eXC5fqulggtQl0MAzQa4AsuJxOG_80D2WrHaOQ3elTGznG1vzlIDv8aCY80PSA";
    const clientId = "85933172238-ah6d3fr9r43oh77h3b9bkfmmhau05b2l.apps.googleusercontent.com";
    const clientSecret = "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";
    const redirect_uri = "http://localhost:5173"

    const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirect_uri}&grant_type=authorization_code`

    const resp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: payload
    })
    const data = await resp.json();
    const userDataString = data["id_token"].split(".")[1];
    const userData = JSON.parse(atob(userDataString));

    console.log(data)
    console.log(userData);
  }

  return (
    <div className="w-[90%] md:w-[80%] h-auto mt-7">
      <button
        className="group cursor-pointer mb-5 lg:mb-1"
        onClick={isLoginOtpSend || isSigUpOtpSend ? handleBack : handleClose}
      >
        {isLoginOtpSend || isSigUpOtpSend ? (
          <i className="ri-arrow-left-line text-xl dark:group-hover:bg-white/40 p-1 -ml-1 group-hover:bg-black/30 rounded-[50%] transition-all duration-150 ease-in-out dark:text-white group-hover:text-white" />
        ) : (
          <i className="ri-close-large-fill text-xl dark:group-hover:bg-white/40 p-1 -ml-1 group-hover:bg-black/30 rounded-[50%] transition-all duration-150 ease-in-out dark:text-white group-hover:text-white" />
        )}
      </button>
      <div className="flex items-center justify-between text-gray-300">
        <div>
          <h2 className="dark:text-white text-black">
            {member ? (isLoginOtpSend ? "Enter OTP" : "Login") : "Sign up"}
          </h2>
          {member ? (
            isLoginOtpSend ? (
              <p className="font-semibold">
                {`We've sent an OTP to your ${otpOnPhone ? "phone number" : "email"}`}
              </p>
            ) : (
              <p className="font-semibold text-black dark:text-gray-300">
                or{" "}
                <button
                  className="text-primary cursor-pointer tracking-wide"
                  onClick={handleSwitch}
                >
                  create an account
                </button>
              </p>
            )
          ) : (
            isSigUpOtpSend ? (
              <p className="font-semibold">
                {`We've sent an OTP to your ${otpOnPhone ? "phone number" : "email"}`}
              </p>
            )
              : (
                <p className="font-semibold dark:text-gray-300 text-black">
                  or{" "}
                  <button
                    className="text-primary cursor-pointer tracking-wide"
                    onClick={handleSwitch}
                  >
                    login to your account
                  </button>
                </p>
              )
          )}
          {member ? (
            isLoginOtpSend ? (
              ""
            ) : (
              <hr className="w-8 border-t-2 font-bold mt-6 mb-7 md:hidden dark:text-gray-300" />
            )
          ) : (
            <hr className="w-8 border-t-2 font-bold mt-6 mb-7 md:hidden dark:text-gray-300" />
          )}
        </div>
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
          height="90px"
          width="90px"
          alt="Profile_dummy_image"
          className="h-20 w-20 md:h-[90px] md:w-[90px] select-none max-md:-mt-10"
        />
      </div >

      {/* {children} */}

      {isValidElement(children) ? cloneElement(children, { recaptchaRef: recaptchaReference }) : children}


      {
        !(isLoginOtpSend || isSigUpOtpSend) && (
          <>
            <p className="text-xs font-semibold tracking-wide text-gray-500 text-center mt-2 lg:mt-1 dark:text-gray-200">------- or -------</p>
            <Link
              to={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=85933172238-ah6d3fr9r43oh77h3b9bkfmmhau05b2l.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http://localhost:5173`}

              className="absolute mt-7 lg:mt-6 left-[50%] transform -translate-1/2 text-center font-semibold text-blue-500 cursor-pointer border-2 rounded-md px-3.5 py-1 active:scale-95 transition-all duration-150 ease-in-out bg-white dark:bg-black">
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
            </Link>
          </>
          // <OAuth />
        )
      }
      <ReCAPTCHA
        sitekey={siteKey}
        size="invisible"
        ref={recaptchaReference}
        badge="bottomright"
        onError={(err) => console.error("error occurred", err)}
        onExpired={() => recaptchaReference.current.reset()}
      />
    </div >
  );
});

export default ModalSubContainer;
