import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const searchApiSlice = createApi({
    reducerPath: "search",
    baseQuery: fetchBaseQuery({ baseUrl: "https://www.swiggy.com" }),

    endpoints: (builder) => ({
        getSearchedLocation: builder.query({
            query: (place_id) => `/dapi/misc/address-recommend?place_id=${place_id}`,
            transformResponse: (data) => {
                return {
                    lat: data?.data?.[0]?.geometry?.location.lat,
                    lng: data?.data?.[0]?.geometry?.location.lng,
                };
            },
        }),

        getSearchedLocationData: builder.query({
            query: ({ lat, lng }) =>
                `/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
        }),
    }),
});

export default searchApiSlice;
export const { useGetSearchedLocationQuery, useGetSearchedLocationDataQuery } = searchApiSlice;
