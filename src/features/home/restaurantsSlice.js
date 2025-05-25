import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name: "restaurant",
    
    initialState: {
        currentSpecificRestaurant: "",
    },

    reducers: {
        addCurrentRestaurant: (state, action) => {
            state.currentSpecificRestaurant = action.payload;
        },
    }
})

export default restaurantSlice.reducer;

export const selectCurrentRestaurant = state => state.restaurant.currentSpecificRestaurant;

export const { addCurrentRestaurant } = restaurantSlice.actions;