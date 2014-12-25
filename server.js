// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var model = require('./app/models/nerd'); 

// configuration =========================================== tet

// config files
var db = require('./config/db');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8085; // set our port
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    db.url = process.env.OPENSHIFT_MONGODB_DB_URL + 'sleepy';
}

mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('db opened sucessfully');
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
exports = module.exports = app; 						// expose app