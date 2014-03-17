angular.module('app.controllers', ['ionic.contrib.ui.cards'])


.controller('HomeController', ['$scope', '$ionicLoading', '$state', function($scope, $ionicLoading, $state)  {

  $scope.$on('$viewContentLoading', function() {
    console.log("ssa");
  });

  $scope.go = function() {
    $state.go('slide');
  };

  $scope.$on('$viewContentLoaded', function() {
    console.log("ssa");
  });

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
    index = index || 0;
    $scope.addCard(index);
  };

  var last = 0;

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
    cardTypes.shift();
    if (cardTypes.length < 2) {
      if (last === 1){
        $timeout(function(){
          alert('YOU\'RE BOHEMIAN-CHIC!');
        });
      }
      last = 1;
    }
  };

  $scope.addCard = function(index) {
    index = index || 0;
    var newCard = cardTypes[index];
    $scope.cards.push(angular.extend({}, newCard));
  }
})
.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});
