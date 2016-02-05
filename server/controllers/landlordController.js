var landlordModel = require('../models/landlordModel');
var jwt = require('jwt-simple');

module.exports = {
  getHousesOwned: function (req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    console.log("USER id", token.userid);
    var params = [token.userid];
    landlordModel.getHousesOwned(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },
  updateLandlordsCurrentHouse: function(req, res) {
    var houseId = req.params.houseId;
    var obie = JSON.parse(jwt.decode(req.session.jwt, process.env.secret_code));
    obie.houseId = houseId;
    res.send(JSON.stringify(jwt.encode(JSON.stringify(obie), process.env.secret_code)));
  },
  addProperty: function(req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.userid, req.params.houseToken];
    console.log(params, "PARRAMS")
    landlordModel.addProperty(params, function (err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  }
}