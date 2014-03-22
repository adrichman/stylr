angular.module('app.controllers')

.controller('UserController', function($window, $rootScope, $scope, Cordova, PhotoService, $timeout, $state) {
  $scope.preloadCache;
  var startCount = 0;
  var verifyCacheAndProceed = function(nTotal){
    var nTotal = $scope.preloadCache.length
    var nCached = $window.document.getElementsByClassName('preload').length
    PhotoService.verifyCache(nTotal, nCached)
    .then(function(n){
      console.log(n)
      $timeout(function(){
        $state.go('home.start');
      }, 2000);
    })
    .catch(function(){
      console.log('cache incomplete!');
      startCount++;
      if(startCount < 3){
        verifyCacheAndProceed();
      } else {
        $state.go('home.start');
      }
    });
  };

  PhotoService.requestPhotos()
  .then(function(res){
    console.log('requested photos', res);
    
    PhotoService.getPhotos(res)
    .then(function(urls){
      console.log('got urls', urls);
      $scope.preloadCache = urls;
      verifyCacheAndProceed();
    })
  });
});
