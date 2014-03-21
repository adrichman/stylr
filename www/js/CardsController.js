angular.module('app.controllers')

.controller('CardsController', ['$scope','cardTypes','GameService', '$ionicSwipeCardDelegate', '$timeout', '$state', '$ionicPopup', '$rootScope', function($scope, cardTypes, GameService, $ionicSwipeCardDelegate, $timeout, $state, $ionicPopup, $rootScope) {
  $scope.cards = [];

  $scope.showAlert = function() {
    return $ionicPopup.alert({
      templateUrl: 'templates/popup.html',
      title: 'We\'ve got your style!',
      scope: $scope,
      okText: 'Ok',
      okType: 'button-stable'
    });
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
          GameService.end($scope.preference);
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