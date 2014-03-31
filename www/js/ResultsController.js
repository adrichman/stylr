angular.module('app.controllers')

.controller('ResultsController', ['$scope', '$state', '$stateParams', '$http', '$location', 'UserService','$ionicLoading', 'ENV','$timeout', function($scope, $state, $stateParams, $http, $location, UserService, $ionicLoading, ENV, $timeout) {
  $scope.result = "";
  $scope.showResult = false;
  // $scope.list = [{'id':1,'title':'hey'},{'id':2,'title':'sup'},{'id':3,'title':'nothin'}];

  $scope.postFB = function() {
    
    UserService.currentUser().then(function(user) {
        //$http.post('https://graph.facebook.com/' + user.id + '/feed?message=&access_token=' + user.accessToken )
        $http.post('https://graph.facebook.com/' + user.id + '/feed?link=http://www.stitchfix.com&picture=https://d27bvhtwhzf6pr.cloudfront.net/assets/facebook-share-banner.jpg&message=My\40style\40is:\40' + $stateParams.preference + '!&access_token=' + user.accessToken )
        .success(function(data, status, headers, config) {
          console.log(arguments);
        })
        .error(function(data, status, headers, config) {
          console.log(arguments);
        });
        
    });
  };

  $scope.stitchFix = function() {
    // $scope.loading = $ionicLoading.show(ENV.loadingOptions);
    // $scope.$apply(function() { 
      window.open('http://www.stitchfix.com', '_system');
      // $location.path("http://www.stitchfix.com"); 
    // });
  };

  $scope.playAgain = function() {
    $state.go('home.start', 0);
  };


/////////////////////////////////////////////////////////////
// TODO: REFACTOR TO DIRECTIVE
////////////////////////////////////////////////////////////
  var resultRevealString = $stateParams.preference.split('');
  
  var beginReveal = function(){
      $timeout(function(){
        $scope.showResult = true;
      },2000)
      .then(function(){
        resultReveal();
      });
  };

  var resultReveal = function(){
    if (resultRevealString.length > 0){
      $timeout(function(){
        $scope.result += resultRevealString.shift();
        resultReveal();
      },150);
    } else {
      return;
    }
  };

  beginReveal();
}]);
