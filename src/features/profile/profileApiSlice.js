import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const profileApiSlice = createApi({
    reducerPath: "profile",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api/userActivity`,
        prepareHeaders: (headers) => {
            headers.set("x-identifier" , import.meta.env.VITE_HASHED_IDENTIFIER)
            headers.set("Content-Type", "application/json")
            headers.set("x-user-agent", navigator.userAgent)

            return headers;
        },

        credentials: "include"
    }),
    
    endpoints: (builder) => ({
        getAddress: builder.query({
            query: ({ deviceId }) => ({
                url: "/userAddress",
                method: "GET",
                headers: {
                    "x-device-id": deviceId,
                }
            })
        }),

        getPaymentMethods: builder.query({
            query: ({ deviceId }) => ({
                url : "/userPaymentMethods",
                method: "GET",
                headers: {
                    "x-device-id": deviceId,
                }
            })
        }),

        getLoggedInSessions: builder.query({
            query: ({ deviceId }) => ({
                url: "/loggedInSession",
                method: "GET",
                headers: {
                    "x-device-id": deviceId,
                }
            })
        })
    })
})

export default profileApiSlice;