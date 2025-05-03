import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import homeApiSlice from "../features/home/homeApiSlice";
import HomeReducer from "../features/home/homeSlice";
import { loginReducer } from "../features/Login/loginSlice";
import searchApiSlice from "../features/home/searchApiSlice";

const store = configureStore({
    reducer: {
        [homeApiSlice.reducerPath]: homeApiSlice.reducer,
        [searchApiSlice.reducerPath]: searchApiSlice.reducer,
        home: HomeReducer,
        login: loginReducer,
    },
    middleware: (defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware, searchApiSlice.middleware],
})

setupListeners(store.dispatch)

export default store;