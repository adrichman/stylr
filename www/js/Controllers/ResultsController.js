angular.module('app.controllers')

.controller('ResultsController', ['$scope', '$state', '$stateParams', '$http', '$location', 'UserService','stateChangeInterceptor', 'ENV','$timeout', function($scope, $state, $stateParams, $http, $location, UserService, stateChangeInterceptor, ENV, $timeout) {
  $scope.result = "";
  $scope.showResult = false;

  $scope.postFB = function() {
    $state.go('home.loading');
    UserService.currentUser().then(function(user) {
      if (user !== null){
        $http.post('https://graph.facebook.com/' + user.id + '/feed?link=http://www.stitchfix.com&picture=https://d27bvhtwhzf6pr.cloudfront.net/assets/facebook-share-banner.jpg&message=My\40style\40is:\40' + $stateParams.preference + '!&access_token=' + user.accessToken )
        .success(function(data, status, headers, config) {
          $scope.showAlert('fb').then(function(){ return; });
        })
        .error(function(data, status, headers, config) {
          $scope.showAlert('fb0').then(function(){ return; });
        });
      } else {
         $scope.showAlert('fb0').then(function(){ return; });
      }
    });
  };

  $scope.stitchFix = function() {
    window.open('http://www.stitchfix.com', '_system');
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
