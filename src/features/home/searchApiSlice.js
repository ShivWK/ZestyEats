import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchApiSlice = createApi({
    reducerPath: "search",
    baseQuery: fetchBaseQuery({ baseUrl: "https://swiggy-clone-klzu.onrender.com/api/swiggy" }),

    endpoints: (builder) => ({
        getAutoCompleteSearch: builder.query({
            query: (input) => ({
                url: '/place-autocomplete',
                params: { input }
            })
        }),

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

        locationByCoordinates: builder.query({
            query: ({ lat1, lng1 }) => ({
                url: '/address-from-coordinates',
                params: {lat1, lng1},
            })
        })

    }),
});

export default searchApiSlice;
export const {
    useLazySearchedLocationQuery,
    useLazyGetAutoCompleteSearchQuery,
    useLazyLocationByCoordinatesQuery,
  } = searchApiSlice;
