const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "172.25.224.1",
  user: "root",
  password: 'Newton12?',
  database: "airbnb",
});

module.exports = pool.promise();