//external
const express = require("express");

//local
const {
  getHome,
  getFavoritesList,
  getBookingsList,
  getHomeDetails,
  getPostAddFavoritesList,
  deleteFromFav
} = require("../controllers/store-controller");

const home = express.Router();

home.get("/", getHome);
home.get("/home-list", getHome);
home.get("/favorites", getFavoritesList);
home.post("/favorites", getPostAddFavoritesList);
home.get("/bookings", getBookingsList);
home.get("/home-details/:homeId", getHomeDetails);
home.post("/delete-favorite", deleteFromFav);

//  Export the router to be used in other files
module.exports = home;
