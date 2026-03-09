exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Log in page",
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res, next) => {
  console.log(req);
  req.session.isLoggedIn = true;
  res.redirect("/");
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(()=>{
    res.redirect("/")
  })
}

