//core modules
const path = require("path");

//external modules
const express = require("express");

//local modules
const global = require("./routes/globalRoute");
const admin = require("./routes/adminRoute");
const user = require("./routes/userRoute");
const rootDir = require("./util/path-utils");

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(global);
app.use(global);
app.use("/home", admin);
app.use("/home", user);

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
