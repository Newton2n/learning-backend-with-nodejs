
//external
const express = require("express");

//local
const homeController = require("../controllers/add-home-controller");
const addHome = express.Router();

addHome.get("/add-home", homeController.getAddHome);

addHome.post("/add-home",homeController.postHome);

//  Export the router to be used in other files
exports.addHome = addHome;
// exports.addHomeDetails = addHomeDetails;
