var db = require('../db');

module.exports = {
  get: function (params, callback) {
    var queryStr = "SELECT users.name, chores.id, chores.name as chorename, chores.category, chores.completed, chores.dueDate, chores.houseId from Chores LEFT OUTER JOIN Users ON (Chores.UserId = users.id) WHERE chores.houseId=? and completed=0";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  post: function (params, callback) {
    var queryStr="INSERT INTO Chores (userId, name, category, dueDate, houseId) VALUES(?,?,?,?,?)";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  put: function (params, callback) {
    //this currently assumes that put request will only update chore to be done
    var queryStr = "UPDATE Chores SET completed=1 WHERE id=?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  delete: function (params, callback) {
    var queryStr = "DELETE FROM Chores WHERE id=?";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    })
  }
}
