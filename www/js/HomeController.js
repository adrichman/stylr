angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', '$ionicLoading', function($rootScope, $scope, $state, $timeout, $ionicLoading)  {
  $scope.showSpinner = false;

  $scope.$on('$viewContentLoading', function() {
    console.log('loading');
  });
  
  $scope.$on('$viewContentLoaded', function() {
    console.log('loaded');
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
    $rootScope.level = $state.params.level ? $state.params.level : 1;
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