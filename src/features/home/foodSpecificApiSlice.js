import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const foodSpecificApiSlice = createApi({
  reducerPath: "foodSpecific",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api/zestyeats",
  }),
  keepUnusedDataFor: 120,
  refetchOnReconnect: true,

  endpoints: (builder) => {
    return {
      getFoodSpecificData: builder.query({
        query: ({lat, lng, collection_id, tags}) => {
          return {
            url: "food-category",
            params: {lat, lng, collection_id, tags},
          };
        },
      }),
    };
  },
});

export default foodSpecificApiSlice;
