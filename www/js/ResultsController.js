angular.module('app.controllers')

.controller('ResultsController', function($scope, $stateParams) {
  $scope.args = $stateParams;
  // $scope.list = [{'id':1,'title':'hey'},{'id':2,'title':'sup'},{'id':3,'title':'nothin'}];
});