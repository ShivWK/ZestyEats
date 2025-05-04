import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchApiSlice = createApi({
    reducerPath: "search",
    baseQuery: fetchBaseQuery({ baseUrl: "https://swiggy-clone-klzu.onrender.com/api" }),

    endpoints: (builder) => ({
        getAutoCompleteSearch: builder.query({
            query: (input) => ({
                url: '/place-autocomplete',
                params: { input }
            })
        }),

        // searchedLocation: builder.query({
        //     query: (place_id) => `/dapi/misc/address-recommend?place_id=${place_id}`,
        //     transformResponse: (data) => {
        //         return {
        //             lat: data?.data?.[0]?.geometry?.location.lat,
        //             lng: data?.data?.[0]?.geometry?.location.lng,
        //         };
        //     },
        // }),

        searchedLocation: builder.query({
            query: (place_id) => ({
              url: '/address-recommend',
              params: { place_id }
            }),

            transformResponse: (data) => {
                return {
                    lat: data?.data?.[0]?.geometry?.location.lat,
                    lng: data?.data?.[0]?.geometry?.location.lng,
                };
            },
          }),

        searchedLocationData: builder.query({
            query: ({ lat, lng }) =>
                `/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
        }),
    }),
});

export default searchApiSlice;
export const {
    useLazySearchedLocationQuery,
    useLazySearchedLocationDataQuery,
    useLazyGetAutoCompleteSearchQuery,
  } = searchApiSlice;
