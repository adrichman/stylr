
var fs = require("fs");

module.exports = function(app) {

  app.post('/user', function(request, response) {
    var data = request.data;
    fs.appendFile('user.txt', "\n" + JSON.stringify(data), function(err, data) {
      if(err) { response.send(500, "ERROR"); }
      response.send(200, "It's a girl!", data);
    });
  });

};