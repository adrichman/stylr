angular.module('app.controllers')

.controller('UserController', function(dbService, Cordova) {
  dbService.createDB().then(dbService.updateDB("someSHIT")); 
});