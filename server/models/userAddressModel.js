const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,

    country: {
        type: String,
        require: true
    },
    
    userName: {
        type: String,
        require: true
    },

    userPhone: {
        type: Number,
        require: true
    },

    flatNumber: {
        type: String,
        require: true
    },

    landmark: String,

    pinCode: {
        type: Number,
        require: true
    },

    state: {
        type: String,
        require: true
    },
})

const AddressModel = mongoose.model("Address", addressSchema);

module.exports = AddressModel;