angular.module('app.controllers')

.controller('ResultsController', function($scope, $stateParams) {
  $scope.args = $stateParams;
});