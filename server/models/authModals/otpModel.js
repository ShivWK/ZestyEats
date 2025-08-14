const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    visiterId: String,
    
    phone: {
        type: Number,
    },

    email: {
        type: String,
    },

    for: {
        type: String,
        enum: ["signup", "login", "delete", "email verify", "phone verify"],
        required: true,
    },

    hashedOtp: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    },
})

const OtpModel = mongoose.model("OTP", otpSchema);
module.exports = OtpModel;
