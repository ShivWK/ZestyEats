import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isLoginOtpSend: false,
}
const loginSlice = createSlice({
    name: "login",
    initialState: initialState,

    reducers: {
        openLogInModal: (state) => {
            state.isOpen = true;
        },

        closeLogInModal: (state) => {
            state.isOpen = false;
        },

        loginOtpSend: (state) => {
            state.isLoginOtpSend = true;
        },

        loginOtpNotSend: (state) => {
            state.isLoginOtpSend = false;
        },
    }
});

export const selectlogInModal = (state) => state.login.isOpen;
export const selectLoginOtp = (state) => state.login.isLoginOtpSend
export const loginReducer = loginSlice.reducer;
export const { openLogInModal, closeLogInModal, loginOtpSend, loginOtpNotSend } = loginSlice.actions;

