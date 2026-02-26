const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  Home.fetch((addHomeDetails) => {
    console.log("Add home details :", addHomeDetails);
    res.render("./store/index", {
      addHomeDetails: addHomeDetails,
      pageTitle: "airbnb global home page",
    });
  });
};
exports.getHomeList = (req, res, next) => {
  Home.fetch((addHomeDetails) => {
    console.log("Add home details :", addHomeDetails);
    res.render("./store/home-list", {
      addHomeDetails: addHomeDetails,
      pageTitle: "airbnb home page",
    });
  });
};
exports.getFavoritesList = (req, res, next) => {
  res.render("./store/favorite-list", {
    pageTitle: "Favorite list",
  });
};
exports.getBookingsList = (req, res, next) => {
  res.render("./store/booking", {
    pageTitle: "Booking list",
  });
};
