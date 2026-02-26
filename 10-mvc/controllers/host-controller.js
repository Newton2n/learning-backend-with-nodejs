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

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-home.html"));
  res.render("./host/add-home", { pageTitle: "airbnb | Add-home" });
};

exports.postHome = (req, res, next) => {
  res.render("./host/add-home-success", {
    pageTitle: "airbnb | Home successful",
  });

  //   addHomeDetails.push(req.body);
  const { title, category, address, price } = req.body;

  const home = new Home(title, category, address, price);
  home.save();
};

exports.getHostHome = (req, res, next) => {
  Home.fetch((addHomeDetails) => {
    res.render("./host/host-home-list", {
      addHomeDetails: addHomeDetails,
      pageTitle: "Host home page",
    });
  });
};
