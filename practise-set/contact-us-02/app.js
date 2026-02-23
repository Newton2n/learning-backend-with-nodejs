const path = require("path");

//external modules
const express = require("express");
const bodyParser = require("body-parser");

//local modules
const home = require("./routes/home");
const contact = require("./routes/contact");
const rootDir = require("./utils/root-dir");
const app = express();

app.use(express.urlencoded()); 
app.use(home);
app.use(contact);

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on address http://localhost:${PORT}`),
);
