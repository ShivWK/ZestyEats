const express = require("express");
const paymentRouter = express.Router();

const { protected, checkSessionId } = require("./../controllers/userActivityControllers");
const { 
    createOrder,
    getRazorpayAPIKey, 
} = require("./../controllers/paymentsController");

// pathname: /api/payments

paymentRouter.use(checkSessionId);
paymentRouter.use(protected);

paymentRouter.route("/order").post(createOrder);
paymentRouter.route("/key").get(getRazorpayAPIKey);


module.exports = paymentRouter;
