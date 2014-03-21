var fs = require('fs');
var keys =[
  "Style_Name",
  "Image_URL",
  "Alt_Image_URL",
  "name",
  "category",
  "classic_score",
  "romantic_score",
  "edgy_score",
  "boho_score",
  "glam_score",
  "casual_score",
  "cute_top_score",
  "preppy_score",
  "fit_top",
  "fit_bottom",
  "good_for_top_body_type",
  "good_for_bottom_body_type",
  "fit_petite"
]

fs.readFile(__dirname + '/app/data/data_img.json', 'utf-8', function(err, data) {
  if( err ) {
    console.log(err);
  } else {
    var results = [];
    data = JSON.parse(data);
    for (var i = 0; i < data.length; i++){
      var item = {};
      for (var j = 0; j < data[i].length; j++){  
        item[keys[j]] = data[i][j];
      }
      results.push(item);
    }
    results = JSON.stringify(results);
    console.log(results);
    fs.writeFile(__dirname + '/app/data/data_w_keys.json', results, 'utf8', function(){
      if (err) throw err;
      console.log('written to /app/data/data_w_keys.json');
    });
  }
});

