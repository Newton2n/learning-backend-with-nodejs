require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const data ={
  "first_name": "John",
  "last_name": "Smith",
  "is_alive": true,
  "age": 27,
  "address": {
    "street_address": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postal_code": "10021-3100"
  },
  "phone_numbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [
    "Catherine",
    "Thomas",
    "Trevor"
  ],
  "spouse": null
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/Owner", (req, res) => {
  res.send("Owner is Newton.");
});
app.get("/json",(req,res)=>{
  res.json(data)
})
app.listen(process.env.PORT, () => {
  console.log(`Hello i am currently running on port number: ${port}`);
});
