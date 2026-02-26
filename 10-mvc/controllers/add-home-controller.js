const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "add-home.html"));
  res.render("add-home", { pageTitle: "airbnb | Add-home" });
};

exports.postHome = (req, res, next) => {
  res.render("add-home-success", { pageTitle: "airbnb | Home successful" });

  //   addHomeDetails.push(req.body);
  const { title, category, address, price } = req.body;

  const home = new Home(title, category, address, price);
  home.save();
};
