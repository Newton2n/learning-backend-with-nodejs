//external modules
const express = require("express");

//local modules
const requestHandler = require("./user");

const app = express();

app.use("/", (req, res, next) => {
  console.log("came in first middleware", req.url, req.method);
  // res.send("came in first middleware</h1>")
  next();
});
app.get("/", (req, res, next) => {
  console.log("came in middle middleware", req.url, req.method);
  res.send("<h1>came in middle middleware </h1>");
});
app.post("/home", (req, res, next) => {
  console.log("came in second middleware", req.url, req.method);
  res.send("<h1>came in second middleware</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
