const Home = require("../models/home");
const Favorites = require("../models/favorite");

exports.getHome = (req, res, next) => {
  Home.find()
    .then((HomeDetails) => {
      console.log("Add home details :", HomeDetails);
      res.render("./store/index", {
        addHomeDetails: HomeDetails,
        pageTitle: "airbnb global home page",
      });
    })
    .catch((error) => {
      console.log(error, "Error on reading file");
    });
};

exports.getFavoritesList = (req, res, next) => {
  Favorites.find().then((homeListId) => {
    console.log("Favorite home list ids", ...homeListId);
    const homeIdListArr = homeListId.map((ids) => ids.homeId.toString());
    console.log("Home Id arr",homeIdListArr);
    Home.find().then((allHome) => {
      console.log(allHome);
      const favHome = allHome.filter((home) => {
        console.log(home, "HOme single list");
        return homeIdListArr.includes(home._id.toString());
      });
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
      console.log("DEleted from fav list",result);
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
        home: home,
        pageTitle: "Home Details",
      });
    }
  });
};
