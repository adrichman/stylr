angular.module('app.controllers', [])

.controller('HomeController', function($scope, $state) {

  $scope.go = function() {
    $state.go('slide');
  };

})

.controller('SlideController', ['$scope', function($scope) {

}]);