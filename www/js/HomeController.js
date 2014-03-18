angular.module('app.controllers', ['ionic.contrib.ui.cards', 'app.services'])


.controller('HomeController', ['$scope', '$state', function($scope, $state)  {

  $scope.$on('$viewContentLoading', function() {
    console.log("ssa");
  });

  $scope.go = function() {
    $state.go('slide');
  };

  $scope.$on('$viewContentLoaded', function() {
    console.log("ssa");
  });
}]);


// .controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, $timeout) {
//   var cardTypes = [
//     // { title: 'Swipe down to clear the card', image: 'img/pic.png' },
//     { title: 'blouse', image: 'img/blouse.png' },
//     { title: 'handbag', image: 'img/handbag.png' },
//     { title: 'necklace', image: 'img/necklace.png' },
//     { title: 'underwear', image: 'img/underwear.png' },
//     { title: 'shoe', image: 'img/shoe.png' },
//     { title: 'dress', image: 'img/dress.png' }
//   ];

//   $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

//   $scope.cardSwiped = function(index) {
//     index = index || 0;
//     $scope.addCard(index);
//     if (this.swipeCard){
//       $scope.registerPreference(this.swipeCard);
//     }
//   };

//   $scope.registerPreference = function(card){
//     var preference = card.x >= 0 ? 1 : 0;
//     console.log("x", card.x, preference);
//     // $databaseService.register()
//   };

//   var last = 0;

//   $scope.cardDestroyed = function(index) {
//     $scope.cards.splice(index, 1);
//     cardTypes.shift();
//     if (cardTypes.length < 2) {
//       if (last === 1){
//         $timeout(function(){
//           alert('YOU\'RE BOHEMIAN-CHIC!');
//         });
//       }
//       last = 1;
//     }
//   };

//   $scope.addCard = function(index) {
//     index = index || 0;
//     var newCard = cardTypes[index];
//     $scope.cards.push(angular.extend({}, newCard));
//     return newCard;
//   }
// })

// .controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
//   $scope.goAway = function() {
//     var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
//     card.swipe();
//   };
// })

// .controller('UserController', function(dbService, Cordova) {
//   dbService.createDB().then(dbService.updateDB("someSHIT")); 
// });

