import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const restaurantsApi = createApi({
  reducerPath: "restuarants",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api",
  }),

  endpoints: (builder) => ({
    getSpecificRestaurantData: builder.query({
      query: ({lat, lng, id}) => ({
        url: "/specific-restaurants",
        params: { lat, lng, id },
      }),
    }),
  }),
});

export default restaurantsApi;

export const {
    useGetSpecificRestaurantDataQuery,
    useLazyGetSpecificRestaurantDataQuery
} = restaurantsApi