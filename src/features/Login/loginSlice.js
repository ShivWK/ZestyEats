import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isOpen: false,
    },

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
export const { openLogInmodal, closeLogInModal } = loginSlice.actions;