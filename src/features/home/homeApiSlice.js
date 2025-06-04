import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeApiSlice = createApi({
  reducerPath: "homeFirestoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://swiggy-clone-klzu.onrender.com/api",
  }),
  keepUnusedDataFor: 60,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getHomePageData: builder.query({
      query: ({ lat, lng }) => ({
        url: "/swiggy-restaurants",
        params: { lat, lng },
      }),
    }),
  }),
});

export const { useGetHomePageDataQuery, useLazyGetHomePageDataQuery } =
  homeApiSlice;
export default homeApiSlice;

// https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=21.99740&lng=79.00110&carousel=true&third_party_vendor=1 // Home API

//https://media-assets.swiggy.com/swiggy/image/upload/{imageId} this url is required to fetch the images

// https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=26.8496217&lng=81.0072193&carousel=true&third_party_vendor=1

// <img class="sc-bXCLTC jRHowI" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/3/24/cf070431-66f9-46d7-8a1e-8b8a6fa77412_226044.jpg" alt="Burger King">

// https://media-assets.swiggy.com/swiggy/image/upload/RX_THUMBNAIL/IMAGES/VENDOR/2024/9/26/0c0ae244-e26d-483f-ba69-c4d2e6f83930_327277 (1).jpg // URL for top restrorents cards

//  https://swiggy-clone-klzu.onrender.com/api/swiggy-restaurants // URL for home page data
