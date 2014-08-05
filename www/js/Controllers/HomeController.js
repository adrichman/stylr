angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$rootScope','$scope', '$state', '$timeout', '$ionicPopup','ENV', '$q', 'stateChangeInterceptor',function($rootScope, $scope, $state, $timeout, $ionicPopup, ENV, $q, stateChangeInterceptor )  {
  $rootScope.level = $state.params.level ? $state.params.level : 0;
  $rootScope.stateIntercepted = false;

  $scope.$on('$viewContentLoading', function() {
  });
  
  $scope.$on('$viewContentLoaded', function() {
  });

  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    stateChangeInterceptor(e, toState, toParams, fromState, fromParams);
  });

  $rootScope.$on('$stateChangeSuccess', function() {
    $rootScope.level = $state.params.level ? $state.params.level : 1;
  });

  $scope.go = function(state, level) {
    level = level !== undefined ? level : $rootScope.level
    $state.go(state, { level : level });
  };

  $scope.showAlert = function(step) {
    var content = function(step){
      switch(step){
      case 'fb':    return  "<p>Successfully posted to Facebook!</p>";
                            break;
      case 'fb0':   return  "<p>Your post to Facebook was unsuccessful.</p>";
                            break;
      case 1:       return  "<p>Our stylists have a secret formula for perfectly describing your personal style.</p>" + 
                            "<p>Click below if you would like to check out some of their latest pieces.</p>";
                            break;
      case 2:       return  "<p>Swipe right if the item looks like something " +
                            "you would wear.</p><p>Swipe left if it's not really your thing.</p>";
                            break;
      case 3:       return  "<p>At the end, we'll reveal your true style definition.</p><p>Even better, we'll show you how to get hooked " +
                            "up with new clothes and accessories that are especially perfect for <strong>you</strong>.</p>";
                            break;
      }
    }
    var title = function(step){
      switch(step){
      case 'fb':  return  "Success!";
                          break;
      case 'fb0':  return  "Error";
                          break;
      case 1:     return  "What's Your Style?";
                          break;
      case 2:     return  "Hot or Not?";
                          break;
      case 3:     return  "Just for You.";
                          break;
      }
    }

    var okText = function(step){
      if (step === 'fb' || step === 'fb0') {
        return 'OK';
      } else {
        return step === 3 ? 'Play!' : 'Next';
      }
    }
    return $ionicPopup.alert({
      content: content(step), 
      display: 'popup-content' ,
      templateUrl: 'templates/popup.html',
      title: title(step),
      scope: $scope,
      okText: okText(step),
      okType: step === 'fb0' ? 'button-assertive' : 'button-stable'
    });
  };
  
  $scope.start = function(step){
    step = step || 1;
    window._rAF(function(){
      window._rAF(function(){
        $scope.showAlert(step).then(function(){
          if (step < 3) {
            step++;
            $scope.start(step);
          } else {
            $scope.go('home.slide', 0);
          }
        });
      })
    });
  }
}])
// .directive('gotTapped', ['$ionicGesture', function($ionicGesture, $timeout) {

//     return {
//         restrict: 'A',
//         link: function($scope, $element, $attr) {
//             $ionicGesture.on('touch', function(e) {
//                 $element.addClass('circular-tap');
//             }, $element);
//             $ionicGesture.on('release', function(e) {
//                 $element.removeClass('circular-tap');
//             }, $element);
//         }
//     };
// }]);