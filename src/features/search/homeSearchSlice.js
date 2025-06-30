import { createSlice } from "@reduxjs/toolkit"

const homeSearchSlice = createSlice({
    name: "homeSearchSlice",
    initialState: {
        isSuggestionsLoading: false,
        suggestions: [],
    },

    reducers: {
        setSuggestionsLoading: (state, action) => {
            state.isSuggestionsLoading = action.payload;
        },

        setSuggestions: (state, action) => {
            state.suggestions = action.payload?.data?.suggestions;
        }
    }
});

export default homeSearchSlice.reducer;

export const selectSuggestionsLoading = state => state.homeSearchSlice.isSuggestionsLoading;
export const selectSuggestions = state => state.homeSearchSlice.suggestions;

export const {setSuggestions, setSuggestionsLoading } = homeSearchSlice.actions;