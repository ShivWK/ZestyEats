import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchApiSlice = createApi({
     reducerPath: "search",
     baseQuery: fetchBaseQuery({ baseUrl: "https://swiggy-clone-klzu.onrender.com/api/swiggy"}),
     endpoints: builder => ({
        getSearchHomeData: builder.query({
            query: ({lat, lng}) => ({
                url: "/search-Home-Data",
                params: {lat, lng}
            })
        })
     })
});

export default searchApiSlice;
export const { useLazyGetSearchHomeDataQuery } = searchApiSlice;