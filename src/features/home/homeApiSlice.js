import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const homeApiSlice = createApi({
  reducerPath: 'homeFirestoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/zestyeats`,
    prepareHeaders: (headers) => {
      headers.set('x-identifier', import.meta.env.VITE_HASHED_IDENTIFIER);
      return headers;
    },
    credentials: 'include',
  }),
  keepUnusedDataFor: 60,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getHomePageData: builder.query({
      query: ({ lat, lng }) => ({
        url: '/homePageData',
        params: { lat, lng },
      }),
    }),
  }),
});

export const { useGetHomePageDataQuery, useLazyGetHomePageDataQuery } =
  homeApiSlice;
export default homeApiSlice;
