angular.module('app.services')

.service('EndOfGameService', ['$state', function($state){
  
  var calculateScores = function(prefs){
    return prefs;
  };


  return  function(prefs){
            $state.go('results', { preference: prefs });
          };
}]);