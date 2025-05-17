import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    helpSelfHeader: false,
    profileSelfHeader: false,
    offerDinoutsSelfHeader: false,
    homeSelfHeader: false,
}

const headerSlice = createSlice({
    name: "header",
    initialState: initialState,
    reducers: {
        setHomeSelfHeader: (state, action) => {
            state.homeSelfHeader = action.payload;
        },
        
        setHelpSelfHeader: (state, action) => {
            state.helpSelfHeader = action.payload;
        },

        setProfileSelfHeader: (state, action) => {
            state.profileSelfHeader = action.payload;
        },

        setOfferDinoutsSelfHeader: (state, action) => {
            state.offerDinoutsSelfHeader = action.payload;
        },
    }
})

export default headerSlice.reducer;

export const selectHomeSelfHeader = state => state.homeSelfHeader;
export const selectHelpSelfHeader = state => state.helpSelfHeader;
export const selectProfileSelfHeader = state => state.profileSelfHeader;
export const selectOfferDinoutsSelfHeader = state => state.offerDinoutsSelfHeader;

export const {
    setHomeSelfHeader,
    setHelpSelfHeader,
    setProfileSelfHeader,
    setOfferDinoutsSelfHeader,
} = headerSlice.actions;
