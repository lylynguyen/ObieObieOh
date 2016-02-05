var messageController = require('../controllers/messageController.js')
var paymentController = require('../controllers/paymentController.js');
var choreController = require('../controllers/choreController.js');
var userController = require('../controllers/userController.js');
var houseController = require('../controllers/houseController.js');
var tokenController = require('../controllers/tokenController.js');
var landlordController = require('../controllers/landlordController.js');
var Auth = require('../auth/Auth.js');
var passport = require('passport');
var session = require('express-session');
var jwt = require('jwt-simple');



module.exports = function(app, express) {

  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true
  }));

  app.get('/auth/venmo', passport.authenticate('venmo', {
      session: false,
      scope: ['make_payments', 'access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
      failureRedirect: '/login'
  }), function(req, res) {
    res.render("hi");
  });

  //Passport
  app.get('/auth/venmo/callback', passport.authenticate('venmo', {
      failureRedirect: '/login' //redirect to login eventually
  }), function(req, res) {
    return req.session.regenerate(function() {
      var token = JSON.parse(jwt.decode(req.user, process.env.secret_code));
      req.session.jwt = req.user;
      if(!token.houseId) {
        res.redirect('/registration')
      } else if (!token.isLandlord) {
        res.redirect('/');
      } else if (token.isLandlord) {
        res.redirect('/landlord');
      }
    });
  });

  //Users
  app.get('/users/', userController.getUsersInHouse);
  app.get('/users/venmo/:venmoId', userController.findUserByVenmoId);
  app.get('/users/id/:username', userController.getHouseOfUser);
  app.post('/users', userController.postUser);
  app.put('/users', userController.putUser);
  app.get('/users/images', userController.getUserImage);
  //app.get('/users/house', userController.checkIfUserHasHouse)

  //Messages
  app.get('/messages', messageController.get);
  app.post('/messages', messageController.post);

  //Chores
  app.get('/chores/', choreController.get);
  app.post('/chores', choreController.post);
  app.put('/chores/:choreId', choreController.put);
  app.delete('/chores/:choreId', choreController.delete);

  //Payments
  app.get('/payment/pay', paymentController.getWhatYouOwe);
  app.get('/payment/owed', paymentController.getWhatIsOwedToYou);
  app.get('/payment/completed', paymentController.getWhatYouHavePaid);
  app.get('/payment/completed/owed', paymentController.getWhatHasBeenPaidToYou);
  app.post('/payment', paymentController.postPayment);
  app.post('/payment/bill', paymentController.postBill);
  app.put('/payment/:paymentId', paymentController.markPaymentAsPaid);

  //Houses
  app.post('/houses', houseController.postHouse);
  app.get('/houses/:token', houseController.getHousebyHouseId);
  app.put('/houses/users', houseController.updateUserHouseId);
  app.get('/houses/token/:houseId', houseController.getHouseToken);
  app.get('/housez/code', houseController.getHouseCode);

  //Landlord
  app.get('/properties/owned', landlordController.getHousesOwned);
  app.get('/properties/view/:houseId', landlordController.updateLandlordsCurrentHouse);
  app.put('/properties/add/:houseToken', landlordController.addProperty);
  app.post('/properties/create', houseController.createHouse);

  app.use('/login', express.static('client/login'));
  app.use('/', Auth.checkUser, express.static('client'));
  app.use('/landlord', Auth.checkUser, express.static('landlordclient'));
  app.use('/registration', Auth.checkUser, express.static('client/registration.html'));

  app.get('/obie', function(req, res) {
    res.send(JSON.stringify(req.session.jwt));
  })


  app.get('/obie/tokenChange', tokenController.updateToken);

  //Login/Logout
  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });

  //Pay a user
  app.post('/auth/venmo/payment', paymentController.makeVenmoPayment);
}
  
