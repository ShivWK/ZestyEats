import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const restaurantsApi = createApi({
  reducerPath: "restuarants",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api",
  }),

  endpoints: (builder) => ({
    getSpecificRestaurantData: builder.query({
      query: (url) => ({
        url: "/api/specific-restaurants",
        params: { url },
      }),
    }),
  }),
});

export default restaurantsApi;

export const {
    useGetSpecificRestaurantDataQuery
} = restaurantsApi