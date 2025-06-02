import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const restaurantsApi = createApi({
  reducerPath: "restuarants",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api",
  }),

  endpoints: (builder) => ({
    getSpecificRestaurantData: builder.query({
      query: ({ lat, lng, id }) => ({
        url: "/specific-restaurants",
        params: { lat, lng, id },
      }),
    }),

    getSearchedDish: builder.query({
      query: ({ lat, lng, restro_Id, searchTerm }) => ({
        url: "/api/dish-search",
        params: { lat, lng, restro_Id, searchTerm },
      }),
    }),
  }),
});

export default restaurantsApi;

export const { useLazyGetSearchedDishQuery } = restaurantsApi;