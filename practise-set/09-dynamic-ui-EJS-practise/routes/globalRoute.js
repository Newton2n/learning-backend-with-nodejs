const path = require("path");
//external
const express = require("express");

const rootDir = require("../util/path-utils");
const { addHomeDetails } = require("./add-home");

const globalRouter = express.Router();

globalRouter.get("/", (req, res, next) => {
  console.log("Add home details :", addHomeDetails);

  res.render("global", {
    addHomeDetails: addHomeDetails,
    pageTitle: "airbnb home page",
  });

  // res.sendFile(path.join(rootDir, "views", "global.html"));
});

//  Export the router to be used in other files
module.exports = globalRouter;
