import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    isEntryMade: false,
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
        },

        disableEntry : (state) => {
            state.isEntryMade = false;
        },

        enableEntry : (state) => {
            state.isEntryMade = false;
        },
    }
});

export const selectlogInModal = (state) => state.login.isOpen;
export const selectEntry = (state) => state.login.initialState
export const loginReducer = loginSlice.reducer;
export const { openLogInModal, closeLogInModal, enableEntry, disableEntry } = loginSlice.actions;

