import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const searchApiSlice = createApi({
  reducerPath: 'search',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api/zestyeats`,
  }),

  endpoints: (builder) => ({
    getAutoCompleteSearch: builder.query({
      query: (input) => ({
        url: '/place-autocomplete',
        params: { input },
      }),
    }),

    searchedLocation: builder.query({
      query: (place_id) => ({
        url: '/address-recommend',
        params: { place_id },
      }),

      transformResponse: (data) => {
        return {
          lat: data?.data?.[0]?.geometry?.location.lat,
          lng: data?.data?.[0]?.geometry?.location.lng,
        };
      },
    }),

    locationByCoordinates: builder.query({
      query: ({ lat, lng }) => ({
        url: '/address-from-coordinates',
        params: { lat, lng },
      }),
    }),
  }),
});

export default searchApiSlice;
export const {
  useLazySearchedLocationQuery,
  useLazyGetAutoCompleteSearchQuery,
  useLazyLocationByCoordinatesQuery,
} = searchApiSlice;
