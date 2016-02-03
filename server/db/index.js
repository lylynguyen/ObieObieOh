var mysql = require('mysql');


var connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "bananas"
});

connection.connect();

module.exports = connection;
