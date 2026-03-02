exports.getUser = (req, res, next) => {
  res.render("./host/user", {
    pageTitle: "airbnb | User",
  });
};
exports.getAdmin = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "admin.html"));
  res.render("./host/admin", {
    pageTitle: "airbnb | Admin",
  });
};
const Home = require("../models/home");

exports.postHome = (req, res, next) => {
  //   addHomeDetails.push(req.body);
  const { title, category, address, price } = req.body;

  const home = new Home(title, category, address, price);
  home.save();
  res.render("./host/add-home-success", {
    pageTitle: "airbnb | Home successful",
    edit: false,
  });
};

exports.getHostHome = (req, res, next) => {
  Home.fetch((addHomeDetails) => {
    res.render("./host/host-home-list", {
      addHomeDetails: addHomeDetails,
      pageTitle: "Host home page",
    });
  });
};
exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-home.html"));
  res.render("./host/edit-home", {
    pageTitle: "airbnb | Add-home",
    state: false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const state = req.query.editing === "true";
  console.log(state);
  Home.findById(homeId, (homeDetails) => {
    if (!homeId && !state) {
      console.log("Home is not found ");
      return res.redirect("/home-home-list");
    } else {
      // console.log("Home details in edit home path", homeDetails);
      res.render("./host/edit-home", {
        state: state,
        homeDetails: homeDetails,
        pageTitle: "Edit home page",
      });
    }
  });
};
exports.postEditHome = (req, res, next) => {
  const updateHomeId = req.params.homeId;
  const { title, category, address, price } = req.body;
  const home = new Home(title, category, address, price);
  home.id = updateHomeId;
  home.save();
  res.redirect("/");
};
exports.postDeleteHome = (req, res, next) => {
  const { homeId } = req.body;
  console.log(homeId);
  Home.deleteHome(homeId, (leftHome) => {
    console.log(leftHome);
     res.redirect("/host-home-list")
  });
};
