const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method);
  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Newton</title/></head>");
    res.write("<body> <h1>Home Page</h1> </body>");
    res.write("</html>");
   return res.end();
  } else if (req.url === "/newton") {
    res.write("<html>");
    res.write("<head><title>Newton</title/></head>");
    res.write("<body> <h1>Newton Page</h1> </body>");
    res.write("</html>");
    return res.end()
  } else if(req.url === "/about"){
    res.write("<html>");
    res.write("<head><title>Newton</title/></head>");
    res.write("<body> <h1>Hello i am Newton Bepari </h1> </body>");
    res.write("</html>");
    return res.end() 
  }
  res.write("<html>");
  res.write("<head><title>Newton</title/></head>");
  res.write("<body> <h1>Not found page</h1> </body>");
  res.write("</html>");
});

const PORT = 3003;
server.listen(PORT, () => {
  console.log("PORT:", PORT);
});
