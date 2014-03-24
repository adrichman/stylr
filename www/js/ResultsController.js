angular.module('app.controllers')

.controller('ResultsController', ['$scope', '$stateParams', 'UserService', function($scope, $stateParams, UserService) {
  $scope.args = $stateParams;
  // $scope.list = [{'id':1,'title':'hey'},{'id':2,'title':'sup'},{'id':3,'title':'nothin'}];

  $scope.post = function() {
    UserService.currentUser().then(function(user) {
      console.log(window);
    });
  };
}]);