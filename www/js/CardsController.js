angular.module('app.controllers')

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $timeout, $state, EndOfGameService, PhotoService) {
  
  var cardTypes = PhotoService.getPhotos();

  // [
  //   // { title: 'Swipe down to clear the card', image: 'img/pic.png' },
  //   { id: 1, title: 'blouse',     image: 'img/blouse.png',      category: 'romantic' },
  //   { id: 2, title: 'handbag',    image: 'img/handbag.png',     category: 'romantic' },
  //   { id: 3, title: 'necklace',   image: 'img/necklace.png',    category: 'romantic' },
  //   { id: 4, title: 'underwear',  image: 'img/underwear.png',   category: 'romantic' },
  //   { id: 5, title: 'shoe',       image: 'img/shoe.png',        category: 'romantic' },
  //   { id: 6, title: 'dress',      image: 'img/dress.png',       category: 'romantic' }
  // ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    index = index || 0;
    $scope.addCard(index);
    if (this.swipeCard){
      $scope.registerPreference(this);
    }
  };

  $scope.registerPreference = function(card){
    $scope.preference = {
      id  :     card.card.id, 
      like:     card.swipeCard.x >= 0 ? 1 : 0,
      category: card.card.category
    }
    // $databaseService.register()
    if (cardTypes.length < 2) {
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
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});