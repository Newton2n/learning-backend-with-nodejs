const path = require("path");
//external
const express = require("express");

const rootDir = require("../util/path-utils");

const adminRouter = express.Router();

adminRouter.get("/admin", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "admin.html"));
});

//  Export the router to be used in other files
module.exports = adminRouter;
