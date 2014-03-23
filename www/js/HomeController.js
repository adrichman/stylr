angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', '$ionicLoading','ENV', function($rootScope, $scope, $state, $timeout, $ionicLoading, ENV)  {
  $scope.showSpinner = false;
  $scope.loading = $ionicLoading.show(ENV.loadingOptions);

  $scope.$on('$viewContentLoading', function() {
  });
  
  $scope.$on('$viewContentLoaded', function() {
    $timeout(function(){
      $scope.loading.hide();
    },3000)
  });

  $rootScope.$on('$stateChangeStart', function() {
    $scope.loading = $ionicLoading.show(ENV.loadingOptions);
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $rootScope.level = $state.params.level ? $state.params.level : 1;
    $timeout(function(){
      $scope.loading.hide();
    },1000)
  });

  $scope.go = function(state) {
    $state.go(state, { level : $rootScope.level });
  };

}]);