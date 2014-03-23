angular.module('app.controllers')

.controller('LoginController', ['$scope', '$state', 'Cordova', 'UserService', function($scope, $state, Cordova, UserService) {

  $scope.signup = function() {
    console.log('FBSIGNUP');
    var chatRef = new Firebase('https://sweltering-fire-2238.firebaseio.com');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
        alert(error);
        $state.go('home.start');
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider, '\n\n\n', user);
        UserService.setCurrentUser(user);
        $state.go('home.start');
      } else {
        // user is logged out
        console.log("else");
      }
    });

    Cordova.navigator().then(function() {
      UserService.currentUser().then(function(user) {
        console.log(user);
        if( !user ) {
          auth.login('facebook', {
            rememberMe: true,
            scope: 'basic_info,email,user_likes'
          });
        } else {
          alert('Hello', user);
          $state.go('home.start');
        }
      });
    });
    
  };

}]);