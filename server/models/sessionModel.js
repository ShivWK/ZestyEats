const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, "Please provide device information."]
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

const SessionModel = mongoose.model("GuestSession" ,sessionSchema);

module.exports = SessionModel;