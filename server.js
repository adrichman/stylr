'use strict';

var express  = require("express"),
    mongoose = require("mongoose"),
    users    = require("./app/models/user"),
    photos   = require("./app/models/photo"),
    port     = 3000,
    db       = mongoose.connect('mongodb://localhost/stylr');

// instantiate expressjs app
var app = express();

// Set up some standard express middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/www/'));

// Get routes and models
require('./app/routes/photos')(app);
require('./app/routes/users')(app);

// Start server
var server = app.listen(port);
console.log('Server listening on port: ' + port);

//Expose the app
module.exports = app;

