angular.module('app.controllers')

.controller('CardsController', ['ENV','$rootScope','$scope','cardTypes','GameService', '$ionicSwipeCardDelegate', '$timeout', '$state', '$ionicPopup', '$rootScope','PhotoService', function(ENV, $rootScope, $scope, cardTypes, GameService, $ionicSwipeCardDelegate, $timeout, $state, $ionicPopup, $rootScope, PhotoService) {
  $scope.cards = [];
  $scope.preloadCache;
  $scope.hot = false;
  $scope.center = true;
  $scope.hotClass = ENV.style.color ? 'hot-color':'hot-white'; 
  $scope.notClass = ENV.style.color ? 'not-color':'not-white';
  $rootScope.stateIntercepted = false;

  $scope.$on('!hot', function(){
    window._rAF(function(){
      $timeout(function(){
        $scope.hot = false;
      },25)
    })
  })
  $scope.$on('!center', function(){
    window._rAF(function(){
      $timeout(function(){
        $scope.center = false;
      },25)
    })
  })
  $scope.$on('hot', function(){
    window._rAF(function(){
      $timeout(function(){
        $scope.hot = true;
      },25)
    })
  })
  $scope.$on('center', function(){
    window._rAF(function(){
      $timeout(function(){
        $scope.center = true;
      },400)
    })
  })
  

  PhotoService.requestPhotos(+($state.params.level) + 1)
  .then(function(res){
      PhotoService.getPhotos(res)
      .then(function(urls){
        $scope.preloadCache = urls;
    })
  });
  
  $scope.showAlert = function() {
    if ($rootScope.level < Object.keys(ENV.categories).length){
      return $ionicPopup.alert({
        templateUrl: 'templates/popup.html',
        title: ENV.levelPopupTitle[+($rootScope.level)],
        scope: $scope,
        okText: 'Next Up: ' + ENV.categories[+($rootScope.level) + 1].friendly,
        okType: 'button-stable'
      });
    } else {
      return $ionicPopup.alert({
        templateUrl: 'templates/popup.html',
        title: 'We\'ve got your style!',
        scope: $scope,
        okText: 'Tell Me!',
        okType: 'button-stable'
      });
      
    }
  };
  $scope.cardSwiped = function(index) {
    index = index || 0;
    $scope.addCard(index);
  };

  $scope.registerPreference = function(index, swipedCard){
    $scope.preference = GameService.calculateScore(swipedCard, $scope.preference) || {};
    if (cardTypes.length < 1) {
      $timeout(function(){
        window._rAF(function(){
          $scope.showAlert().then(function(){
            GameService.nextLevel($scope.preference);
          }); 
        });
      })
    }
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    cardTypes.shift();
    $scope.registerPreference(index, this);
  };

  $scope.addCard = function(index) {
    index = index || 0;
    var newCard = cardTypes[index];
    $scope.cards.push(angular.extend({}, newCard));
    return newCard;
  };

}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
}); 
