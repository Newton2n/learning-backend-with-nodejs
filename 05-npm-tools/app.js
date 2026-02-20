const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
     res.write("<html>");
    res.write("<head><title>Testing npm </title/></head>");
    res.write("<body> <h1> Hello I am Newton Bepari</h1> </body>");
    
    res.write("</html>");
    return res.end();
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
