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
import homeSearchApiSlice from "../features/search/homeSearchApiSlice";
import cityHomeApiSlice from "../features/cityHome/cityHomeApiSlice";
import cityHomeReducer from "../features/cityHome/cityHomeSlice";
import homeSearchSliceReducer from "../features/search/homeSearchSlice";
import profileApiSlice from "../features/profile/profileApiSlice";
import deliverySliceReducer from "../features/delivery/deliverySlice";

const store = configureStore({
  reducer: {
    [homeApiSlice.reducerPath]: homeApiSlice.reducer,
    [searchApiSlice.reducerPath]: searchApiSlice.reducer,
    [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    [foodSpecificApiSlice.reducerPath]: foodSpecificApiSlice.reducer,
    [homeSearchApiSlice.reducerPath]: homeSearchApiSlice.reducer,
    [cityHomeApiSlice.reducerPath]: cityHomeApiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    home: homeReducer,
    login: loginReducer,
    header: headerReducer,
    restaurant: restaurantReducer,
    help: helpReducer,
    cityHomeSlice: cityHomeReducer,
    homeSearchSlice: homeSearchSliceReducer,
    delivery: deliverySliceReducer,
  },
  middleware: (defaultMiddlewares) => [
    ...defaultMiddlewares(),
    homeApiSlice.middleware,
    searchApiSlice.middleware,
    restaurantsApi.middleware,
    foodSpecificApiSlice.middleware,
    homeSearchApiSlice.middleware,
    cityHomeApiSlice.middleware,
    profileApiSlice.middleware,
  ],
});

setupListeners(store.dispatch);

export default store;
