const path = require("path");
//external
const express = require("express");

const rootDir = require("../util/path-utils")

const globalRouter = express.Router();

globalRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "global.html"));
});

//  Export the router to be used in other files
module.exports = globalRouter;
