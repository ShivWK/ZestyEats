import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeSearchApiSlice = createApi({
    reducerPath: "homeSearch",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://swiggy-clone-klzu.onrender.com/api/zestyeats",
    }),
    keepUnusedDataFor: 120,
    endpoints: (builder) => {
        return {
            getSearchHomeData: builder.query({
                query: ({ lat, lng }) => ({
                    url: "/search-home-data",
                    params: { lat, lng },
                }),
            }),

            getSearchedFoodSuggestions: builder.query({
                query: ({ lat, lng, food }) => ({
                    url: "/search-food-suggestions",
                    params: { lat, lng, food },
                }),
            }),

            getExtraFoodSuggestions: builder.query({
                query: ({ lat, lng, food }) => ({
                    url: "/extra-suggestions",
                    params: { lat, lng, food },
                }),
            }),

            getSuggestedData: builder.query({
                query: ({lat, lng, str, metadata }) => ({
                    url: "/suggested-data",
                    params: {lat, lng, str, metadata}
                })
            }),

            getTabClickData: builder.query({
                query: ({lat, lng, str, submitAction, selectedPLTab}) => ({
                    url: "/search-tab-data",
                    params: { lat, lng, str, submitAction, selectedPLTab}
                })
            })
        };
    },
});

export default homeSearchApiSlice;
export const {
    useLazyGetSearchHomeDataQuery,
    useLazyGetSearchedFoodSuggestionsQuery,
    useLazyGetExtraFoodSuggestionsQuery,
    useLazyGetSuggestedDataQuery,
} = homeSearchApiSlice;
