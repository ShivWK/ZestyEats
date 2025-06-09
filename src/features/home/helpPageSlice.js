import { createSlice } from "@reduxjs/toolkit";

const helpPageSlice = createSlice({
    name: "help",
    initialState: {
        contact: true,
        faqs: false,
    },

    reducers: {
        setContact: (state, action) => {
            state.contact = action.payload;
        },

        setFaqs: (state, action) => {
            state.faqs = action.payload;
        }
    }
})

export default helpPageSlice.reducer;

export const {
    setContact,
    setFaqs,
} = helpPageSlice.actions;

export const selectContact = state => state.help.contact;
export const selectFaqs = state => state.help.faqs;
