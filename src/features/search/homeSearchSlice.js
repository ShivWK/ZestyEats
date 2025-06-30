import { createSlice } from "@reduxjs/toolkit";

const homeSearchSlice = createSlice({
  name: "homeSearchSlice",
  initialState: {
    isSuggestionsLoading: false,
    suggestions: [],
    tabSuggestionsData: [],
    tabQueryData: "",
  },

  reducers: {
    setSuggestionsLoading: (state, action) => {
      state.isSuggestionsLoading = action.payload;
    },

    setSuggestions: (state, action) => {
      state.suggestions = action.payload?.data?.suggestions;
    },

    setTapSuggestionData: (state, action) => {
      state.tabSuggestionsData = action.payload;
    },

    setTabQueryData: (state, action) => {
      state.tabQueryData = action.payload;
    },
  },
});

export default homeSearchSlice.reducer;

export const selectSuggestionsLoading = (state) => state.homeSearchSlice.isSuggestionsLoading;
export const selectSuggestions = (state) => state.homeSearchSlice.suggestions;
export const selectTabSuggestionData = (state) => state.homeSearchSlice.tabSuggestionsData;
export const selectTabQueryData = (state) => state.homeSearchSlice.tabQueryData;

export const {
  setSuggestions,
  setSuggestionsLoading,
  setTabQueryData,
  setTapSuggestionData,
} = homeSearchSlice.actions;
