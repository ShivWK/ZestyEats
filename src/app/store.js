import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import homeApiSlice from "../features/home/homeApiSlice";
import HomeReducer from "../features/home/homeSlice";
import { loginReducer } from "../features/Login/loginSlice";
import searchApiSlice from "../features/home/searchApiSlice";
import HeaderReducer from "../features/header/headerSlice";

const store = configureStore({
    reducer: {
        [homeApiSlice.reducerPath]: homeApiSlice.reducer,
        [searchApiSlice.reducerPath]: searchApiSlice.reducer,
        home: HomeReducer,
        login: loginReducer,
        header: HeaderReducer,
    },
    middleware: (defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware, searchApiSlice.middleware],
})

setupListeners(store.dispatch);

export default store;