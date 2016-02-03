var messageModel = require('../models/messageModel.js');
var jwt = require('jwt-simple');

module.exports = {
  get: function(req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.houseId];

    messageModel.get(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  },
  post: function(req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid, req.body.text, token.houseId];
    messageModel.post(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      }
      res.json(results);
    });
  }
}
