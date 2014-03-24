angular.module('app.controllers')

.controller('ResultsController', ['$scope', '$stateParams', '$http', 'UserService', function($scope, $stateParams, $http, UserService) {
  $scope.args = $stateParams;
  // $scope.list = [{'id':1,'title':'hey'},{'id':2,'title':'sup'},{'id':3,'title':'nothin'}];

  $scope.post = function() {
    UserService.currentUser().then(function(user) {
        console.log(user);
        $http.post('https://graph.facebook.com/' + user.id + '/feed?message=SUP&access_token=' + user.accessToken )
        .success(function(data, status, headers, config) {
          console.log(arguments);
        })
        .error(function(data, status, headers, config) {
          console.log(arguments);
        });
        
    });
  };
}]);