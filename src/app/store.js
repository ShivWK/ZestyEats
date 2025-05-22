import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import homeApiSlice from "../features/home/homeApiSlice";
import HomeReducer from "../features/home/homeSlice";
import { loginReducer } from "../features/Login/loginSlice";
import searchApiSlice from "../features/home/searchApiSlice";
import HeaderReducer from "../features/header/headerSlice";
import restaurantsApi from "../features/home/restaurantsApiSlice";
import restaurantReducer from "../features/home/restaurantsSlice";

const store = configureStore({
    reducer: {
        [homeApiSlice.reducerPath]: homeApiSlice.reducer,
        [searchApiSlice.reducerPath]: searchApiSlice.reducer,
        [restaurantsApi.reducerPath]: restaurantsApi.reducer,
        home: HomeReducer,
        login: loginReducer,
        header: HeaderReducer,
        restaurant: restaurantReducer,
    },
    middleware: (defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware, searchApiSlice.middleware, restaurantsApi.middleware],
})

setupListeners(store.dispatch);

export default store;