const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.url,req.headers)
  // console.log("Method",req)
  console.log("Method", res);
  process.exit();
});
const PORT = 3002;
server.listen(PORT, () => {
  console.log(PORT);
});
