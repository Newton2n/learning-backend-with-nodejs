//core modules
const path = require("path");

//external modules
const express = require("express");
const { default: mongoose } = require("mongoose");

//local modules
const rootDir = require("./util/path-utils");
const { notFound } = require("./controllers/notFound");
const hostRouter = require("./routes/host-router");
const store = require("./routes/store-router");
const auth = require("./routes/auth-router");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(rootDir, "public")));

app.use(auth); //home page
app.use((req, res, next) => {
  req.isLoggedIn = req.get("cookie")?.split("=")[1] || false;
  console.log("IN main auth middleware",req.isLoggedIn)
  next();
});

app.use(hostRouter); //home page
app.use(store); //user page
app.use(notFound); //not found page

const PORT = 3000;
const DB_PATH =
  "mongodb+srv://newton:newton@airbnb.cidzwvf.mongodb.net/airbnb?appName=airbnb";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
