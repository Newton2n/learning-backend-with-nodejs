//core modules
const path = require("path");

//external modules
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const DB_PATH =
  "mongodb+srv://newton:newton@airbnb.cidzwvf.mongodb.net/todo?appName=airbnb";

const app = express();

//local modules
const { notFound } = require("./controllers/notFound");
const todo = require("./routes/todo-router");

app.use(express.urlencoded());

app.use(cors());
app.use(express.json());
app.use("/api/todo", todo);
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
