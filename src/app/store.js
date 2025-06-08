import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import homeApiSlice from "../features/home/homeApiSlice";
import homeReducer from "../features/home/homeSlice";
import loginReducer from "../features/Login/loginSlice";
import searchApiSlice from "../features/home/searchApiSlice";
import headerReducer from "../features/header/headerSlice";
import restaurantsApi from "../features/home/restaurantsApiSlice";
import restaurantReducer from "../features/home/restaurantsSlice";
import foodSpecificApiSlice from "../features/home/foodSpecificApiSlice";
import helpReducer from "./../features/home/helpPageSlice";

const store = configureStore({
  reducer: {
    [homeApiSlice.reducerPath]: homeApiSlice.reducer,
    [searchApiSlice.reducerPath]: searchApiSlice.reducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    [foodSpecificApiSlice.reducerPath]: foodSpecificApiSlice.reducer,
    home: homeReducer,
    login: loginReducer,
    header: headerReducer,
    restaurant: restaurantReducer,
    help: helpReducer,
  },
  middleware: (defaultMiddlewares) => [
    ...defaultMiddlewares(),
    homeApiSlice.middleware,
    searchApiSlice.middleware,
    restaurantsApi.middleware,
    foodSpecificApiSlice.middleware,
  ],
});

setupListeners(store.dispatch);

export default store;
