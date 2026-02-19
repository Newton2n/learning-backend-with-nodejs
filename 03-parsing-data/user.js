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

      // const bodyObj = {};
      // for (const [key, val] of params.entries()) {
      //   // console.log(params)
      //   bodyObj[key] = val;
      //   console.log(bodyObj)
      // }
      const bodyObj = Object.fromEntries(params);
      fs.writeFileSync("user.txt", JSON.stringify(bodyObj));
      console.log(bodyObj);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else if (req.url.toLocaleLowerCase() === "/api/user") {
    res.setHeader("content-type", "application/json");
    res.write('{"users": ['); // Send the start of the JSON
    res.write('{"id": 1, "name": "Bepari"},'); // Send a chunk
    res.write('{"id": 2, "name": "John"}'); // Send another chunk
    res.end("]}"); // Send the final bracket and CLOSE the connection

    // 3. Convert the object to a string and send it
    res.end();
  }
};

module.exports = user;
