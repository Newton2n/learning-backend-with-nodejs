exports.getAdmin = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "admin.html"));
  res.render("./admin", {
    pageTitle: "airbnb | Admin",
  });
};
