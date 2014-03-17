angular.module('app.controllers', ['ionic.contrib.ui.cards'])

.controller('HomeController', function($scope, $state) {

  $scope.go = function() {
    $state.go('slide');
  };

})

.controller('SlideController', ['$scope', function($scope) {

}])
.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $timeout) {
  var cardTypes = [
    // { title: 'Swipe down to clear the card', image: 'img/pic.png' },
    { title: 'blouse', image: 'img/blouse.png' },
    { title: 'handbag', image: 'img/handbag.png' },
    { title: 'necklace', image: 'img/necklace.png' },
    { title: 'underwear', image: 'img/underwear.png' },
    { title: 'shoe', image: 'img/shoe.png' },
    { title: 'dress', image: 'img/dress.png' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard(index);
  };

  var last = 0;

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    cardTypes.shift();
    if (cardTypes.length < 1) {
      if (last === 1){
        $timeout(function(){
          alert('YOU\'RE BOHEMIAN-CHIC!');
        });
      }
      last = 1;
    }
  };

  // var count = 1;

  $scope.addCard = function(index) {
    var newCard = cardTypes[index];
    // count++;
    $scope.cards.push(angular.extend({}, newCard));
  }
})
.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});