angular.module('app.controllers')

.controller('UserController', function($window, $rootScope, $scope, dbService, Cordova, PhotoService, $timeout, $state) {
  // dbService.createDB().then(dbService.updateDB("USER", "name", "bv")); 
  // var photos = PhotoService;
  // console.log(photos);
  $scope.cacheCount = 0;
  var startCount = 0;
  PhotoService().then(function(cache){
    $rootScope.images = cache;
    temp = [];                    
    for (var i = 0; i < cache.length; i++){
      temp.push(cache[i]['Image_URL']);
      $scope.cacheCount++;
    }
    $rootScope.preloadCache = temp;
  });
  
  $scope.start = function(){
    var preloaded = $window.document.getElementsByClassName('preload');
    if (startCount > 5 || ($scope.cacheCount > 1 && preloaded.length === $scope.cacheCount)){
      $timeout(function(){
        $state.go('home.start');
      });
    } else {
      startCount++;
      $timeout(function(){
        $scope.start();
      }, 3000);
    }

  }
});