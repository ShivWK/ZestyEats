import { createSelector, createSlice } from "@reduxjs/toolkit"

const initialState = {
    deliveryAddress: {},
    savedAddress: [],
    deliveryLat: null,
    deliveryLng: null,
    editAddressModal: false,
    hideEditAddressModal: true,
    addressLoading: false,
    addAddressModal: false,
    paymentMethod: "",
    isDeliverable: false,
    totalItemsCost: "",
    deliveryCharge: 0,
    lastDeliveryCharge: 0,
    deliveryKilometers: 0,
    payableAmount: "",
    GSTAndOtherCharges: "",
    isPaymentChanged: false,
}

const deliverySlice = createSlice({
    name: "delivery",
    initialState: initialState,

    reducers: {
        setDeliveryAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },

        setIsDeliverable: (state, action) => {
            state.isDeliverable = action.payload;
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

            if (action.payload === "COD") {
                state.payableAmount += 10;
                state.isPaymentChanged = true;
            } else {
                if (state.isPaymentChanged) {
                    state.payableAmount -= 10;
                    state.isPaymentChanged = false;
                }
            }
        },

        setItemsTotalCost: (state, action) => {
            state.totalItemsCost = action.payload;
        },

        setGSTAndOtherCharges: (state, action) => {
            state.GSTAndOtherCharges = action.payload;
        },

        setDeliveryCharge: (state, action) => {
            const distance = action.payload;
            state.deliveryKilometers = distance;

            const deliveryCharge = 10 + Math.max(0, Math.floor(distance - 1)) * 5;
            state.deliveryCharge = deliveryCharge;
            
            if (state.lastDeliveryCharge) {
                state.payableAmount -= state.lastDeliveryCharge;
            }
            state.payableAmount += deliveryCharge;
            state.lastDeliveryCharge = deliveryCharge;
        },

        setPayableAmount: (state, action) => {
            const mode = action.payload.mode;

            if (mode === "initial") {
                state.payableAmount = action.payload.cost;
            } else {
                state.payableAmount += action.payload.cost;
            }
        },
    }
});

export const selectDeliveryAddress = (state) => state.delivery.deliveryAddress;
export const selectIsDeliverable = (state) => state.delivery.isDeliverable;
export const selectSavedAddress = (state) => state.delivery.savedAddress;
export const selectAddressLoading = (state) => state.delivery.addressLoading;
export const selectDeliveryLat = (state) => state.delivery.deliveryLat;
export const selectDeliveryLng = (state) => state.delivery.deliveryLng;
export const selectEditAddressModal = (state) => state.delivery.editAddressModal;
export const selectHideEditAddressModal = (state) => state.delivery.hideEditAddressModal;
export const selectAddAddressModal = (state) => state.delivery.addAddressModal;
export const selectPaymentMethod = (state) => state.delivery.paymentMethod;
export const selectFinalBilling = createSelector(
    [
        state => state.delivery.totalItemsCost,
        state => state.delivery.deliveryCharge,
        state => state.delivery.deliveryKilometers,
        state => state.delivery.GSTAndOtherCharges,
        state => state.delivery.payableAmount,
    ],
    (
        totalItemCost,
        deliveryCharge,
        deliveryKilometers,
        GSTAndOtherCharges,
        payableAmount
    ) => ({
        totalItemCost,
        deliveryCharge,
        deliveryKilometers,
        GSTAndOtherCharges,
        payableAmount
    }))

export const {
    setDeliveryAddress,
    setIsDeliverable,
    setSavedAddress,
    setAddressLoading,
    setEditAddressModal,
    setHideEditAddressModal,
    setDeliveryLat,
    setDeliveryLng,
    setAddAddressModal,
    setPaymentMethod,
    setItemsTotalCost,
    setDeliveryCharge,
    setGSTAndOtherCharges,
    setPayableAmount
} = deliverySlice.actions;

export default deliverySlice.reducer;