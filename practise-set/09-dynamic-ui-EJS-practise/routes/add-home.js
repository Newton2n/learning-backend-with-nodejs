const path = require("path");
//external
const express = require("express");

const rootDir = require("../util/path-utils");

const addHome = express.Router();

addHome.get("/add-home", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-home.html"));
  res.render("add-home", { pageTitle: "airbnb | Add-home" });
});

const addHomeDetails = [];
addHome.post("/add-home", (req, res, next) => {
  res.render("add-home-success", { pageTitle: "airbnb | Home successful" });

  addHomeDetails.push(req.body);
});

//  Export the router to be used in other files
exports.addHome = addHome;
exports.addHomeDetails = addHomeDetails;
