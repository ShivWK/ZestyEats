const express = require("express");
const paymentRouter = express.Router();

const { protected, checkSessionId } = require("./../controllers/userActivityControllers");

const {
    createOnlineOrder,
    getRazorpayAPIKey,
    verifyPayment,
    placeOrder
} = require("./../controllers/paymentsController");

paymentRouter.use(checkSessionId);
paymentRouter.use(protected);

paymentRouter.route("/onlineOrder").post(createOnlineOrder);
paymentRouter.route("/order").post(placeOrder);
paymentRouter.route("/key").get(getRazorpayAPIKey);
paymentRouter.route("/paymentVerification").post(verifyPayment);

module.exports = paymentRouter;
