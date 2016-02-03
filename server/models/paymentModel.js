var db = require('../db');

module.exports = {
  // money the user owes
  getWhatYouOwe: function (params, callback) {
    var queryStr = "select bill.name AS billName, bill.dueDate, payment.amount, bill.total, users.name AS whoIsOwed, users.email AS whoIsOwedEmail, payment.id AS paymentId, bill.id AS billId from payment left outer join bill on (payment.billid=bill.id) left outer join users on (users.id=bill.userid) where payment.paid=0 AND payment.userId=?"
    
    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
   // payments from other users
  getWhatIsOwedToYou: function (params, callback) {
    var queryStr = "select users.name AS ower, payment.amount, bill.name AS billName, bill.dueDate, bill.id AS billId, payment.id AS paymentID from bill left outer join payment on (bill.id=payment.billid) left outer join users on(payment.userid=users.id) where bill.userId = ? AND payment.paid=0";

    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },
  // all 'completed' payments, to and from user
  getWhatYouHavePaid: function (params, callback) {
    var queryStr = "select bill.name AS billName, bill.dueDate, payment.amount, users.name AS whoIsOwed, payment.id AS paymentId, bill.id AS billId from payment left outer join bill on (payment.billid=bill.id) left outer join users on (users.id=bill.userid) where payment.paid=1 AND payment.userId=? LIMIT 5";

    db.query(queryStr, params, function(err, results) {
      callback(err, results);
    });
  },

  getWhatHasBeenPaidToYou: function (params, callback) {
    var queryStr = "select users.name AS ower, payment.amount, bill.name AS billName, bill.dueDate, bill.id AS billId, payment.id AS paymentID from bill left outer join payment on (bill.id=payment.billid) left outer join users on(payment.userid=users.id) where payment.paid=1 AND bill.userId = ? LIMIT 5";

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
    var queryStr = "update payment SET paid=1 WHERE id=?";
    
    db.query(queryStr, params, function (err, results) {
      callback(err, results)
    })
  }

};
