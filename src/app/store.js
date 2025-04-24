import { configureStore } from "@reduxjs/toolkit";
import homeApiSlice from "../features/home/homeApiSlice";
import HomeReducer from "../features/home/homeSlice";

const store = configureStore({
    reducer : {
        [homeApiSlice.reducerPath] : homeApiSlice.reducer,
        home: HomeReducer,
    },
    middleware:(defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware],
})

export default store;