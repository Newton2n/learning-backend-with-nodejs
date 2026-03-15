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
const multer = require("multer");

const randomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/home-details/uploads", express.static(path.join(rootDir, "uploads")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(12) + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  console.log("File details in file filter ", file, file.mimetype);
  if (["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
    console.log("YEs file verified ");
    cb(null, true);
  } else {
    console.log("No  file not verified ");
    cb(null, false);
  }
};
app.use(multer({ fileFilter, storage }).single("img"));

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
