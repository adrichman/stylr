/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');


exports.create = function(request, response) {
  var photo = new Photo(request.body);
  photo.save(function(err) {
    if( err ) {
      response.send(500, "ERROR");
    } else {
      response.send(200, "DATA SAVED");
    }
  });
};

exports.getAll = function(request, response) {
  var params = {}; 
  params.category = request.params[0];
  console.log(params);
  Photo.find(params).limit(15).exec(function(err, photos) {
    if( err ) {
      response.send(500, "ERROR", err);
    } else {
      response.send(photos);
    }
  });
};