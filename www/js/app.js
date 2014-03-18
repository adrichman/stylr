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
      onEnter: function() {
      },
      url: "/splash",
      templateUrl: "templates/splash.html",
      controller: 'UserController'
    })

    .state('home', {
      onEnter: function () {
      },
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"  
    })

    .state('slide', {
      url: "/slide",
      templateUrl: "templates/slide.html",
      controller: "CardsCtrl"
    })

    .state('results', {
      url: "/results",
      templateUrl: "templates/results.html",
      controller: "ResultsController"
    });

  $urlRouterProvider.otherwise('/splash');

});

