import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeApiSlice = createApi({
    reducerPath: "homeApiSlice",
    baseQuery: fetchBaseQuery({baseUrl: "https://www.swiggy.com"}),
    endpoints: function(builder) {
        return {
            getfoodieThoughts : builder.query({
                query: () => "/dapi/restaurants/list/v5?lat=18.9690247&lng=72.8205292&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
            }),
        }
    }
})

export const { useGetfoodieThoughtsQuery } = homeApiSlice;
export default homeApiSlice;

// console.log(useGetfoodieThoughtsQuery)