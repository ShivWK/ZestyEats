import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const restaurantsApi = createApi({
  reducerPath: "restuarants",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api/zestyeats",
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

export const { useLazyGetSearchedDishQuery, useGetSearchedDishQuery } = restaurantsApi;