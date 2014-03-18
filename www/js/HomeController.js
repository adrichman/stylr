angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$scope', '$state', function($scope, $state)  {

  $scope.$on('$viewContentLoading', function() {
    console.log("ssa");
  });

  $scope.go = function() {
    $state.go('slide');
  };

  $scope.$on('$viewContentLoaded', function() {
    console.log("ssa");
  });
}]);