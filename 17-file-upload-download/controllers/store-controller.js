const Home = require("../models/home");
const User = require("../models/user");
exports.getHome = (req, res, next) => {
  console.log("📍 getHome called at", new Date().toISOString());
  console.log("is log in?", req.session);
  console.log("User details in home routes index", req.session.user);

  const startTime = Date.now();
  Home.find()
    .then((HomeDetails) => {
      console.log(
        `✅ Home.find() completed in ${Date.now() - startTime}ms, found ${HomeDetails.length} homes`,
      );
      res.render("./store/index", {
        isLoggedIn: req.isLoggedIn,
        addHomeDetails: HomeDetails,
        pageTitle: "airbnb global home page",
        userDetails: req.session.user || {},
      });
    })
    .catch((error) => {
      console.log("❌ Error on reading file:", error);
    });
};

exports.getFavoritesList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favoriteHomes");
  console.log("user id ", userId);
  console.log("user ", user);
  res.render("./store/favorite-list", {
    isLoggedIn: req.isLoggedIn,
    pageTitle: "Favorite list",
    favoriteHomeList: user.favoriteHomes,
    userDetails: req.session.user,
  });
};

exports.getBookingsList = (req, res, next) => {
  res.render("./store/booking", {
    isLoggedIn: req.isLoggedIn,
    pageTitle: "Booking list",

    userDetails: req.session.user,
  });
};
exports.getPostAddFavoritesList = async (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const userDetails = await User.findById(userId);
  if (!userDetails.favoriteHomes.includes(homeId)) {
    userDetails.favoriteHomes.push(homeId);
    await userDetails.save();
  }

  res.redirect("/favorites");
};

exports.deleteFromFav = async (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;

  const userDetails = await User.findById(userId);
  if (userDetails.favoriteHomes.includes(homeId)) {
    userDetails.favoriteHomes.filter((fav) => fav !== homeId);
    await userDetails.save();
  }
  res.redirect("/");
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
        isLoggedIn: req.isLoggedIn,
        home: home,
        pageTitle: "Home Details",

        userDetails: req.session.user,
      });
    }
  });
};
