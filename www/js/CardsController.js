angular.module('app.controllers')

.controller('CardsController', ['ENV', '$ionicGesture','$rootScope','$scope','cardTypes','GameService', '$ionicSwipeCardDelegate', '$timeout', '$state', '$ionicPopup', '$rootScope','PhotoService', function(ENV, $ionicGesture, $rootScope, $scope, cardTypes, GameService, $ionicSwipeCardDelegate, $timeout, $state, $ionicPopup, $rootScope, PhotoService) {
  $scope.cards = [];
  $scope.preloadCache;
  $scope.hot;
  $scope.center = true;
  // console.log($ionicGesture);
  // $ionicGesture.on('drag', function(){ console.log(arguments); });
  $scope.$on('!hot', function(){
    $timeout(function(){
      $scope.hot = false;
    })
  })
  $scope.$on('!center', function(){
    $timeout(function(){
      $scope.center = false;
    })
  })
  $scope.$on('hot', function(){
    $timeout(function(){
      $scope.hot = true;
    })
  })
  $scope.$on('center', function(){
    $timeout(function(){
      $scope.center = true;
    },400)
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
        title: 'Level ' + $rootScope.level + ' Complete!',
        scope: $scope,
        okText: ENV.categories[+($rootScope.level) + 1].friendly,
        okType: 'button-stable'
      });
    } else {
      return $ionicPopup.alert({
        templateUrl: 'templates/popup.html',
        title: 'We\'ve got your style!',
        scope: $scope,
        okText: 'Ok',
        okType: 'button-stable'
      });
      
    }
  };
  $scope.cardSwiped = function(index) {
    index = index || 0;
    $scope.addCard(index);
    $scope.registerPreference(index, this);
  };

  $scope.registerPreference = function(index, swipedCard){
    $scope.preference = GameService.calculateScore(swipedCard, $scope.preference) || {};
    if (cardTypes.length < 2) {
      $scope.showAlert().then(function(){
        $timeout(function(){
          GameService.nextLevel($scope.preference);
        },400); 
      });
    }
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    cardTypes.shift();
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
