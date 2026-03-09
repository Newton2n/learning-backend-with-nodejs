//core modules
const path = require("path");

//external modules
const express = require("express");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);

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

const DB_PATH =
  "mongodb+srv://newton:newton@airbnb.cidzwvf.mongodb.net/airbnb?appName=airbnb";

const dbStore = new mongodbSession({
  uri: DB_PATH,
  collection: "session",
});



app.use(
  session({
    secret: "Newton96",
    resave: false,
    saveUninitialized: true,
    store: dbStore,
  }),
);

app.use(auth); //home page
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(hostRouter); //home page
app.use(store); //user page
app.use(notFound); //not found page

const PORT = 3000;

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
