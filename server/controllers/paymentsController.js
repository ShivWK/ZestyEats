const instance = require("./../index");
const OrdersModel = require("./../models/ordersModel");

exports.createOnlineOrder = async (req, res, next) => {
    try {
        const amountToPay = +req.body.amount;

        if (!amountToPay || amountToPay <= 0) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide the valid amount."
            })
        }

        const options = {
            amount: Math.round(amountToPay * 100),
            currency: "INR",
            receipt: `order_rcpt_${Date.now()}`
        }

        const order = await instance.orders.create(options)

        return res.status(200).json({
            status: "success",
            order
        })
    } catch (err) {
        console.log("Error in creating razorpay order", err);

        return res.status(500).json({
            status: "error",
            message: "Internal server error. Try after some time."
        })
    }
}

exports.getRazorpayAPIKey = (req, res, next) => {
    res.status(200).json({
        status: "success",
        key: process.env.RAZORPAY_TEST_API_KEY,
    })
}


exports.createOfflineOrder = async (req, res, next) => {
    const userId = req.UserID;
    const body = req.body;

    const items = body.items;
    const address = body.deliveryAddress;
    const distance = body.distance;
    const billing = body.billing;

    const payment = body.payment;
    const orderStatus = body.orderStatus;

    console.log(items, address, billing, payment, orderStatus);

    if ( !items || !address || !billing || !payment || !orderStatus ) {
        return res.status(400).json({
            status: "failed",
            message: "Please provide valid data"
        })
    }

    try {
        const order = await OrdersModel.create({
            userId,
            items,
            deliveryAddress: {
                distance,
                address
            },
            billing,
            payment,
            orderStatus,
        });

        return req.status(200).json({
            status: "success",
            message: "Order placed",
            data: order._id
        })
    } catch (err) {
        console.log("Error in placing order", err);

        req.status(500).json({
            status: "error",
            message: "Internal server error."
        })
    }
}