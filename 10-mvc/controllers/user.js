exports.getUser = (req, res, next) => {
  res.render("user", {
    pageTitle: "airbnb | User",
  });
};
