angular.module('app.controllers')

.controller('CardsController', ['$scope','cardTypes', 'PhotoService', 'EndOfGameService', '$ionicSwipeCardDelegate', '$timeout', '$state', function($scope, cardTypes, PhotoService, EndOfGameService, $ionicSwipeCardDelegate, $timeout, $state) {
  // console.log("cardTypes", cardTypes);
  $scope.cards = [];
  

  $scope.cardSwiped = function(index) {
    index = index || 0;
    $scope.addCard(index);
    if (this.swipeCard){
      $scope.registerPreference(index, this);
    }
  };

  $scope.registerPreference = function(index, swipedCard){
    $scope.preference = {
      id  :     swipedCard.card._id, 
      like:     swipedCard.swipeCard.x >= 0 ? 1 : 0,
      category: swipedCard.card.category
    }
    console.log($scope.preference);
    // $databaseService.register()
    if (cardTypes.length < 2) {
      console.log(EndOfGameService);
      $timeout(function(){
        EndOfGameService($scope.preference.category);
      },200);
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
  }
}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});