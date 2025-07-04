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
    wishListItems: {},
    itemsToBeAddedInCart: {},
    cart: {},
    favoriteRestro: []
  },

  reducers: {
    addCurrentRestaurant: (state, action) => {
      state.currentSpecificRestaurant = action.payload;
    },

    setVegOption: (state, action) => {
      if (action.payload) {
        state.veg = true;
        state.non_veg = false;
      } else {
        state.non_veg = true;
      }
    },

    setNonVegOption: (state, action) => {
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
    },

    addToWishlistItem: (state, action) => {
      if (action.payload.mode === "initial") {
        state.wishListItems = action.payload.object;
      } else {
        const itmObject = action.payload;
        state.wishListItems[itmObject.item?.id] = itmObject;
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishListItems))
    },

    deleteItemFromWishlist: (state, action) => {
      delete state.wishListItems[action.payload];

      localStorage.setItem("wishlist", JSON.stringify(state.wishListItems))
    },

    toggleItemsToBeAddedInCart: (state, action) => {
      if (action.payload.mode === "initial") {
        state.itemsToBeAddedInCart = action.payload.object;
      } else {
        const { add, id: item_id, restro_id } = action.payload;

        if (add) {
          if (restro_id in state.itemsToBeAddedInCart) {
            state.itemsToBeAddedInCart[restro_id].push(item_id);
          } else {
            state.itemsToBeAddedInCart[restro_id] = [item_id];
          }

        }
        else {
          const prv = state.itemsToBeAddedInCart[restro_id];
          if (!prv) return;

          const index = prv.findIndex(itemId => itemId === item_id);
          if (index !== -1) {
            state.itemsToBeAddedInCart[restro_id] = [
              ...prv.slice(0, index),
              ...prv.slice(index + 1)
            ];

            if (state.itemsToBeAddedInCart[restro_id].length === 0) {
              delete state.itemsToBeAddedInCart[restro_id];
            }
          }
        }
      }
    },

    setItemToCart: (state, action) => {
      if (action.payload.made === "initial") {
        state.cart = action.payload.object;
      } else {
        const { add, id, data } = action.payload;

        if (add) {
          state.cart[id] = data;
        } else {
          state.cart = {};
        }
      }
    },

    setFavoriteRestro: (state, action) => {
      if (action.payload.mode === "initial") {
        state.favoriteRestro = action.payload.object;
      } else {
        if (state.favoriteRestro.find(obj => obj.data.id === action.payload.id)) {
          const index = state.favoriteRestro.findIndex(obj => obj.data.id === action.payload.id);

          const prv = state.favoriteRestro;
          state.favoriteRestro = [...prv.slice(0, index), ...prv.slice(index + 1)]
        } else {
          state.favoriteRestro.push(action.payload);
        }
      }

      localStorage.setItem("favRestros", JSON.stringify(state.favoriteRestro));
    },

  },
});

export default restaurantSlice.reducer;

export const selectCurrentRestaurant = (state) => state.restaurant.currentSpecificRestaurant;
export const selectMenuItems = (state) => state.restaurant.menuItems;
export const selectMenuModel = (state) => state.restaurant.menuModel;
export const selectRestaurantAllItems = (state) => state.restaurant.allProductsOfCurrentRestaurant;
export const selectWishlistItems = (state) => state.restaurant.wishListItems;
export const selectCart = (state) => state.restaurant.cart;
export const selectItemsToBeAddedInCart = state => state.restaurant.itemsToBeAddedInCart;
export const selectFavoriteRestros = state => state.restaurant.favoriteRestro;

export const selectVegVariant = createSelector([state => state.restaurant.veg, state => state.restaurant.non_veg], (veg, non_veg) => ({ vegOption: veg, nonVegOption: non_veg }))

export const {
  addCurrentRestaurant,
  setVegOption,
  setNonVegOption,
  setMenuItems,
  toggleMenuModel,
  setRestaurantItems,
  addToWishlistItem,
  deleteItemFromWishlist,
  toggleItemsToBeAddedInCart,
  setItemToCart,
  setFavoriteRestro,
} = restaurantSlice.actions;
