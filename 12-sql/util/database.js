const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "172.25.224.1",
  user: "root",
  password: "e387*8b1T>g^YHA[{o1",
  database: "airbnb",
});

module.exports = pool.promise();
