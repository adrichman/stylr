angular.module('app.services')
.service('stateChangeInterceptor', ['$rootScope','$ionicLoading','$q', 'ENV','$timeout','$state', function($rootScope, $ionicLoading, $q, ENV, $timeout, $state){
  return (function(e, toState, toParams, fromState, fromParams){
    if (toState.name && !ENV.stateChangeWhiteList[toState.name.split('.').join('')] || !toState.match(/home/)){
      var loading;
      var loadingConfig = function(){
        var loadingCopy = function(level){
          level = level || 0;
          return ENV.loadingCopy[level];
        }
        var template =  '<h1><i class=\"icon ion-looping\"></i></h1>';

        if (toParams.preference) {
          template += '<h2>ANALYZING</h2>';
        } else if ($rootScope.level){
          template += '<h2>'+ loadingCopy($rootScope.level) +'</h2>';
        }
        return template;
      };

      ENV.loadingOptions.content = loadingConfig();

      var intercept = function(){
        var d = $q.defer();
        loading = $ionicLoading.show(ENV.loadingOptions);
        $timeout(function(){
          d.resolve(loading);
        },2500);
        return d.promise;
      };
  
      var proceed = function(loading){
        var d = $q.defer();
        var resolveState = function(currentLoading){
          currentLoading.hide();
          $state.go(toState, toParams);
        }
        d.resolve(resolveState(loading));
        return d.promise;
      }
  
      if (!$rootScope.stateIntercepted){
        e.preventDefault && e.preventDefault();
        $rootScope.stateIntercepted = true;
        intercept()
        .then(function(){ proceed(loading); })
        .then(function(){ $rootScope.stateIntercepted = false; });
      }
    }
  })
}]);