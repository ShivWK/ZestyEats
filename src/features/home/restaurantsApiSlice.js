import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const restaurantsApi = createApi({
  reducerPath: "restuarants",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api/zestyeats",
    prepareHeaders: (headers) => {
      headers.set("x-identifier" , import.meta.env.HASHED_IDENTIFIER);
      return headers
    }
  }),
  keepUnusedDataFor: 120,

  endpoints: (builder) => ({
    getSpecificRestaurantData: builder.query({
      query: ({ lat, lng, id }) => ({
        url: "/specific-restaurants",
        params: { lat, lng, id },
      }),
    }),

    getSearchedDish: builder.query({
      query: ({ lat, lng, restro_Id, searchTerm }) => {
        return {
          url: "/dish-search",
          params: { lat, lng, restro_Id, searchTerm },
        };
      },
    }),
  }),
});

export default restaurantsApi;

export const { useLazyGetSearchedDishQuery, useLazyGetSpecificRestaurantDataQuery, useGetSearchedDishQuery } = restaurantsApi;