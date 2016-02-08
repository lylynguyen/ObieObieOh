var db = require('../db');

module.exports = {
  // money the user owes
  getWhatYouOwe: function (params, callback) {
    var queryStr = "select Bill.name AS billName, Bill.dueDate, Payment.amount, Bill.total, Users.name AS whoIsOwed, Users.email AS whoIsOwedEmail, Payment.id AS paymentId, Bill.id AS billId from Payment left outer join Bill on (Payment.billid=Bill.id) left outer join Users on (Users.id=Bill.userid) where Payment.paid=0 AND Payment.userId=?"
    
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
   // payments from other users
  getWhatIsOwedToYou: function (params, callback) {
    var queryStr = "select Users.name AS ower, Payment.amount, Bill.name AS billName, Bill.dueDate, Bill.id AS billId, Payment.id AS paymentID from Bill left outer join Payment on (Bill.id=Payment.billid) left outer join Users on(Payment.userid=Users.id) where Bill.userId = ? AND Payment.paid=0";

    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  // all 'completed' payments, to and from user
  getWhatYouHavePaid: function (params, callback) {
    var queryStr = "select Bill.name AS billName, Bill.dueDate, Payment.amount, Users.name AS whoIsOwed, Payment.id AS paymentId, Bill.id AS billId from Payment left outer join Bill on (Payment.billid=Bill.id) left outer join Users on (Users.id=Bill.userid) where Payment.paid=1 AND Payment.userId=? LIMIT 5";

    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },

  getWhatHasBeenPaidToYou: function (params, callback) {
    var queryStr = "select Users.name AS ower, Payment.amount, Bill.name AS billName, Bill.dueDate, Bill.id AS billId, Payment.id AS paymentID from Bill left outer join Payment on (Bill.id=Payment.billid) left outer join Users on(Payment.userid=Users.id) where Payment.paid=1 AND Bill.userId = ? LIMIT 5";

    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },

  //user makes a payment
  postPayment: function (params, callback) {
    var queryStr = "insert into Payment(billId, userId, amount) \
                  values (?, ?, ?)";
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },

  postBill: function(params, callback) {
    var queryStr = "insert into Bill (userId, total, name, dueDate) values (?,?,?,?)";
    
    db.query(queryStr, params, function(err, results) {
      callback(err, results)
    })
  },

  markPaymentAsPaid: function(params, callback) {
    var queryStr = "update Payment SET paid=1 WHERE id=?";
    
    db.query(queryStr, params, function (err, results) {
      callback(err, results)
    })
  }

};
