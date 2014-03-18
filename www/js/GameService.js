angular.module('app.services')

.service('EndOfGameService', ['$state', function($state){
  return  function(prefs){
            $state.go('results', { preference: prefs });
          };
}]);