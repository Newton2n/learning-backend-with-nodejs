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
  const { title, category, address, price, description, imgUrl, rating } =
    req.body;
  console.log(
    "title:",
    title,
    "category:",
    category,
    "address:",
    address,
    "price:",
    price,
    "description:",
    description,
    "imgUrl:",
    imgUrl,
    "Rating",
    rating,
  );
  console.log(req.body);
  const home = new Home(
    title,
    category,
    address,
    price,
    description,
    imgUrl,
    rating,
  );
  home.save().then(() => {
    console.log("home save successfully");
  });
  res.render("./host/add-home-success", {
    pageTitle: "airbnb | Home successful",
    edit: false,
  });
};

exports.getHostHome = (req, res, next) => {
  Home.fetch()
    .then((homeDetails) => {
      console.log("host home list :", homeDetails);
      res.render("./host/host-home-list", {
        addHomeDetails: homeDetails,
        pageTitle: "Host home page",
      });
    })
    .catch((err) => {
      console.log(err);
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
        pageTitle: "Edit home page",
      });
    }
  });
};
exports.postEditHome = (req, res, next) => {
  const _id = req.params.homeId;
  console.log("post edit home",_id)
  const { title, category, address, price, description, imgUrl, rating } =
    req.body;
  const home = new Home(
    title,
    category,
    address,
    price,
    description,
    imgUrl,
    rating,
    _id,
  );
  // home._id = updateHomeId;
  home.save();
  res.redirect("/");
};
exports.postDeleteHome = (req, res, next) => {
  const { homeId } = req.body;
  console.log(homeId);
  Home.deleteHome(homeId).then(() => {
    return res.redirect("/host-home-list");
  });
};
