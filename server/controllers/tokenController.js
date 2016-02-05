var tokenModel = require('../models/tokenModel');
var houseModel = require('../models/houseModel');
var jwt = require('jwt-simple');

module.exports = {
  updateToken: function(req, res) {
    var encryptedToken = JSON.parse(req.headers.token);
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid];
    houseModel.getHouseIdByUserId(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        req.session.regenerate(function() {
          var userToken = JSON.parse(jwt.decode(encryptedToken, process.env.secret_code));
          userToken.houseId = results[0].houseId;
          req.session.jwt = userToken;
          var encodedJwt = JSON.stringify(jwt.encode(JSON.stringify(userToken), process.env.secret_code));
          res.json(encodedJwt);
        });
      }
    });
  }
};