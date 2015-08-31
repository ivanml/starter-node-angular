// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');             // log requests to the console (express4)
var bodyParser     = require('body-parser');
var passport       = require('passport');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');
//mongoose.connect(db.url);
mongoose.connect(db.url);

var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the body (POST) parameters
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app