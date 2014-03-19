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
  Photo.find({}, function(err, photos) {
    if( err ) {
      response.send(500, "ERROR");
    } else {
      response.send(photos);
    }
  });
};