angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$scope', '$state', function($scope, $state)  {

  $scope.$on('$viewContentLoading', function() {
  });

  $scope.go = function(state) {
    $state.go(state);
  };

  $scope.$on('$viewContentLoaded', function() {
  });
}])
.directive('gotTapped', ['$ionicGesture', function($ionicGesture, $timeout) {

    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $ionicGesture.on('touch', function(e) {
                console.log('I got Tapped!')
                console.log($element);
                $element.addClass('circular-tap');
            }, $element);
            $ionicGesture.on('release', function(e) {
                console.log('I got unTapped!')
                console.log($element);
                $element.removeClass('circular-tap');
            }, $element);
        }
    };
}]);