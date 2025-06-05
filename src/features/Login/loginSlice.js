import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoginModalOpen: false,
    isLocationModalOpen: false,
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
        openLogInModal: (state) => {
            state.isLoginModalOpen = true;
        },

        closeLogInModal: (state) => {
            state.isLoginModalOpen = false;
        },

        openLocationModal: (state) => {
            state.isLocationModalOpen = true;
        },

        closeLocationInModal: (state) => {
            state.isLocationModalOpen = false;
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
export const selectlogInModal = (state) => state.login.isLoginModalOpen;
export const selectLoginOtp = (state) => state.login.isLoginOtpSend;
export const selectSignUpOtp = (state) => state.login.isSignUpOtpSend;
export const selectLocationModal = (state) => state.login.isLocationModalOpen;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectIsLoading = (state) => state.login.isLoading;
export const selectIsMember = (state) => state.login.isMember;

export const { 
    openLogInModal, 
    closeLogInModal, 
    loginOtpSend, 
    loginOtpNotSend,
    signUpOtpSend,
    signUpOtpNotSend,
    openLocationModal,
    closeLocationInModal,
    setIsLoggedIn,
    setLoading,
    setMember,
} = loginSlice.actions;

