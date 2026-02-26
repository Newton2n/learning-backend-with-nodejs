//external
const express = require("express");

const {
  getUser,
  getAdmin,
  getAddHome,
  postHome,
  getHostHome
} = require("../controllers/host-controller");

const hostRouter = express.Router();

hostRouter.get("/user", getUser);

hostRouter.get("/admin", getAdmin);

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home", postHome);

hostRouter.get("/host-home-list", getHostHome);

module.exports = hostRouter;
