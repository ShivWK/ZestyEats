const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone: Number,

    email: String,

    hashedOtp: String,

    createdAt: {
        type: Date,
        default: () => new Date(),
    },

    expiredWhen: {
        type: Number,
        default: Math.round(Date.now() / 1000) + 60 * 5
    },

    attempts: {
        type: Number,
        max: 5
    },

    resendCount: {
        type: Number,
        max: 3
    },

    blockedUntil: Number,

    resendBlockedUntil: Number
})

otpSchema.index({ createdAt: 10 }, { expireAfterSeconds: 60 * 5 })

const OtpModel = mongoose.model("OTP", otpSchema);

exports.default = OtpModel;