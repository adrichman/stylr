angular.module('app.services')

.service('GameService', ['$state', function($state){
  
  var calculateScores = function(prefs){
    return prefs;
  };


  return  {
    end:  function(prefs){
            $state.go('results', { preference: prefs });
          }
  }
}]);