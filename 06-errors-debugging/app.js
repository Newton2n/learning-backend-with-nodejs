const http = require("http");
const logical = require("./logical");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  logical();
  return res.end()
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
