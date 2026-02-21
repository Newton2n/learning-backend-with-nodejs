const http = require("http");
// const logical = require("./logical");

// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);

//   logical();
//   return res.end()
// });
const requestHandler = require("./user");

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
