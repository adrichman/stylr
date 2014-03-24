angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', '$ionicLoading','ENV', function($rootScope, $scope, $state, $timeout, $ionicLoading, ENV)  {
  $scope.showLoading = false;

  $scope.$on('$viewContentLoading', function() {
  });
  
  $scope.$on('$viewContentLoaded', function() {
  });

  $rootScope.$on('$stateChangeStart', function() {
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $rootScope.level = $state.params.level ? $state.params.level : 1;
  });

  $scope.go = function(state) {
    $state.go(state, { level : $rootScope.level });
  };

}])
.directive('gotTapped', ['$ionicGesture', function($ionicGesture, $timeout) {

    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $ionicGesture.on('mousedown', function(e) {
                console.log('I got Tapped!')
                console.log($element);
                $element.addClass('circular-tap');
            }, $element);
            $ionicGesture.on('$destroy mouseup', function(e) {
                console.log('I got unTapped!')
                console.log($element);
                $element.removeClass('circular-tap');
            }, $element);
        }
    };
}]);