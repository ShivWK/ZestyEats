import { configureStore } from "@reduxjs/toolkit";
import homeApiSlice from "../features/home/homeApiSlice";
import HomeReducer from "../features/home/homeSlice";
import { loginReducer } from "../features/Login/loginSlice";

const store = configureStore({
    reducer : {
        [homeApiSlice.reducerPath] : homeApiSlice.reducer,
        home: HomeReducer,
        login: loginReducer,
    },
    middleware:(defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware],
})

export default store;