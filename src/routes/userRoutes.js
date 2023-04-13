const express = require("express");
const { signin, signup } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/signin", signin);

userRouter.post("/signup", signup);

module.exports = userRouter; // used to export routes otherwise userRoute cannot be accessable by another file

