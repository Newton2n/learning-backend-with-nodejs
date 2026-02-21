const fs = require("fs");
const user = (req, res) => {
  // console.log(req.url);
  if (req.url === "/") {
    res.setHeader("content-type", "text/html");
    res.setHeader("x-Newton", "My Name is Newton");
    res.write("<form action='/submit-result' method='POST'>");
    res.write("</br>");
    res.write('<input type="text" name="username" placeholder="Your name">');
    res.write("</br>");
    
    res.write("</br>");
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLocaleLowerCase() === "/submit-result" &&
    req.method === "POST"
  ) {
    const body = [];
    // console.log(body)
    req.on("data", (chunk) => {
      console.log(chunk.toString());
      body.push(chunk);
      // console.log(body);
    });
    req.on("end", () => {
      const parseData = Buffer.concat(body).toString();
      console.log(parseData);
      const params = new URLSearchParams(parseData);

      const bodyObj = Object.fromEntries(params);
       fs.writeFile("user.txt", JSON.stringify(bodyObj), (error) => {
        console.log("SOme thing wrong");
      });
      console.log(bodyObj);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

module.exports = user;
