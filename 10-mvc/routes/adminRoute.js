//external
const express = require("express");

//local
const { getAdmin } = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.get("/admin",getAdmin);

//  Export the router to be used in other files
module.exports = adminRouter;
