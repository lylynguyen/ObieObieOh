var db = require('../db');

module.exports = {
  getUsersInHouse: function (params, callback) {
    var queryStr="SELECT users.name, users.id, users.email from users WHERE houseId = ?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  }, 
  findUserByVenmoId: function (params, callback) {
    var queryStr = "SELECT * FROM users WHERE venmoid=?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  postUser: function (params, callback) {
    var queryStr = "INSERT INTO Users (name, venmoName, username, email, provider, venmo, balance, venmoid ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )"
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },

  putUser: function (params, callback) {
    var queryStr = "UPDATE USERS set balance = ?, venmo = ? WHERE venmoid = ?";
     db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  getHouseOfUser: function(params, callback) {
    var queryStr = "SELECT id, houseId FROM users WHERE username = ? LIMIT 1";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  }
}

