angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', 'Cordova', '$ionicLoading', function($rootScope, $scope, $state, $timeout, Cordova, $ionicLoading)  {
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

  $scope.loadingShow = function() {

    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({

      // The text to display in the loading indicator
      content: 'Loading',

      // The animation to use
      animation: 'fade-in',

      // Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,

      // The maximum width of the loading indicator
      // Text will be wrapped if longer than maxWidth
      maxWidth: 200,

      // The delay in showing the indicator
      showDelay: 500
    });
  };

  // Hide the loading indicator
  $scope.loadingHide = function(){
    $scope.loading.hide();
  };
}]);