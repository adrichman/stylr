
var photos = require('../controllers/photos');
var fs = require('fs');
module.exports = function(app) {

  app.get('/images', photos.getAll);
  app.post('/images', photos.create);

};