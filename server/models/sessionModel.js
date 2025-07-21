const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
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
        type: "number",
        default: Math.round(Date.now() / 1000) + 60 * 60 * 24,
    }
});

const SessionModel = mongoose.model("SessionModel" ,sessionSchema);

module.exports = SessionModel;