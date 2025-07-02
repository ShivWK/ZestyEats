import { createSelector, createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",

  initialState: {
    veg: true,
    non_veg: true,
    currentSpecificRestaurant: null,
    menuItems: [],
    menuModel: false,
    allProductsOfCurrentRestaurant: [],
  },

  reducers: {
    addCurrentRestaurant: (state, action) => {
      state.currentSpecificRestaurant = action.payload;
    },

    setVegOption: (state, action) => {
      console.log("reducer veg", action.payload);

      if (action.payload) {
        state.veg = true;
        state.non_veg = false;
      } else {
        state.non_veg = true;
      }
    },

    setNonVegOption: (state, action) => {
      console.log("reducer non", action.payload);

      if (action.payload) {
        state.non_veg = true;
        state.veg = false;
      } else {
        state.veg = true;
      }
    },

    setMenuItems: (state, action) => {
      if (action.payload.mode === "empty") {
        // never use return state in immer js, don’t return a value unless you are replacing the entire state slice
        state.menuItems = [];
      } else {
        const object = state.menuItems.find(obj => obj.title === action.payload.title)
        if (!object) {
          state.menuItems.push(action.payload);
        }
      }
    },

    toggleMenuModel: (state) => {
      state.menuModel = !state.menuModel;
    },

    setRestaurantItems: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.allProductsOfCurrentRestaurant = action.payload;
      } else {
        state.allProductsOfCurrentRestaurant.push(action.payload);
      }
    }
  },
});

export default restaurantSlice.reducer;

export const selectCurrentRestaurant = (state) => state.restaurant.currentSpecificRestaurant;
export const selectMenuItems = (state) => state.restaurant.menuItems;
export const selectMenuModel = (state) => state.restaurant.menuModel;
export const selectRestaurantAllItems = (state) => state.restaurant.allProductsOfCurrentRestaurant;
export const selectVegVariant = createSelector([state => state.restaurant.veg, state => state.restaurant.non_veg], (veg, non_veg) => ({ vegOption: veg, nonVegOption: non_veg }))


export const {
  addCurrentRestaurant,
  setVegOption,
  setNonVegOption,
  setMenuItems,
  toggleMenuModel,
  setRestaurantItems
} = restaurantSlice.actions;
