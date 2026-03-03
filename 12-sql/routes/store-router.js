//external
const express = require("express");

//local
const {
  getHomeList,
  getHome,
  getFavoritesList,
  getBookingsList,
  getHomeDetails,
  getPostAddFavoritesList,
} = require("../controllers/store-controller");

const home = express.Router();

home.get("/", getHome);
home.get("/home-list", getHomeList);
home.get("/favorites", getFavoritesList);
home.post("/favorites", getPostAddFavoritesList);
home.get("/bookings", getBookingsList);
home.get("/home-details/:homeId", getHomeDetails);

//  Export the router to be used in other files
module.exports = home;
