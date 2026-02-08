const http = require("http");
const { parse } = require("path");
const { json } = require("stream/consumers");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Post Method</title/></head>");
    res.write("<body> <h1> fill up page</h1> </body>");
    res.write("<form action='/submit-result' method='POST'>");
    res.write(
      '<input type="text" name="username" placeholder="Enter your name">'
    );
    res.write("</br>");
    res.write('<label for="Male">Male</label>');
    res.write('<input type="radio" id="Male" name="gender" value="Male">');
    res.write('<label for="Female">Female</label>');
    res.write('<input type="radio" id="Female" name="gender" value="Female">');
    res.write("</br>");
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-result" &&
    req.method === "POST"
  ) {
    const body =[]
    req.on("data",chunk=>{
        
        body.push(chunk)
        console.log("body",body)

    })
    req.on("end",() =>{
      const parseData =  Buffer.concat(body).toString()
      console.log("final data ",parseData)
    })
    res.setHeader("Location", "/");
    res.statusCode = 302; // status 302 for redirect url status code
    return res.end();
  }
  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Newton</title/></head>");
  res.write("<body> <h1>Sorry you are in wrong page</h1> </body>");
  res.write("</html>");
  return res.end();
});
const PORT = 3004;
server.listen(PORT, () => {
//   console.log(PORT);
});
