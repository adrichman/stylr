
var loans = require('../controllers/photos');

module.exports = function(app) {

  app.get('/images', function(request, response) {
    fs.readFile('../data/data_img_small.txt', 'utf-8', function(err, data) {
      if( err ) {
        response.send(500, "ERROR", err);
      } else {
        response.json(200, data);
      }
    });
  });

  app.post('/images', loans.create);

};