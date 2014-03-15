// Ionic app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.services', 'app.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('splash', {
      url: "/splash",
      templateUrl: "templates/splash.html"
    })

    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"  
    })

    .state('slide', {
      url: "/slide",
      templateUrl: "templates/slide.html",
      controller: "CardsCtrl"
    });

    // .state('side-bar.start', {
    //   url: "/start",
    //   views: {
    //     'home-view': {
    //       templateUrl: "templates/start.html",
    //       controller: "StartController"
    //     }
    //   }
    // })

    // .state('side-bar.slides', {
    //   url: '/start/:slideId',
    //   views: {
    //     'slide-views': {
    //       templateUrl: 'templates/slide.html',
    //       controller: 'SlideController'
    //     }
    //   }
    // });

  // $stateProvider

  //   // setup an abstract state for the tabs directive
  //   .state('tab', {
  //     url: "/tab",
  //     abstract: true,
  //     templateUrl: "templates/side-bar.html"
  //   })

  //   // the pet tab has its own child nav-view and history
  //   .state('tab.pet-index', {
  //     url: '/pets',
  //     views: {
  //       'pets-tab': {
  //         templateUrl: 'templates/pet-index.html',
  //         controller: 'PetIndexCtrl'
  //       }
  //     }
  //   })

  //   .state('tab.pet-detail', {
  //     url: '/pet/:petId',
  //     views: {
  //       'pets-tab': {
  //         templateUrl: 'templates/pet-detail.html',
  //         controller: 'PetDetailCtrl'
  //       }
  //     }
  //   })

  //   .state('tab.adopt', {
  //     url: '/adopt',
  //     views: {
  //       'adopt-tab': {
  //         templateUrl: 'templates/adopt.html'
  //       }
  //     }
  //   })

  //   .state('tab.about', {
  //     url: '/about',
  //     views: {
  //       'about-tab': {
  //         templateUrl: 'templates/about.html'
  //       }
  //     }
  //   });

  // // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/pets');
  $urlRouterProvider.otherwise('/splash');

});
// .directive('noScroll', function($document) {

//   return {
//     restrict: 'A',
//     link: function($scope, $element, $attr) {

//       $document.on('touchmove', function(e) {
//         e.preventDefault();
//       });
//     }
//   }
// })
// ;

