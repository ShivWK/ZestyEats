const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone:  {
        type: Number,
        unique: true,
    },

    email: {
        type: String,
        unique: true,
    },

    hashedOtp: {
        type: String,
        required: [true, "Please provide the OTP"]
    },

    createdAt: {
        type: Date,
        default: () => new Date(),
        expires: 60 * 6
    },

    expiredWhen: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000) + 60 * 5
    },

    attempts: {
        type: Number,
        max: 5,
        required: true
    },

    resendCount: {
        type: Number,
        max: 3,
        required: true
    },

    blockedUntil: Number,

    resendBlockedUntil: Number
})

const OtpModel = mongoose.model("OTP", otpSchema);

module.exports = OtpModel;