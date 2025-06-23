import { createSlice } from "@reduxjs/toolkit";

const cityHomeSlice = createSlice({
    name: "cityHomeSlice",

    initialState: {
        city: "",
    },

    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        }
    }
})

export default cityHomeSlice.reducer;

export const selectCity = state => state.cityHomeSlice.city;

export const { setCity } = cityHomeSlice.actions;