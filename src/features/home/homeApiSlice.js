import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeApiSlice = createApi({
    reducerPath: "homeFirestoreApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api"}),
    keepUnusedDataFor: 60,

    endpoints : builder => ({
        getfoodieThoughts : builder.query({
            query: () => '/swiggy-restaurants',

            transformResponse : (response) => {
                const cards = response?.data?.cards?.find(
                   item => item?.card?.card?.header?.title === "What's on your mind?"
                ) ;

                return cards?.card?.card?.imageGridCards?.info || [];
            }
        }),
        
        
    })
})

export const { useGetfoodieThoughtsQuery } = homeApiSlice;
export default homeApiSlice;

// https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=21.99740&lng=79.00110&carousel=true&third_party_vendor=1 // Home API

//https://media-assets.swiggy.com/swiggy/image/upload/{imageId} this url is required to fetch the images


// https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=26.8496217&lng=81.0072193&carousel=true&third_party_vendor=1