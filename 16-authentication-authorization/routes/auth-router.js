//external
const express = require("express");

//local
const { getLogin ,postLogin,postLogout,getSignup,postSignup} = require("../controllers/auth-controller");

const auth = express.Router();

auth.get("/login", getLogin);
auth.post("/login", postLogin);
auth.get("/signup", getSignup);
auth.post("/signup", postSignup);
auth.post("/logout", postLogout);

//  Export the router to be used in other files
module.exports = auth;
