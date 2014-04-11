// Ionic app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'ngCookies', 'app.services', 'app.controllers','app.directives'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('splash', {
      url: "/splash",
      templateUrl: "templates/splash.html",
      controller: 'InitializationController'
    })

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginController"
    })

    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"
    })
    .state('home.loading', {
      url: "/loading?toState",
      templateUrl: "templates/loading.html",
      controller: "LoadingController"
    })

    .state('home.start', {
      parent: "home",
      url: "/start",
      templateUrl: "templates/start.html",
      controller: "HomeController"  
    })

    .state('home.slide', {
      parent: "home",
      url: "/slide",
      templateUrl: "templates/slide.html"
    })

    .state('home.slide.cards', {
      parent: "home.slide",
      url:"/cards?level",
      controller: "CardsController",
      templateUrl: "templates/slide.cards.html",
      resolve: {
        cardTypes:      function(PhotoService, $stateParams){
                          return PhotoService.requestPhotos($stateParams.level)

                          .then(function(photos){
                            return photos;
                          });   
                        }
      }
    })

    .state('home.slide.cards.hotOrNot', {
      parent: "home.slide.cards",
      url: "/hot-or-not",
      templateUrl: "templates/slide.cards.hot-or-not.html",
      controller: "HotOrNotController"
    })

    .state('home.results', {
      parent: "home",
      url: "/results?preference",
      templateUrl: "templates/results.html",
      controller: "ResultsController"
    });


  $urlRouterProvider.otherwise('/splash');

});

