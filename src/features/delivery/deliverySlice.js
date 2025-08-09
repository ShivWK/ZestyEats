import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // deliverDestinationNumber: "",
    // deliveryPinCode: null,
    // userName: "",
    // userPhone: null,
    // userCountry: "",
    // userState: "",
    // deliveryLandmark: ""
    deliveryAddress: {},
    deliveryLat: null,
    deliveryLng: null,
}

const deliverySlice = createSlice({
    name: "delivery",
    initialState: initialState,

    reducers: {
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },

        setDeliveryLat: (state, action) => {
            state.deliveryLat = action.payload;
        },

        setDeliveryLng: (state, action) => {
            state.deliveryLng = action.payload;
        }
    }
});

export const selectDeliveryAddress = (state) => state.delivery.deliveryAddress;
export const selectDeliveryLat = (state) => state.delivery.deliveryLat;
export const selectDeliveryLng = (state) => state.delivery.deliveryLng;

export const {
    setDeliveryAddress,
    setDeliveryLat,
    setDeliveryLng
} = deliverySlice.actions;

export default deliverySlice.reducer;