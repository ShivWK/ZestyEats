const mongoose = require("mongoose");

const blockedSchema = new mongoose.Schema({
    value: Boolean,
    blockedAt: {
        type: Date,
        default: () => new Date()
    }
}, { _id: false });

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
        expires: 60 * 6
    },

    attempts: {
        type: Number,
        max: 5,
        default: 0
    },

    resendCount: {
        type: Number,
        max: 3,
        default: 0
    },

    blockedUntil: blockedSchema,
    resendBlockedUntil: blockedSchema,
})

const OtpModel = mongoose.model("OTP", otpSchema);
module.exports = OtpModel;
