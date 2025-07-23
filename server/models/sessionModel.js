const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: [true, "Please provide device information."]
    },

    createdAt: {
        type: Date,
        default: () => new Date(),
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

    expires: {
        type: Number,
        default: Math.round(Date.now() / 1000) + 60 * 60 * 24,
    }
});

const SessionModel = mongoose.model("GuestSession" ,sessionSchema);

sessionSchema.index({createdAt: 1}, { expireAfterSeconds: 60 * 60 * 24 })

module.exports = SessionModel;