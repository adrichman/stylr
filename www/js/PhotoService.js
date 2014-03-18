angular.module('app.services')

.service('PhotoService', function($q, $http) {
  
  // this.getPhotos = function() {
  //   var d = $q.defer();
  //   $http.get('/images')
  //     .success(function(data, status, headers, config) {
  //       d.resolve(data);
  //     }).error(function(data, status, headers, config) {
  //       return d.reject(data);
  //     });
  //   return d.promise;
  // }

  this.getPhotos = function() {
    var photos;
    $http.get('/images')
      .success(function(data, status, headers, config) {
        photos =  data;
      }).error(function(data, status, headers, config) {
        return data;
      });
      return photos;
  }

  this.setPhotos = function() {

  }
});