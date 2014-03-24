angular.module('app.controllers')

.controller('UserController', function($window, $rootScope, $scope, Cordova, PhotoService, $timeout, $state, $ionicLoading, ENV) {
  console.log("USER controller");
  $scope.preloadCache;
  var startCount = 0;
  var verifyCacheAndProceed = function(){
    var nTotal = $scope.preloadCache.length
    var nCached = $window.document.getElementsByClassName('preload').length
    PhotoService.verifyCache(nTotal, nCached)
    .then(function(n){
      console.log(n)
      $timeout(function(){
        $scope.loading.hide();
        $state.go('login');
      }, 3000);
    })
    .catch(function(){
      console.log('cache incomplete!');
      startCount++;
      if(startCount < 3){
        verifyCacheAndProceed();
      } else {
        $state.go('login');
      }
    });
  };

  $scope.loading = $ionicLoading.show(ENV.loadingOptions);

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
