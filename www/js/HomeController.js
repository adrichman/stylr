angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', function($rootScope, $scope, $state, $timeout)  {
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
  });

  $scope.go = function(state) {
    $state.go(state);
  };

}]);