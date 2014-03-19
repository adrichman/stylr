angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$scope', '$state', function($scope, $state)  {

  $scope.$on('$viewContentLoading', function() {
  });

  $scope.go = function(state) {
    $state.go(state);
  };

  $scope.$on('$viewContentLoaded', function() {
  });
}]);