//external
const express = require("express");

//local
const { getHome } = require("../controllers/home");

const home = express.Router();

home.get("/", getHome);

//  Export the router to be used in other files
module.exports = home;
