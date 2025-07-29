const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone: {
        type: Number,
    },

    email: {
        type: String,
    },

    for: {
        type: String,
        required: [true, "Please provide the 'for' prop value"]
    },

    hashedOtp: {
        type: String,
        required: [true, "Please provide the OTP"]
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    },
})

const OtpModel = mongoose.model("OTP", otpSchema);
module.exports = OtpModel;
