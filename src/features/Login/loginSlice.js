import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  isLoginModalOpen: false,
  isHideLogin: false,
  isHideLocation: false,
  isLocationModalOpen: false,
  isLoginOtpSend: false,
  isSignUpOtpSend: false,
  isLoggedIn: false,
  isLoading: false,
  isMember: true,
  modalTrace: [],
  loginOpened: false,
  otpOnPhone: true,
  isLocationInfoModalOpen: false,
  hideLocationInfoModal: false,
  locationInfoModalReason: "permission",
  isGrantClicked: false,
  errorMessage: "",
  fullDisable: false,
  appLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,

  reducers: {
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },

    setFullDisable: (state, action) => {
      state.fullDisable = action.payload;
    },

    setLogInModal: (state, action) => {
      state.isLoginModalOpen = action.payload;

      if (action.payload) {
        window.history.pushState({ model: "login" }, "", location.href);
      }
    },

    setHideLogin: (state, action) => {
      state.isHideLogin = action.payload;
    },

    setLocationModal: (state, action) => {
      state.isLocationModalOpen = action.payload;

      if (action.payload) {
        window.history.pushState({ model: "location" }, "", location.href);
      }
    },

    setHideLocation: (state, action) => {
      state.isHideLocation = action.payload;
    },

    setHideLocationInfoModal: (state, action) => {
      state.hideLocationInfoModal = action.payload;
    },

    setLocationInfoModal: (state, action) => {
      state.isLocationInfoModalOpen = action.payload;
    },

    setLocationInfoModalReason: (state, action) => {
      state.locationInfoModalReason = action.payload;
    },

    setGrantBTnClicked: (state, action) => {
      state.isGrantClicked = action.payload;
    },

    loginOtpSend: (state, action) => {
      state.isLoginOtpSend = action.payload;
    },

    signUpOtpSend: (state, action) => {
      state.isSignUpOtpSend = action.payload;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;

      {action.payload ? localStorage.setItem("auth", "true") : localStorage.setItem("auth", "false")}
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setMember: (state, action) => {
      state.isMember = action.payload;
    },

    setLoginOpened: (state, action) => {
      state.loginOpened = action.payload;
    },

    setModalTrace: (state, action) => {
      if (action.payload.mode === "empty") {
        state.modalTrace = [];
      } else {
        state.modalTrace.push(action.payload);
      }
    },

    toggleOtpOnPhone: (state) => {
      state.otpOnPhone = !state.otpOnPhone;
    },
  },
});

export default loginSlice.reducer;

export const selectAppLoading = (state) => state.login.appLoading;
export const selectLogInModal = (state) => state.login.isLoginModalOpen;
export const selectLoginOtp = (state) => state.login.isLoginOtpSend;
export const selectSignUpOtp = (state) => state.login.isSignUpOtpSend;
export const selectLocationModal = (state) => state.login.isLocationModalOpen;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectIsLoading = (state) => state.login.isLoading;
export const selectIsMember = (state) => state.login.isMember;
export const selectLoginOpened = (state) => state.login.loginOpened;
export const selectModalTrace = (state) => state.login.modalTrace;
export const selectOtpOnPhone = (state) => state.login.otpOnPhone;
export const selectLocationInfoModalReason = (state) => state.login.locationInfoModalReason;
export const selectGrantBtnClicked = (state) => state.login.isGrantClicked;
export const selectErrorMessage = (state) => state.login.errorMessage;
export const selectFullDisable = (state) => state.login.fullDisable;

export const selectLocationInfoModal = createSelector(
  [
    (state) => state.login.isLocationInfoModalOpen,
    (state) => state.login.hideLocationInfoModal,
  ],
  (OpenLocationInfoModal, hideLocationInfoModal) => ({
    OpenLocationInfoModal,
    hideLocationInfoModal
  })
);

export const selectHideModel = createSelector(
  [(state) => state.login.isHideLogin, (state) => state.login.isHideLocation],
  (loginHide, locationHide) => {
    return {
      loginHide,
      locationHide,
    };
  }
);

export const {
  setAppLoading,
  setLogInModal,
  loginOtpSend,
  signUpOtpSend,
  setLocationModal,
  setIsLoggedIn,
  setLoading,
  setMember,
  setHideLocation,
  setHideLogin,
  setLoginOpened,
  setModalTrace,
  toggleOtpOnPhone,
  setHideLocationInfoModal,
  setLocationInfoModal,
  setLocationInfoModalReason,
  setGrantBTnClicked,
  setErrorMessage,
  setFullDisable,
} = loginSlice.actions;
