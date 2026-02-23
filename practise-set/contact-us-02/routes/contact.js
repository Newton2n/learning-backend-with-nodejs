const path = require("path");

const express = require("express");

const rootDir = require("../utils/root-dir");
const contactRouter = express.Router();

contactRouter.get("/contact-page", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact-page.html"));
});

contactRouter.post("/contact-page", (req, res, next) => {
  console.log("contact result :",req.body);
  res.sendFile(path.join(rootDir, "views", "contact-page-result.html"));
});
module.exports = contactRouter;
