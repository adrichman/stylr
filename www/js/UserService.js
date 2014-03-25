angular.module('app.services')

.service('UserService', function($q, $cookieStore) {

  var self = this;

  this._currentUser = $cookieStore.get('user');

  this.setCurrentUser = function(user) {
    var d = $q.defer();
    console.log("\n\n Set USER: ", user, "\n\n");
    $cookieStore.put('user', user);
    self._currentUser = user;
    d.resolve(user);
    return d.promise;
  };

  this.currentUser = function() {
    var d = $q.defer();
    if( self._currentUser) {
      d.resolve(self._currentUser);
    } else if ( $cookieStore.get('user') ) {
      self.setCurrentUser($cookieStore.get('user'));
      d.resolve(self._currentUser);
    } else {
      d.resolve(null);
    }
    return d.promise;
  };

  this.user = function() {

  }


});