// Ionic app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', ['ionic', 'firebase', 'app.services', 'app.controllers'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('splash', {
      url: "/splash",
      templateUrl: "templates/splash.html",
      controller: 'UserController'
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
                          return PhotoService.requestPhotos($stateParams.level).then(function(photos){
                            console.log(photos);
                            return photos;
                          });   
                        }
      }
    })

    .state('home.results', {
      parent: "home",
      url: "/results?preference",
      templateUrl: "templates/results.html",
      controller: "ResultsController"
    });

  $urlRouterProvider.otherwise('/splash');

});

// .run(function($rootScope, $firebaseSimpleLogin, $state, $window) {

//   var firebaseRef = new Firebase("https://sweltering-fire-2238.firebaseio.com/");
//   var loginObj = $firebaseSimpleLogin(firebaseRef);

//   console.log(loginObj);

//   loginObj.$getCurrentUser().then(function(user) {
//     if(!user){ 
//       // Might already be handled by logout event below
//       //$state.go('home');
//     }
//   }, function(err) {
//     console.log("err", err);
//   });

//   $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
//     $state.go('home');
//   });

//   $rootScope.$on('$firebaseSimpleLogin:logout', function(e, user) {
//     console.log($state);
//     //$state.go('splash'); "GO SOMEWHERE ON LOGOUT"
//   });

// });
