import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    deliveryAddress: {},
    savedAddress: [],
    deliveryLat: null,
    deliveryLng: null,
    editAddressModal : false,
    hideEditAddressModal: true,
    addressLoading: false,
    addAddressModal: false,
    paymentMethod: "",
}

const deliverySlice = createSlice({
    name: "delivery",
    initialState: initialState,

    reducers: {
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },

        setSavedAddress: (state, action) => {
            state.savedAddress = action.payload;
        },

        setAddressLoading: (state, action) => {
            state.addressLoading = action.payload;
        },

        setDeliveryLat: (state, action) => {
            state.deliveryLat = action.payload;
        },

        setDeliveryLng: (state, action) => {
            state.deliveryLng = action.payload;
        },

        setEditAddressModal: (state, action) => {
            state.editAddressModal = action.payload;
        },

        setHideEditAddressModal: (state, action) => {
            state.hideEditAddressModal = action.payload;
        },

        setAddAddressModal: (state, action) => {
            state.addAddressModal = action.payload;
        },

        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        }
    }
});

export const selectDeliveryAddress = (state) => state.delivery.deliveryAddress;
export const selectSavedAddress = (state) => state.delivery.savedAddress;
export const selectAddressLoading = (state) => state.delivery.addressLoading;
export const selectDeliveryLat = (state) => state.delivery.deliveryLat;
export const selectDeliveryLng = (state) => state.delivery.deliveryLng;
export const selectEditAddressModal = (state) => state.delivery.editAddressModal;
export const selectHideEditAddressModal = (state) => state.delivery.hideEditAddressModal;
export const selectAddAddressModal = (state) => state.delivery.addAddressModal;
export const selectPaymentMethod = (state) => state.delivery.paymentMethod;

export const {
    setDeliveryAddress,
    setSavedAddress,
    setAddressLoading,
    setEditAddressModal,
    setHideEditAddressModal,
    setDeliveryLat,
    setDeliveryLng,
    setAddAddressModal,
    setPaymentMethod,
} = deliverySlice.actions;

export default deliverySlice.reducer;