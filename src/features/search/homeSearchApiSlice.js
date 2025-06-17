import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeSearchApiSlice = createApi({
    reducerPath: "homeSearch",
    baseQuery: fetchBaseQuery({ baseUrl: "https://swiggy-clone-klzu.onrender.com/api/swiggy" }),
    endpoints: builder => {
        return {
            getSearchHomeData: builder.query({
                query: ({ lat, lng }) => ({
                    url: "/search-home-data",
                    params: { lat, lng }
                })
            }),

            getSearchedFoodSuggestions: builder.query({
                query: ({lat, lng, food}) => ({
                    url: "/search-food-suggestions",
                    params: {lat, lng, food},
                })
            })
        }
    },
    
});

export default homeSearchApiSlice;
export const { useLazyGetSearchHomeDataQuery, useLazyGetSearchedFoodSuggestionsQuery } = homeSearchApiSlice;