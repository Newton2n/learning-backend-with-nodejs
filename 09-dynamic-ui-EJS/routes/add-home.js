const path = require("path");
//external
const express = require("express");

const rootDir = require("../util/path-utils");

const addHome = express.Router();

addHome.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-home.html"));
});

const addHomeDetails = [];
addHome.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-home-success.html"));
  addHomeDetails.push(req.body);
  // console.log("Home detail in add-home.js",addHomeDetails)
  
});

//  Export the router to be used in other files
exports.addHome = addHome;
exports.addHomeDetails = addHomeDetails;
