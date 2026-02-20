const sumRequestHandler = (req, res) => {
  console.log("In Sum Request Handler", req.url);
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
    console.log(chunk)
    console.log(body)
  });
  req.on("end", () => {
    const buffer = Buffer.concat(body).toString();
    console.log(buffer)
    const params = new URLSearchParams(buffer);
    console.log(params)
    const bodyObj = Object.fromEntries(params);
    console.log(bodyObj)
    const result = Number(bodyObj.first) + Number(bodyObj.second);
    // console.log(result);
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head><title>Practise Set</title></head>
        <body>
          <h1>Your Sum is ${result}</h1>
        </body>  
      <html>  
    `);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
