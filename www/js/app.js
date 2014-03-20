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
      templateUrl: "templates/splash.html",
      controller: 'UserController'
    })

    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"  
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
      templateUrl: "templates/slide.html",
    })

    .state('home.slide.cards', {
      parent: "home.slide",
      url:"/cards",
      controller: "CardsController",
      templateUrl: "templates/slide.cards.html",
      resolve: {
        cardTypes: function(PhotoService){
                    return PhotoService().then(function(photos){
                      return photos;
                    });   
                  }       
      }
    })

    .state('home.results', {
      onEnter: function($stateParams){
        console.log($stateParams);
      },
      parent: "home",
      url: "/results?preference",
      templateUrl: "templates/results.html",
      controller: "ResultsController"
    });

  $urlRouterProvider.otherwise('/splash');

});
