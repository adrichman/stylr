angular.module('app.services')

.factory('PhotoService', ['ENV','$q','$http','$rootScope', '$cacheFactory', function(ENV, $q, $http, $rootScope, $cacheFactory, $timeout) {

  var requestPhotos = function(params) {
    params = params || 1;
    var d = $q.defer();
    if (params <= 6){
      $http.get(ENV.server.url + ENV['categories'][params].db)
        .success(function(data, status, headers, config) {
          d.resolve(data);
        }).error(function(data, status, headers, config) {
          d.reject(data);
        });
    } else {
      d.resolve([]);
    }
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

  return  { 
              requestPhotos : requestPhotos,
              getPhotos     : getPhotos,
              verifyCache   : verifyCache
          };

}]);





