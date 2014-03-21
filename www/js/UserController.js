angular.module('app.controllers')

.controller('UserController', function($window, $rootScope, $scope, dbService, Cordova, PhotoService, $timeout, $state) {

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

  console.log("USER CONTROLERJER");
  var chatRef = new Firebase('https://sweltering-fire-2238.firebaseio.com');
  var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
    if (error) {
      // an error occurred while attempting login
      console.log(error);
    } else if (user) {
      // user authenticated with Firebase
      console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
    } else {
      // user is logged out
    }
  });
  
  $scope.$on('$viewContentLoaded', function() {
    console.log("HERE IN THE BITS");
    Cordova.navigator().then(function() {
      console.log(arguments);
      auth.login('facebook');
    });
  });

  $scope.timeout = function(){
    console.log("SPLASH");
    $timeout(function(){
      $state.go('home.start');
    }, 3000);
  }
});