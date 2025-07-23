import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false,
    isHideLogin: false,
    isHideLocation: false,
    isLocationModalOpen: false,
    isLocationHovered: false,
    isLoginOtpSend: false,
    isSignUpOtpSend: false,
    isLoggedIn: false,
    isLoading: false,
    isMember: true,
    modalTrace: [],
    loginOpened: false,
}

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,

    reducers: {
        setLogInModal: (state, action) => {
            state.isLoginModalOpen = action.payload;

            if (action.payload) {
                window.history.pushState({ model: "login" }, "", location.href)
            }
        },

        setHideLogin: (state, action) => {
            state.isHideLogin = action.payload;
        },

        setLocationModal: (state, action) => {
            state.isLocationModalOpen = action.payload;

            if (action.payload) {
                window.history.pushState({ model: "location" }, "", location.href)
            }
        },

        setHideLocation: (state, action) => {
            state.isHideLocation = action.payload;
        },

        setLocationHovered: state => {
            state.isLocationHovered = true;
        },

        loginOtpSend: (state, action) => {
            state.isLoginOtpSend = action.payload;
        },

        signUpOtpSend: (state, action) => {
            state.isSignUpOtpSend = action.payload;
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
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
        }
    }
});

export default loginSlice.reducer;

export const selectLogInModal = (state) => state.login.isLoginModalOpen;
export const selectLoginOtp = (state) => state.login.isLoginOtpSend;
export const selectSignUpOtp = (state) => state.login.isSignUpOtpSend;
export const selectLocationModal = (state) => state.login.isLocationModalOpen;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectIsLoading = (state) => state.login.isLoading;
export const selectIsMember = (state) => state.login.isMember;
export const selectLoginOpened = (state) => state.login.loginOpened;
export const selectModalTrace = (state) => state.login.modalTrace;

export const selectHoverState = createSelector([state => state.login.isLoginHovered, state => state.login.isLocationHovered], ( location ) => ({ locationHovered: location }));

export const selectHideModel = createSelector([state => state.login.isHideLogin, state => state.login.isHideLocation], (loginHide, locationHide) => {
    return {
        loginHide,
        locationHide
    }
})

export const {
    setLogInModal,
    closeLogInModal,
    loginOtpSend,
    signUpOtpSend,
    setLocationModal,
    closeLocationInModal,
    setIsLoggedIn,
    setLoading,
    setMember,
    setLocationHovered,
    setHideLocation,
    setHideLogin,
    setLoginOpened,
    setModalTrace,
} = loginSlice.actions;



