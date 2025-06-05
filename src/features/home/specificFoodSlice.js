import { createSlice, current } from "@reduxjs/toolkit";

const specificFoodSlice = createSlice ({
        name: "specificFood",
        initialState: {
            currentFoodCategory: "",
        },

        reducers: {
            setCurrentFoodCategory: (state, action) => {
                state.currentFoodCategory = action.payload
            }
        }
})

export default specificFoodSlice.reducer;

export const { setCurrentFoodCategory } = specificFoodSlice.actions;

export const selectFoodCategory = state => state.currentFoodCategory;