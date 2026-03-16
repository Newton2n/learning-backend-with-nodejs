//core modules
const path = require("path");

//external modules
const express = require("express");
const { default: mongoose } = require("mongoose");

const DB_PATH =
  "mongodb+srv://newton:newton@airbnb.cidzwvf.mongodb.net/todo?appName=airbnb";

const app = express();

//local modules
const rootDir = require("./util/path-utils");
const { notFound } = require("./controllers/notFound");

app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, "public")));

app.use(notFound); //not found page

const PORT = 3004;

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
