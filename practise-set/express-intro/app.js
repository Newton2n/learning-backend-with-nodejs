const express = require("express");

const app = express();

app.use((req, res, next) => {
  // console.log("req url is :", req.url);
  next();
});
app.use((req, res, next) => {
  // console.log("2 req method is :", req.method);
  next();
});
app.use((req, res, next) => {
  // console.log("3 req url is :", req.url);

  next();
});
app.use("/", (req, res, next) => {
  // console.log("respond:", req.url);
  next();
});

app.get("/contact-page", (req, res, next) => {
  // console.log("COntact page :", req.url, req.method);
  res.send(`<h2>Contact Us</h2>

    <form action="/contact-page" method="POST">
        <div>
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required>
        </div>

        <div>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required>
        </div>

        <button type="submit">Submit</button>
    </form>`);
  next();
});
app.post("/contact-page", (req, res, next) => {
  // console.log(req.body);
  const chunks = [];
  req.on("data", (chunk) => {
    // console.log(chunk)
    chunks.push(chunk);
  });
  req.on("data", () => {
    console.log(
      Object.fromEntries(new URLSearchParams(Buffer.concat(chunks).toString())),
    );
    // console.log(chunks.toString())
    // console.log(chunks)
  });
  return res.end();
});
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on address http://localhost:${PORT}`),
);
