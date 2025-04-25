import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
}
const loginSlice = createSlice({
    name: "login",
    initialState: initialState,

    reducers: {
        openLogInModal: (state) => {
            state.isOpen = true
        },

        closeLogInModal: (state) => {
            state.isOpen = false;
        }
    }
});

export const selectlogInModal = (state) => state.login.isOpen;
export const loginReducer = loginSlice.reducer;
export const { openLogInModal, closeLogInModal } = loginSlice.actions;

