const mongoose = require("mongoose");

const deviceInfoSchema = new mongoose.Schema({
    visitorId: String,
    deviceIp: String,
    deviceModal: String,
    deviceVender: String,
    oSName: String,
    oSVersion: String,
    browserName: String,
    browserVersion: String,
    uA: String
}, { _id: false})

const sessionSchema = new mongoose.Schema({
    deviceInfo : {
        type: deviceInfoSchema,
        required: true,
    },

    type: {
        type: String,
        enum: ["guest", "registered"],
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 25
    },

    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            cartItems: {},
            itemsToBeAddedInCart: {},
            wishListedItems: {},
            favRestaurants: [],
            recentLocations: [],
        }
    },
});

const SessionModel = mongoose.model("Session" ,sessionSchema);
module.exports = SessionModel;