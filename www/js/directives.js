angular.module('app.directives',[])
.directive('hotOrNot', ['$timeout', function($timeout){
  return {
        restrict: 'E'
        ,
        // scope: {
          // hotOrNot: '@',
          // notClass: '@'
        // }
        // ,
        template:
          '<div animate class="hot-or-not {{ notClass }}">' +
            '<h1>{{ hotOrNot }}</h1>'                                 +
          '</div>'
        ,
        replace: true
        ,
        link: function($scope, $element, $attr) {
          $scope.hotOrNot = "";
          $scope.$on('!hot', function(){
            $timeout(function(){
              window._rAF(function(){
                  $scope.hotOrNot = "GROSS!";
                  $element[0].style.visibility = 'visible';
                  $element[0].classList.remove('hidden');
                  $element[0].classList.add('stylr-quick-slide');
              })
            })
          })
          $scope.$on('!center', function(){
            $timeout(function(){
              window._rAF(function(){
                  $scope.center = false;
                  $element[0].style.visibility = 'visible';
                  $element[0].classList.remove('hidden');
                  $element[0].classList.add('stylr-quick-slide');
              })
            })
          })
          $scope.$on('hot', function(){
            $timeout(function(){
              window._rAF(function(){
                  $scope.hotOrNot = "HOTT!";
                  $element[0].style.visibility = 'visible';
                  $element[0].classList.remove('hidden');
                  $element[0].classList.add('stylr-quick-slide');
              })
            })
          })
          $scope.$on('center', function(){
            $timeout(function(){
              window._rAF(function(){
                  $scope.center = true;
                  $scope.hotOrNot = "";
                  $element[0].style.visibility = 'hidden';
                  $element[0].classList.add('hidden');
              })
            }, 400);
          })
        }
    };
}])
.directive('levels', function(){
  return {
    restrict: 'E',
    scope: {
      level: '='
    },
    template: ' <div animate class="levels stylr-slide-right">' +
              '   <div class="fa fa-star level-star"></div> ' +
              '   <div class="fa fa-star level-star"></div> ' +
              '   <div class="fa fa-star level-star"></div> ' +
              '   <div class="fa fa-star level-star"></div> ' +
              '   <div class="fa fa-star level-star"></div> ' +
              '   <div class="fa fa-star level-star"></div> ' +
              ' </div>'
              ,
    replace: true,
    link: function($scope, $element, $attr){
      console.log($scope.level);
      console.log($element.children().length);       
       for (var i = 0; i < $scope.level; i++){
        $element.children()[i].classList.add('level-complete');
       }
    }
  }
})
