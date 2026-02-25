const path = require("path");
//external
const express = require("express");


const rootDir = require("../util/path-utils")

const userRouter = express.Router();

userRouter.get("/user", (req, res, next) => {
  res.render('user',{
    pageTitle:"airbnb | User"
  });
});

//  Export the router to be used in other files
module.exports = userRouter;
