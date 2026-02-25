//core modules
const path = require("path");

//external modules
const express = require("express");

//local modules
const global = require("./routes/globalRoute");
const admin = require("./routes/adminRoute");
const user = require("./routes/userRoute");
const { addHome } = require("./routes/add-home");
const rootDir = require("./util/path-utils");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

app.use(global);
app.use("/admin", admin);
app.use(user);
app.use(addHome);
app.use(express.static(path.join(rootDir, "public")));

// app.use((req, res, next) => {
//   res.status(404).send("<h1>404 Page not found </h1>")
// });
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "notFound.html"));
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
