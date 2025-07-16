import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false,
    isHideLogin: false,
    isHideLocation: false,
    isLoginHovered: false,
    isLocationModalOpen: false,
    isLocationHovered: false,
    isLoginOtpSend: false,
    isSignUpOtpSend: false,
    isLoggedIn: false,
    isLoading: false,
    isMember: true,
}
const loginSlice = createSlice({
    name: "login",
    initialState: initialState,

    reducers: {
        setLogInModal: (state, action) => {
            state.isLoginModalOpen = action.payload;

            if (action.payload) {
                window.history.pushState({model: "login"}, "", "?model=login")
            }
        },

        setHideLogin: (state, action) => {
            console.log("Login called")
            state.isHideLogin = action.payload;
        },

        setLocationModal: (state, action) => {
            state.isLocationModalOpen = action.payload;

            if (action.payload) {
                window.history.pushState({model: "location"}, "", "?model=location")
            }
        },

        setHideLocation: (state, action) => {
            console.log("Location called")

            state.isHideLocation = action.payload;
        },

        setLoginHovered: (state) => {
            state.isLoginHovered = true;
        },

        setLocationHovered: state => {
            state.isLocationHovered = true;
        },

        loginOtpSend: (state) => {
            state.isLoginOtpSend = true;
        },

        loginOtpNotSend: (state) => {
            state.isLoginOtpSend = false;
        },

        signUpOtpSend: (state) => {
            state.isSignUpOtpSend = true;
        },

        signUpOtpNotSend: (state) => {
            state.isSignUpOtpSend = false;
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setMember: (state, action) => {
            state.isMember = action.payload;
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
export const selectHoverState = createSelector([state => state.login.isLoginHovered, state => state.login.isLocationHovered],  (login, location) => ({
    loginHovered: login,
    locationHovered: location,
}));
export const selectHideModel = createSelector([state => state.login.isHideLogin, state => state.login.isHideLocation ], (loginHide, locationHide) => {
    return {
        loginHide,
        locationHide
    }
})

export const { 
    setLogInModal, 
    closeLogInModal, 
    loginOtpSend, 
    loginOtpNotSend,
    signUpOtpSend,
    signUpOtpNotSend,
    setLocationModal,
    closeLocationInModal,
    setIsLoggedIn,
    setLoading,
    setMember,
    setLocationHovered,
    setLoginHovered,
    setHideLocation,
    setHideLogin,
} = loginSlice.actions;

