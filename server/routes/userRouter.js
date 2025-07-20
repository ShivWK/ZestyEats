const express = require("express");
const userRouter = express.Router();
const { signup, guestSession } = require("./../controllers/userControllers")

// /api/user

userRouter.route("/signup").post(signup);
userRouter.route("/session").post(guestSession);

module.exports = userRouter;