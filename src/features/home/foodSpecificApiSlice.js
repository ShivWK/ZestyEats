import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const foodSpecificApiSlice = createApi({
  reducerPath: 'foodSpecific',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/zestyeats`,
  }),
  keepUnusedDataFor: 120,
  refetchOnReconnect: true,

  endpoints: (builder) => {
    return {
      getFoodSpecificData: builder.query({
        query: ({ lat, lng, collection_id, tags }) => {
          return {
            url: 'food-category',
            params: { lat, lng, collection_id, tags },
          };
        },
      }),
    };
  },
});

export default foodSpecificApiSlice;
