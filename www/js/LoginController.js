angular.module('app.controllers')

.controller('LoginController', ['$scope', '$state', 'Cordova', 'UserService', '$ionicPopup','$timeout', function($scope, $state, Cordova, UserService, $ionicPopup, $timeout) {
  $scope.showButton = true;
  $scope.signup = function() {
    console.log('FBSIGNUP');
    $scope.showButton = false;
    var chatRef = new Firebase('https://sweltering-fire-2238.firebaseio.com');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
          window._rAF(function(){
            return $ionicPopup.alert({
                      content:  '<p>There was an error during authentication, '+
                                'but we\'ll let it slide this time.</p>', 
                      display: 'popup-content' ,
                      templateUrl: 'templates/popup.html',
                      title: "Uh-Oh.",
                      scope: $scope,
                      okText: 'Proceed',
                      okType: 'button-assertive'
                    })
                    .then(function(){
                      $timeout(function(){
                        window._rAF(function(){
                          $state.go('home.start');
                        });
                      });
                    });
                  })
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider, '\n\n\n', user);
        UserService.setCurrentUser(user).then(function(){
          $state.go('home.start');
        });
      }
      console.log('AUTH', auth);
    });

    Cordova.navigator().then(function() {
      UserService.currentUser().then(function(user) {
        if( !user ) {
          auth.login('facebook', {
            rememberMe: true,
            scope: 'basic_info,email,user_likes,publish_actions'
          });
        } else {
          $state.go('home.start');
        }
      });
    });
    
  };

}]);