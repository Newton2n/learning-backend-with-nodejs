//external
const express = require("express");

const {
  getAddHome,
  postHome,
  getHostHome,
  getEditHome,
  postEditHome,
  postDeleteHome
} = require("../controllers/host-controller");

const hostRouter = express.Router();



hostRouter.get("/host-home-list", getHostHome);
hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postHome);
hostRouter.get("/edit-home/:homeId", getEditHome);
hostRouter.post("/edit-home/:homeId", postEditHome);
hostRouter.post("/delete-home", postDeleteHome);


module.exports = hostRouter;
