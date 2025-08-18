const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,

    items: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    deliveryAddress: {
        distance: Number,
        address: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },

    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },

    billing: {
        itemsTotal: Number,
        deliveryFee: Number,
        GST: Number,
        packaging: Number,
        platformFee: Number,
        cashHandlingFee: Number,
        discount: Number,
        coupons: [String],
        grandTotal: Number,
    },

    payment: {
        method: {
            type: String,
            enum: ["COD", "ONLINE"],
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "PENDING",
            required: true,
        },
        transactionId: String,
        provider: String,
        razorpayOrderId: String,
        razorpaySignature: String,
    },

    orderStatus: {
        type: String,
        enum: [ "PLACED", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED" ],
        default: "PLACED"
    },

 }, { timestamps: true })

const OrderModal = mongoose.model("Orders", ordersSchema);
module.exports = OrderModal;