exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Log in page",
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res, next) => {
  console.log(req);
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};
