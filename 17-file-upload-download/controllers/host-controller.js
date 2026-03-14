const Home = require("../models/home");

exports.postHome = (req, res, next) => {
  //   addHomeDetails.push(req.body);
  const { title, category, address, price, description, img, rating } =
    req.body;
  console.log(req.body);
  const home = new Home({
    title,
    category,
    address,
    price,
    description,
    img,
    rating,
  });
  home.save().then(() => {
    console.log("home save successfully");
  });
  res.render("./host/add-home-success", {
    pageTitle: "airbnb | Home successful",
    edit: false,
    isLoggedIn :req.session.isLoggedIn,
    userDetails:{}
  });
};

exports.getHostHome = (req, res, next) => {
  Home.find()
    .then((homeDetails) => {
      console.log("host home list :", homeDetails);
      res.render("./host/host-home-list", {
        addHomeDetails: homeDetails,
        pageTitle: "Host home page",
        isLoggedIn: req.isLoggedIn,

        userDetails: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAddHome = (req, res, next) => {
  res.render("./host/edit-home", {
    pageTitle: "airbnb | Add-home",
    isLoggedIn: req.isLoggedIn,
    state: false,

    userDetails: req.session.user,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home id in host get edit home", homeId);
  const state = req.query.editing === "true";
  console.log(state);
  Home.findById(homeId).then((homeDetails) => {
    if (!homeId && !state) {
      console.log("Home is not found ");
      return res.redirect("/home-home-list");
    } else {
      // console.log("Home details in edit home path", homeDetails);
      res.render("./host/edit-home", {
        state: state,
        homeDetails: homeDetails,
        isLoggedIn: req.isLoggedIn,
        pageTitle: "Edit home page",

        userDetails: req.session.user,
      });
    }
  });
};
exports.postEditHome = (req, res, next) => {
  const _id = req.params.homeId;
  console.log("post edit home", _id);
  const { title, category, address, price, description, imgUrl, rating } =
    req.body;
  Home.findById(_id)
    .then((home) => {
      home.title = title;
      home.category = category;
      home.address = address;
      home.price = price;
      home.description = description;
      home.imgUrl = imgUrl;
      home.rating = rating;
      home
        .save()
        .then((res) => {
          console.log("home is edited", res);
        })
        .catch((err) => {
          console.log("error when updating home", err);
        });
    })
    .catch((err) => {
      console.log("error when finding home", err);
    });
  res.redirect("/");
  // home._id = updateHomeId;
};
exports.postDeleteHome = (req, res, next) => {
  const { homeId } = req.body;
  console.log(homeId);
  Home.findByIdAndDelete(homeId).then(() => {
    return res.redirect("/host-home-list");
  });
};
