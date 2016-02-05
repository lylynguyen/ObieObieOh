var houseModel = require('../models/houseModel');
var jwt = require('jwt-simple');

module.exports = {
  postHouse: function(req, res) {
    //extract house name from req.body
    var name = req.body.name
    //insert that name into params
    var address = req.body.address || null;
    var userId = token.userid;
    var params = [name, address, userId];
    houseModel.postHouse(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },

  createHouse: function(req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));

    //extract house name from req.body
    var name = req.body.name
    //insert that name into params
    var address = req.body.address || null;
    var userId = token.userid;
    var params = [name, address, userId];
    houseModel.createHouse(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    });
  },

  getHousebyHouseId: function(req, res) {
    //set params to equal the token from the params
    var params = [req.params.token];
    houseModel.getHouse(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },

  updateUserHouseId: function(req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    //need a way to send houseId with the user. We have a param
    //from the route, maybe we can send the houseId as data
    //and extract it from req.body. First set params to userId
    var houseId = req.body.houseId;
    var userId = token.userid;
    var params = [houseId, userId];
    houseModel.updateHouseUserList(params, function(err, results) {
      if(err) {
        res.sendStatus(500);
      } else {
        // res.redirect('/')
        res.json(results)
      }
    })
  },
  getHouseToken: function(req, res) {
    var params = [req.params.houseId];
    houseModel.getHouseToken(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  },
  getHouseCode: function(req, res) {
    var token = JSON.parse(jwt.decode(JSON.parse(req.headers.token), process.env.secret_code));
    var params = [token.houseId];
    console.log(params);
    houseModel.getHouseToken(params, function(err, results) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results);
      }
    })
  }
}