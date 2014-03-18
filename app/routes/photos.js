
var fs = require("fs");

module.exports = function(app) {

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

};