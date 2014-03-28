angular.module('app.controllers')

.controller('HotOrNotController', [$scope, function($scope){
  $scope.hot;
  $scope.center = true;

  $scope.$on('!hot', function(){
    $timeout(function(){
      $scope.hot = false;
    })
  })
  $scope.$on('!center', function(){
    $timeout(function(){
      $scope.center = false;
    })
  })
  $scope.$on('hot', function(){
    $timeout(function(){
      $scope.hot = true;
    })
  })
  $scope.$on('center', function(){
    $timeout(function(){
      $scope.center = true;
    },400)
  })
}])