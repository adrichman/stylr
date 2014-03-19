
var photos = require('../controllers/photos');

module.exports = function(app) {

  app.get('/images', photos.getAll);

  app.post('/images', photos.create);

};