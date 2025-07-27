import { useDispatch, useSelector } from "react-redux";
import { isValidElement, cloneElement, useRef } from "react";
import OAuth from "./OAuth";

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
          <i className="ri-arrow-left-line text-xl group-hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.08)] rounded-[50%] transition-all duration-150 ease-in-out dark:text-white"></i>
        ) : (
          <i className="ri-close-large-fill text-xl group-hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.08)] rounded-[50%] transition-all duration-150 ease-in-out dark:text-white"></i>
        )}
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="dark:text-white">
            {member ? (isLoginOtpSend ? "Enter OTP" : "Login") : "Sign up"}
          </h2>
          {member ? (
            isLoginOtpSend ? (
              <p className="font-semibold">
                {`We've sent an OTP to your ${otpOnPhone ? "phone number" : "email"}`}
              </p>
            ) : (
              <p className="font-semibold dark:text-gray-300">
                or{" "}
                {/* because JSX removes the white space between p and button so we have manually added it. */}
                <button
                  className="text-primary cursor-pointer tracking-wide"
                  onClick={handleSwitch}
                >
                  create an account
                </button>
              </p>
            )
          ) : (
            <p className="font-semibold dark:text-gray-300">
              or{" "}
              <button
                className="text-primary cursor-pointer tracking-wide"
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
      </div>

      {/* {children} */}

      {isValidElement(children) ? cloneElement(children, { recaptchaRef: recaptchaReference }) : children}

      <p className="text-xs font-semibold tracking-wide text-gray-500 text-center mt-2 lg:mt-1 dark:text-gray-200">------- or -------</p>
      {!(isLoginOtpSend || isSigUpOtpSend) && ( <OAuth />)}
      <ReCAPTCHA
        sitekey={siteKey}
        size="invisible"
        ref={recaptchaReference}
        badge="bottomright"
        onError={(err) => console.error("error occurred", err)}
        onExpired={() => recaptchaReference.current.reset()}
      />
    </div>
  );
});

export default ModalSubContainer;
