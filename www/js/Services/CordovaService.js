angular.module('app.services', [])

.factory('Cordova', ['$q', function($q) {
  var d = $q.defer();
  if(window.navigator) {
    d.resolve(window.navigator);
  } else {
    document.addEventListener('deviceready', function(evt) {
      d.resolve(navigator);
    });
  }
  return {
    navigator: function() {
      return d.promise;
    }
  }
}]);

