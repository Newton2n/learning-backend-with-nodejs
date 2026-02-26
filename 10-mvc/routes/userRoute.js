
//external
const express = require("express");

const { getUser } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/user", getUser);

//  Export the router to be used in other files
module.exports = userRouter;
