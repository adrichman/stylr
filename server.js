'use strict';

var express  = require("express"),
    mongoose = require("mongoose"),
    fs       = require("fs"),
    port     = 3000;

var app = express();
var db = mongoose.connect('mongodb://localhost/stylr');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/www/'));

app.get('/images', function(request, response) {
  fs.readFile(__dirname + '/app/data/data_img_small.txt', 'utf-8', function(err, data) {
    if( err ) {
      response.send(500, "ERROR", err);
    } else {
      response.json(200, data);
    }
  });
});

app.get('/www/img/:photoURL', function(request, response) {
  console.log("GET: /img", request);
  response.send(200, "OKAY");
});

app.post('/user', function(request, response) {
  var data = request.data;
  fs.appendFile('user.txt', "\n" + JSON.stringify(data), function(err, data) {
    if(err) { response.send(500, "ERROR"); }
    response.send(200, "It's a girl!", data);
  });
});

var server = app.listen(port);
console.log('Server listening on port: ' + port);
module.exports = server;

