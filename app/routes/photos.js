
var photos = require('../controllers/photos');

module.exports = function(app) {

  app.get('/images', function(request, response) {
    console.log('/images', __dirname);
    fs.readFile(__dirname + '/../../app/data/data_img_small.json', 'utf-8', function(err, data) {
      if( err ) {
        response.send(500, "ERROR", err);
      } else {
        data = JSON.stringify(data);
        console.log(data);
        response.send(200, data);
      }
    });
  });

  app.post('/images', photos.create);

};