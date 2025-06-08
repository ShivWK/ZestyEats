import { createSlice } from "@reduxjs/toolkit";

const helpPageSlice = createSlice({
    name: "help",
    initialState: {
        contact: false,
        accordionData: [],
    },

    reducers: {
        toggleContact: (state, action) => {
            state.contact = action.payload;
        },

        setAccordionData: (state, action) => {
            state.accordionData = action.payload;
        }
    }
})

export default helpPageSlice.reducer;

export const {
    toggleContact,
    setAccordionData,
} = helpPageSlice.actions;

export const selectContact = state => state.help.contact;
export const selectAccordionData = state => state.help.accordionData;
