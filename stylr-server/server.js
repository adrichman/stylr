'use strict';

var express  = require("express"),
    mongoose = require("mongoose"),
    users    = require("./app/models/user"),
    photos   = require("./app/models/photo"),
    port     = process.env.STYLR_PORT || 3000,
    db       = mongoose.connect(process.env.STYLR_DB || 'mongodb://127.0.0.1:27017');

// instantiate expressjs app
var app = express();

// Set up some standard express middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(function(req, res, next) {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type accept");
  res.setHeader("access-control-max-age", 10);
  next();
});
app.use(express.static(__dirname + '/public'));

// Get routes and models
require('./app/routes/photos')(app);
require('./app/routes/users')(app);

// Start server
var server = app.listen(port);
console.log('Server listening on port: ' + port);

//Expose the app
module.exports = app;

