angular.module('app.services')

.service('LoginService', ['Cordova', function(Cordova) {

  this.fbsignup = function() {
    var chatRef = new Firebase('https://sweltering-fire-2238.firebaseio.com');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider, '\n\n\n', user);
      } else {
        // user is logged out
      }
    });
    Cordova.navigator().then(function() {
      auth.login('facebook', {preferRedirect: true});
    });
  };
  
}]);