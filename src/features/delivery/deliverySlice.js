import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    savedAddress: [],
    deliveryLat: null,
    deliveryLng: null,
    editAddressModal : false,
    hideEditAddressModal: true,
    addressLoading: false
}

const deliverySlice = createSlice({
    name: "delivery",
    initialState: initialState,

    reducers: {
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
        }
    }
});

export const selectSavedAddress = (state) => state.delivery.savedAddress;
export const selectAddressLoading = (state) => state.delivery.addressLoading;
export const selectDeliveryLat = (state) => state.delivery.deliveryLat;
export const selectDeliveryLng = (state) => state.delivery.deliveryLng;
export const selectEditAddressModal = (state) => state.delivery.editAddressModal;
export const selectHideEditAddressModal = (state) => state.delivery.hideEditAddressModal;

export const {
    setSavedAddress,
    setAddressLoading,
    setEditAddressModal,
    setHideEditAddressModal,
    setDeliveryLat,
    setDeliveryLng,
} = deliverySlice.actions;

export default deliverySlice.reducer;