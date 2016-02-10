var passport = require('passport');
var VenmoStrategy = require('passport-venmo').Strategy;
var request = require('request')
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./db/index');
var cors = require('cors');
var user = require('./controllers/userController');

var jwt = require('jwt-simple');
require('dotenv').load();

var Venmo_Client_ID = process.env.venmo_client_ID;
var Venmo_Client_SECRET = process.env.venmo_client_secret;
var Venmo_Callback_URL = 'http://localhost:8080/auth/venmo/callback';

app.set('port', (process.env.PORT || 8081));

var server = app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  console.log('a user connected  ~(_8^(I) ');
  socket.on('message', function(data) {
    io.sockets.emit('message', data); // broadcast to all but the sender
    console.log("server nsp->%s", socket.nsp.name)
  });
})

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'client')));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new VenmoStrategy({
    clientID: Venmo_Client_ID,
    clientSecret: Venmo_Client_SECRET,
    callbackURL: Venmo_Callback_URL
  },
  function(accessToken, refreshToken, venmo, done) {
    var obj= {}
    obj.name = venmo.displayName;
    obj.venmoName = venmo.displayName;
    obj.username = venmo.username;
    obj.email = venmo.email;
    obj.provider = venmo.provider;
    obj.venmo = venmo._raw;
    obj.balance = venmo.balance;
    obj.access_token = accessToken;
    obj.refresh_token = refreshToken;
    obj.venmoid = venmo.id;

    var jtObj = {};
    jtObj.email = venmo.email;
    jtObj.access_token = accessToken;


    request.get('http://localhost:8080/users/venmo/'+ venmo.id, function(err, resp, body) {

      if (!err && resp.statusCode == 200) {
        if (JSON.parse(body).length === 0){

          request({
            url: 'http://localhost:8080/users', //URL to hit
            method: 'POST',
            json: obj //Set the body as a string
          }, function(error, response, body){
              if(error) {
                return done(error);
              } else {
                jtObj['userid']=body;
                var jwtObj = jwt.encode(JSON.stringify(jtObj), process.env.secret_code);
                return done(null, jwtObj);
              }
          });
        }
        else {
          request({
            url: 'http://localhost:8080/users', //URL to hit
            method: 'PUT',
            json: obj
          }, function (error, response, body) {
            if (error) {
              return done(error);
            } else {
              request.get('http://localhost:8080/users/id/' + venmo.username, function(error, response, body) {
                console.log("ID", body);
                body=JSON.parse(body);
                var userId = body[0]['id'] ||null;
                var houseId = body[0]['houseId'] || null;
                jtObj['userid']=userId;
                jtObj['houseId']=houseId;
                var jwtObj = jwt.encode(JSON.stringify(jtObj), process.env.secret_code);
                return done(null, jwtObj);
              })

            }
          });
        }
      } else {
        console.log('error');
        return done(err);
      }
    })
  }
));

require('./config/routes.js')(app, express);

module.exports = app;
