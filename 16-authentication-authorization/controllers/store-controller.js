const Home = require("../models/home");
const Favorites = require("../models/favorite");

exports.getHome = (req, res, next) => {
  console.log("is log in?",req.session)
  Home.find()
    .then((HomeDetails) => {
      // console.log("Add home details :", HomeDetails);
      res.render("./store/index", {
        isLoggedIn : req.isLoggedIn,
        addHomeDetails: HomeDetails,
        pageTitle: "airbnb global home page",
      });
    })
    .catch((error) => {
      console.log(error, "Error on reading file");
    });
};

exports.getFavoritesList = (req, res, next) => {
  Favorites.find()
    .populate("homeId") // find all relation
    .then((favHomeList) => {
      console.log("Favorite home list ", ...favHomeList);
      const homeListArr = favHomeList.map((favHome) => favHome.homeId);
      console.log("Home", homeListArr);

      res.render("./store/favorite-list", {
        isLoggedIn : req.isLoggedIn,
        pageTitle: "Favorite list",
        favoriteHomeList: homeListArr,
      });
    });
};

exports.getBookingsList = (req, res, next) => {
  res.render("./store/booking", {
    isLoggedIn : req.isLoggedIn,
    pageTitle: "Booking list",
  });
};
exports.getPostAddFavoritesList = (req, res, next) => {
  const homeId = req.body.homeId;
  Favorites.findOne({ homeId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already marked as favourite");
      } else {
        fav = new Favorites({ homeId: homeId });
        fav.save().then((result) => {
          console.log("Fav added: ", result);
        });

        res.redirect("/favorites");
      }
    })

    .catch((err) => {
      console.log("Error while marking favorite: ", err);
    });
};

exports.deleteFromFav = (req, res, next) => {
  const homeId = req.body.homeId;
  console.log(homeId);
  Favorites.findOneAndDelete({ homeId: homeId })
    .then((result) => {
      console.log("DEleted from fav list", result);
    })
    .catch((err) => {
      console.log("error on deleting to fav list", err);
    })
    .finally(() => {
      res.redirect("/");
    });
};
// };

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home id in get home details", homeId);
  Home.findById(homeId).then((home) => {
    console.log("Home by id in get home details", home);
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-details", {
        isLoggedIn : req.isLoggedIn,
        home: home,
        pageTitle: "Home Details",
      });
    }
  });
};
