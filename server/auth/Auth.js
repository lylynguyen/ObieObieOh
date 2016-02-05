var userController = require('../controllers/userController.js');

var isLoggedIn = function(req) {
  //return req.session ? !!req.session.jwt : false;
  return req.session && req.session.jwt;
};

module.exports.checkHouse = function(req, res, next) {
  userController.getHouseOfUser(); 
  if(token.houseId === null) {
    res.redirect('/registration');
  } else {
    next(); 
  }
};

module.exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
}
