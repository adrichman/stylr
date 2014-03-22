angular.module('app.services')

.factory('PhotoService', ['$q','$http','$rootScope', '$cacheFactory', function($q, $http, $rootScope, $cacheFactory, $timeout) {

  var categories = {
                    "1":  { "db": "Top"         , "friendly" : "Tops"          },
                    "2":  { "db": "Bottom"      , "friendly" : "Bottoms"       },
                    "3":  { "db": "Dress"       , "friendly" : "Dresses"       },
                    "4":  { "db": "Accessory"   , "friendly" : "Accessories"   },
                    "5":  { "db": "Bracelet"    , "friendly" : "Bracelets"     },
                    "6":  { "db": "Necklace"    , "friendly" : "Necklaces"     },
                  };

  var requestPhotos = function(params) {
    params = params || 1;
    var d = $q.defer();
      $http.get('http://127.0.0.1:3000/images/' + categories[params].db)
        .success(function(data, status, headers, config) {
          d.resolve(data);
        }).error(function(data, status, headers, config) {
          d.reject(data);
        });
    return d.promise;
  };

  var getPhotos = function(photos){
    var d = $q.defer();
    var urls = [];                    
    for (var i = 0; i < photos.length; i++){
      var photo = photos[i];
      urls.push(photo['Image_URL']);
    }
    d.resolve(urls);
    return d.promise;
  };

  var verifyCache = function(nImagesInDOM, nTotal){
    var d = $q.defer();
    if (nImagesInDOM > 0 && nImagesInDOM >= nTotal){
      d.resolve(nImagesInDOM);
    } else {
      d.reject();
    }
    return d.promise;
  };

  return { 
          requestPhotos         : requestPhotos,
          getPhotos             : getPhotos,
          verifyCache           : verifyCache
        };

}]);





