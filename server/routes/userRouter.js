const express = require("express");
const userRouter = express.Router();
const { signup } = require("./../controllers/userControllers")

userRouter.route("/signup").post(signup)

module.exports = userRouter;