import { configureStore } from "@reduxjs/toolkit";
import homeApiSlice from "../features/home/homeApiSlice";

const store = configureStore({
    reducer : {
        [homeApiSlice.reducerPath] : homeApiSlice.reducer,
    },
    middleware:(defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware],
})

export default store;