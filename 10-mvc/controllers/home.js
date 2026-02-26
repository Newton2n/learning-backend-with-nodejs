const Home = require("../models/home");

exports.getHome = (req, res, next) => {
  Home.fetch((addHomeDetails) => {
    console.log("Add home details :", addHomeDetails);
    res.render("home", {
      addHomeDetails: addHomeDetails,
      pageTitle: "airbnb home page",
    });
  });
};
