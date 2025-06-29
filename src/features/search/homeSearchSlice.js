import { createSlice } from "@reduxjs/toolkit"

const homeSearchSlice = createSlice({
    name: "homeSearchSlice",
    initialState: {
        isSuggestionsLoading: true,
        suggestions: [],
    },

    reducers: {
        setSuggestionsLoading: (state, action) => {
            state.isSuggestionsLoading = action.payload;
        },

        setSuggestions: (state, action) => {
            state.suggestions = action.payload
        }
    }
});

export default homeSearchSlice.reducer;

export const selectSuggestionsLoading = state => state.homeSearchSlice.isSuggestionsLoading;
export const selectSuggestions = state => state.homeSearchSlice.suggestions;

export const {setSuggestions, setSuggestionsLoading} = homeSearchSlice.actions;