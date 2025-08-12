const instance = require("./../index");

exports.createOrder = async (req, res, next) => {
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
