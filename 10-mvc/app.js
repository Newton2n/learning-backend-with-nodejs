//core modules
const path = require("path");

//external modules
const express = require("express");

//local modules
const home = require("./routes/home");
const admin = require("./routes/adminRoute");
const user = require("./routes/userRoute");
const { addHome } = require("./routes/add-home");
const rootDir = require("./util/path-utils");
const { notFound } = require("./controllers/notFound");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(rootDir, "public")));

app.use(home); //home page
app.use("/admin", admin); //admin page
app.use(user); //user page
app.use(addHome); //add home page
app.use(notFound); //not found page


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
