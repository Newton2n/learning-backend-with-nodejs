const Home = require("../models/home");
const Favorites = require("../models/favorite");

exports.getHome = (req, res, next) => {
  Home.fetch(HomeDetails => {
    // console.log("Add home details :", addHomeDetails);
    res.render("./store/index", {
      addHomeDetails:HomeDetails,
      pageTitle: "airbnb global home page",
    });
  });
};
exports.getHomeList = (req, res, next) => {
  Home.fetch((addHomeDetails) => {
    res.render("./store/home-list", {
      addHomeDetails: addHomeDetails,
      pageTitle: "airbnb home page",
    });
  });
};
exports.getFavoritesList = (req, res, next) => {
  Favorites.getFav((homeListId) => {
    Home.fetch((allHome) => {
      const favHome = allHome.filter((home) => homeListId.includes(home.id));
      console.log(favHome);
      res.render("./store/favorite-list", {
        pageTitle: "Favorite list",
        favoriteHomeList: favHome,
      });
    });
  });
  
};
exports.getBookingsList = (req, res, next) => {
  res.render("./store/booking", {
    pageTitle: "Booking list",
  });
};
exports.getPostAddFavoritesList = (req, res, next) => {
  // console.log("Favorite home list :", req.body.homeId);
  // Favorites.addToFav(req.body.homeId, (result) => {
  //   console.log(result);
  //   res.redirect("/favorites");
  // });
  Favorites.addToFav(req.body.homeId, (error) => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favorites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        home: home,
        pageTitle: "Home Details",
      });
    }
  });
};
