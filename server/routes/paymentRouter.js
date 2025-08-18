const express = require("express");
const paymentRouter = express.Router();

const { protected, checkSessionId } = require("./../controllers/userActivityControllers");

const { 
    createOnlineOrder,
    createOfflineOrder,
    getRazorpayAPIKey, 
} = require("./../controllers/paymentsController");

// pathname: /api/payments

paymentRouter.use(checkSessionId);
paymentRouter.use(protected);

paymentRouter.route("/onlineOrder").post(createOnlineOrder);
paymentRouter.route("/codOrder").post(createOfflineOrder);
paymentRouter.route("/key").get(getRazorpayAPIKey);

module.exports = paymentRouter;
