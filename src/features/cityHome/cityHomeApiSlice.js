import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cityHomeApiSlice = createApi({
  reducerPath: 'cityHome',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/zestyeats`,
  }),
  keepUnusedDataFor: 60*60,

  endpoints: (builder) => ({
    getDataForCityLocalityCuisine: builder.query({
      query: ({ city, type }) => ({
        url: '/city-locality-cuisine-data',
        params: { city, type },
      }),
    }),

    getRestaurantChainInCityData: builder.query({
      query: ({ city, restaurant }) => ({
        url: '/restaurant-chain-in-city',
        params: { city, restaurant },
      }),
    }),

    getDishInCityData: builder.query({
      query: ({ city, dish }) => ({
        url: '/popular-dish-in-city',
        params: { city, dish },
      }),
    }),
  }),
});

export default cityHomeApiSlice;
export const {
  useLazyGetDataForCityLocalityCuisineQuery,
  useLazyGetRestaurantChainInCityDataQuery,
  useLazyGetDishInCityDataQuery,
} = cityHomeApiSlice;
