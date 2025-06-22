import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const restaurantsApi = createApi({
  reducerPath: "restuarants",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api/swiggy",
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

    getNearByRestroData: builder.query({
      query: ({place, cuisineType}) => ({
        url: "/cuisine-near-me-data",
        params: { place, cuisineType }
      })
    }),


  }),
});

export default restaurantsApi;

export const { useLazyGetSearchedDishQuery, useGetSearchedDishQuery } = restaurantsApi;