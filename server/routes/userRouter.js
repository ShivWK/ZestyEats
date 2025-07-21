const express = require("express");
const userRouter = express.Router();
const { signup, guestSession, addGuestSessionRecentLocation } = require("./../controllers/userControllers")

// /api/user

userRouter.route("/signup").post(signup);
userRouter.route("/session").post(guestSession);
userRouter.route("/recentLocations").patch(addGuestSessionRecentLocation)

module.exports = userRouter;