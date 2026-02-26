//external
const express = require("express");

//local
const { getHomeList ,getHome ,getFavoritesList,getBookingsList } = require("../controllers/store-controller");

const home = express.Router();

home.get("/", getHome);
home.get("/home-list", getHomeList);
home.get("/favorites", getFavoritesList);
home.get("/bookings", getBookingsList);

//  Export the router to be used in other files
module.exports = home;
