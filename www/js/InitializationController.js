angular.module('app.controllers')

.controller('InitializationController', function($window, $rootScope, $scope, Cordova, PhotoService, $timeout, $state, $ionicLoading, ENV, stateChangeInterceptor) {
  $scope.preloadCache = [];
  var startCount = 0;
  var verifyCacheAndProceed = function(){
    var nTotal = $scope.preloadCache.length
    var nCached = $window.document.getElementsByClassName('preload').length
    PhotoService.verifyCache(nTotal, nCached)
    .then(function(n){
      $timeout(function(){
        $state.go('login');
      }, 3000);
    })
    .catch(function(){
      startCount++;
      if(startCount < 3){
        verifyCacheAndProceed();
      } else {
        $state.go('login');
      }
    });
  };

  PhotoService.requestPhotos()
  .then(function(res){
    
    PhotoService.getPhotos(res)
    .then(function(urls){
      $scope.preloadCache = urls;
      stateChangeInterceptor($state,$state.current.name, $state.params);
      verifyCacheAndProceed();
    })
  });
});
