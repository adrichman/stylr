angular.module('app.services')

.factory('PhotoService', ['$q','$http', function($q, $http) {

  var photos = function() {
    var d = $q.defer();
    $http.get('http://127.0.0.1:3000/images')
      .success(function(data, status, headers, config) {
        d.resolve(JSON.parse(data));
      }).error(function(data, status, headers, config) {
        d.reject(data);
      });
    return d.promise;
  };

  return photos;

}]);
