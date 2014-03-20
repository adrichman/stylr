angular.module('app.controllers')

.controller('UserController', function($scope, dbService, Cordova, PhotoService, $timeout, $state) {
  // dbService.createDB().then(dbService.updateDB("USER", "name", "bv")); 
  // var photos = PhotoService;
  // console.log(photos);
  $scope.timeout = function(){
    $timeout(function(){
      $state.go('home.start');
    }, 3000);
  }
});