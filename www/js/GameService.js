angular.module('app.services')

.service('GameService', ['$state','$rootScope', function($state, $rootScope){
  var fields = [
                "classic_score",
                "romantic_score",
                "edgy_score",
                "boho_score",
                "glam_score",
                "casual_score",
                "cute_top_score",
                "preppy_score"
              ];

  var UserPreferences = function(){
    var newPrefs = {};
    for (var i = 0; i < fields.length; i++){
      newPrefs[fields[i]] = 0;
    }
    return newPrefs;
  };

  var calculateScore = function(swipedCard, userPreferences){
    userPreferences = userPreferences || new UserPreferences();
    if (swipedCard.swipeCard.x >= 0) {
      for (var i = 0; i < fields.length; i++){
        userPreferences[fields[i]] += swipedCard.card[fields[i]];
      }
    }
    return userPreferences;
  };

  var nextLevel = function(prefs){
    if ($rootScope.level < Object.keys($rootScope.categories).length){
      $rootScope.level++;
      console.log('in next level');
      $state.go('home.slide.cards', { level : $rootScope.level });
    } else {
      end(prefs);
    }
  }

  var end = function(prefs){
    var favorite;
    var results = [];
    for (var key in prefs){
      results.push([key, prefs[key]]);
    }
    results.sort(function(a,b){
      return a[1] < b[1];
    });

    favorite = results[0][0].replace("_score","");
    $state.go('home.results', { preference: favorite });
  };

  return  {
            calculateScore: calculateScore,
            nextLevel: nextLevel,
            end: end
          }
}]);