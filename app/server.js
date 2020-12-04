// JavaScript source code
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080; // set the port for our app
var User = require('./app/models/user');
var apiRouter = express.Router(); // get an instance of the express Router
mongoose.connect('mongodb://node:noder@novus.modulusmongo.net:27017/Iganiq8o');
 // APP CONFIGURATION ---------------------
 // use body parser so we can grab information from POST requests
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
//--------------- ROUTES FOR OUR API
 
//---------------
// configure our app to handle CORS-  ross-origin resource sharing requests
 app.use(function(req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
     });

// log all requests to the console
 app.use(morgan('dev'));
 
  // ROUTES FOR OUR API
  // =============================
 
  // basic route for the home page
  app.get('/', function(req, res) {
      res.send('Welcome to the home page!');
      });
 
  // get an instance of the express router
  var apiRouter = express.Router();
// middleware to use for all requests
  apiRouter.use(function (req, res, next) {
      // do logging
      console.log('Somebody just came to our app!');
      // we'll add more to the middleware in Chapter 10
      // this is where we will authenticate users

      next(); // make sure we go to the next routes and don't stop here
  });
  // test route to make sure everything is working
  // accessed at GET http://localhost:8080/api
  apiRouter.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });
      });
 
  // more routes for our API will happen here
 
  // REGISTER OUR ROUTES -------------------------------
  // all of our routes will be prefixed with /api
  app.use('/api', apiRouter);
 
 // START THE SERVER
  // ===============================
  app.listen(port);
  console.log('Magic happens on port ' + port)