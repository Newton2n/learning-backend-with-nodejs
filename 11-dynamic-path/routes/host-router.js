//external
const express = require("express");

const {
  getUser,
  getAdmin,
  getAddHome,
  postHome,
  getHostHome,
  getEditHome,
  postEditHome
} = require("../controllers/host-controller");

const hostRouter = express.Router();

hostRouter.get("/user", getUser);

hostRouter.get("/admin", getAdmin);

hostRouter.get("/host-home-list", getHostHome);
hostRouter.post("/add-home", postHome);
hostRouter.get("/add-home", getAddHome);
hostRouter.get("/edit-home/:homeId", getEditHome);
hostRouter.post("/edit-home/:homeId", postEditHome);

module.exports = hostRouter;
