angular.module('app.controllers')

.controller('ResultsController', ['$scope', '$state', '$stateParams', '$http', '$location', 'UserService','$ionicLoading', 'ENV', function($scope, $state, $stateParams, $http, $location, UserService, $ionicLoading, ENV) {
  $scope.args = $stateParams;
  // $scope.list = [{'id':1,'title':'hey'},{'id':2,'title':'sup'},{'id':3,'title':'nothin'}];

  $scope.postFB = function() {
    
    UserService.currentUser().then(function(user) {
        console.log(user);
        //$http.post('https://graph.facebook.com/' + user.id + '/feed?message=&access_token=' + user.accessToken )
        $http.post('https://graph.facebook.com/' + user.id + '/feed?link=http://www.stitchfix.com&picture=https://d27bvhtwhzf6pr.cloudfront.net/assets/facebook-share-banner.jpg&message=Look\40at\40my\40style!&access_token=' + user.accessToken )
        .success(function(data, status, headers, config) {
          console.log(arguments);
        })
        .error(function(data, status, headers, config) {
          console.log(arguments);
        });
        
    });
  };

  $scope.stitchFix = function() {
<<<<<<< HEAD
    // $scope.loading = $ionicLoading.show(ENV.loadingOptions);
    $scope.$apply(function() { 
      $location.path("http://www.stitchfix.com"); 
    });
=======
>>>>>>> Working on swipe indication
  };

  $scope.playAgain = function() {
    $state.go('home.start');
  };

}]);