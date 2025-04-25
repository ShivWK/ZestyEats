import { configureStore } from "@reduxjs/toolkit";
import homeApiSlice from "../features/home/homeApiSlice";
import HomeReducer from "../features/home/homeSlice";
import LoginModel from "../components/Login/LoginModel";

const store = configureStore({
    reducer : {
        [homeApiSlice.reducerPath] : homeApiSlice.reducer,
        home: HomeReducer,
        login: LoginModel,
    },
    middleware:(defaultMiddlewares) => [...defaultMiddlewares(), homeApiSlice.middleware],
})

export default store;