angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', 'Cordova', function($rootScope, $scope, $state, $timeout, Cordova)  {
  $scope.showSpinner = false;
  $rootScope.level = $rootScope.level || 1;

  $scope.$on('$viewContentLoading', function() {
    console.log('loading');
  });

  $scope.$on('$viewContentLoaded', function() {
    console.log('sfsfs');
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
    $timeout(function(){
      $scope.showSpinner = false;
    },3000)
  });

  $rootScope.$on('$stateChangeStart', function() {
    // $scope.showSpinner = true;
    console.log('state change start');
  });
  $rootScope.$on('$stateChangeSuccess', function() {
    console.log('state change success');
  });

  $scope.go = function(state) {
    $state.go(state, { level : $rootScope.level });
  };

}]);