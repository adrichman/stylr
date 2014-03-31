(function(ionic) {

  // Get transform origin poly
  var d = document.createElement('div');
  var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
              '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'];

  var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
  for(var i = 0; i < transformKeys.length; i++) {
    if(d.style[transformKeys[i]] !== undefined) {
      TRANSFORM_ORIGIN = transformKeys[i];
      break;
    }
  }

  var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
              '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'];
  var TRANSITION = 'webkitTransition';
  for(var i = 0; i < transitionKeys.length; i++) {
    if(d.style[transitionKeys[i]] !== undefined) {
      TRANSITION = transitionKeys[i];
      break;
    }
  }

  var SwipeableCardController = ionic.controllers.ViewController.inherit({
    initialize: function(opts) {
      this.cards = [];

      var ratio = window.innerWidth / window.innerHeight;

      this.maxWidth = window.innerWidth - (opts.cardGutterWidth || 0);
      this.maxHeight = opts.height || 300;
      this.cardGutterWidth = opts.cardGutterWidth || 10;
      this.cardPopInDuration = opts.cardPopInDuration || 400;
      this.cardAnimation = opts.cardAnimation || 'pop-in';
    },
    /**
     * Push a new card onto the stack.
     */
    pushCard: function(card) {
      var self = this;
      this.cards.push(card);
      this.beforeCardShow(card, function(nextCard){
        setTimeout(function() {
          // card.disableTransition(self.cardAnimation);
          if (nextCard){
            nextCard.transitionIn(self.cardAnimation);
          }
        }, this.cardPopInDuration + 100);
      });

    },
    /**
     * Set up a new card before it shows.
     */
    beforeCardShow: function(card, cb) {
      if(card){
        var nextCard = card || this.cards[this.cards.length-1];
        if(!nextCard) return;
  
        // Calculate the top left of a default card, as a translated pos
        var topLeft = window.innerHeight / 2 - this.maxHeight/2;
  
        var cardOffset = Math.min(this.cards.length, 3) * 5;
  
        // Move each card 5 pixels down to give a nice stacking effect (max of 3 stacked)
        nextCard.setPopInDuration(this.cardPopInDuration);
        nextCard.setZIndex(this.cards.length);
        cb(nextCard);
      }
    },
    /**
     * Pop a card from the stack
     */
    popCard: function(animate) {
      var card = this.cards.pop();
      if(animate) {
        card.swipe();
      }
      return card;
    }
  });

  var SwipeableCardView = ionic.views.View.inherit({
    /**
     * Initialize a card with the given options.
     */
    initialize: function(opts) {
      opts = ionic.extend({
      }, opts);

      ionic.extend(this, opts);

      this.el = opts.el;

      this.startX = this.startY = this.x = this.y = 0;

      this.bindEvents();
    },

    /**
     * Set the X position of the card.
     */
    setX: function(x) {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + x + 'px,' + this.y + 'px, 0)';
      this.x = x;
      this.startX = x;
    },

    /**
     * Set the Y position of the card.
     */
    setY: function(y) {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px,' + y + 'px, 0)';
      this.y = y;
      this.startY = y;
    },

    /**
     * Set the Z-Index of the card
     */
    setZIndex: function(index) {
      this.el.style.zIndex = index;
    },

    /**
     * Set the width of the card
     */
    setWidth: function(width) {
      this.el.style.width = width + 'px';
    },

    /**
     * Set the height of the card
     */
    setHeight: function(height) {
      this.el.style.height = height + 'px';
    },

    /**
     * Set the duration to run the pop-in animation
     */
    setPopInDuration: function(duration) {
      this.cardPopInDuration = duration;
    },

    /**
     * Transition in the card with the given animation class
     */
    transitionIn: function(animationClass) {
      var self = this;

      this.el.classList.add(animationClass + '-start');
      this.el.classList.add(animationClass);
      this.el.style.display = 'block';
      setTimeout(function() {
        self.el.classList.remove(animationClass + '-start');
      }, 100);
    },

    /**
     * Disable transitions on the card (for when dragging)
     */
    disableTransition: function(animationClass) {
      this.el.classList.remove(animationClass);
    },

    /**
     * Swipe a card out programtically
     */
    swipe: function() {
      this.transitionOut();
    },

    /**
     * Fly the card out or animate back into resting position.
     */
    transitionOut: function() {
      var self = this;

        // Fly out
        if (this.x > 0) { 
          rotateTo = this.rotationAngle + (this.rotationDirection * 0.6) ;
        } else {
          rotateTo = (this.rotationAngle - (this.rotationDirection * 0.6) );
        };
        var duration = 0.6;
        this.el.style[TRANSITION] = '-webkit-transform ' + duration + 's ease-in-out';
        this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + (this.x * 50) + 'px,'+ 0 +'px,0) rotate(' + rotateTo + 'rad)';
        this.onSwipe && this.onSwipe();

        // Trigger destroy after card has swiped out
        setTimeout(function() {
          self.onDestroy && self.onDestroy();
        }, duration * 2);
    },

    /**
     * Snap the card back to the center if drag is aborted
     */
    transitionBack: function(e) {
      var self = this;
      self.el.style[TRANSITION] = '-webkit-transform 0.1s linear';
      self.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0px,0px,0) rotate(0rad)';
    },

    /**
     * Bind drag events on the card.
     */
    bindEvents: function() {
      var self = this;
      ionic.onGesture('dragstart', function(e) {
        var cy = window.innerHeight / 2;
        if(e.gesture.touches[0].pageY < cy) {
          self._transformOriginRight();
        } else {
          self._transformOriginLeft();
        }
        window._rAF(function() { self._doDragStart(e) });
      }, this.el);

      ionic.onGesture('drag', function(e) {
        window._rAF(function() { self._doDrag(e) });
      }, this.el);

      ionic.onGesture('dragend', function(e) {
        window._rAF(function() { self._doDragEnd(e); self.onDragEnd(e) });
      }, this.el);

      ionic.onGesture('dragabort', function(e) {
        window._rAF(function() { self._doDragAbort(e); self.onDragEnd(e) });
      }, this.el);
    },

    // Rotate anchored to the left of the screen
    _transformOriginLeft: function() {
      this.el.style[TRANSFORM_ORIGIN] = 'left center';
      this.rotationDirection = 1;
    },

    _transformOriginRight: function() {
      this.el.style[TRANSFORM_ORIGIN] = 'left center';
      this.rotationDirection = 1;
     },

    _doDragStart: function(e) {
      var height = this.el.offsetHeight;
      var point = window.innerHeight / 2 + (this.rotationDirection * (height / 2))
      var distance = Math.abs(point - e.gesture.touches[0].pageY);// - window.innerWidth/2);
      this.touchDistance = distance * 8;

    },

    _doDrag: function(e) {

      var o = e.gesture.deltaX / 5;

      this.rotationAngle = Math.atan(o/this.touchDistance) * this.rotationDirection;

      this.x = this.startX + (e.gesture.deltaX);
      this.y = this.startY + (e.gesture.deltaY);

      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x * .8 + 'px, ' + this.y + 'px, 0) rotate(' + (this.rotationAngle) + 'rad)';
      this.onDrag && this.onDrag(e);
    },
    _doDragEnd: function(e) {
      this.transitionOut(e);
    },

    _doDragAbort: function(e) {
      this.startX = this.startY = this.x = this.y = 0;
      this.transitionBack(e);
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(0px,0px, 0) rotate(0rad)';
    }
  });


  angular.module('ionic.contrib.ui.cards', ['ionic'])

  .directive('swipeCard', ['$ionicGesture','$timeout', function($ionicGesture, $timeout) {
    return {
      restrict: 'E',
      template: '<div class="swipe-card" ng-transclude></div>',
      require: '^swipeCards',
      replace: true,
      transclude: true,
      scope: {
        onSwipe: '&',
        onDestroy: '&'
      },
      compile: function(element, attr) {
        return function($scope, $element, $attr, swipeCards) {
          var el = $element[0];
          var direction = 0;

          // Instantiate our card view
          var swipeableCard = new SwipeableCardView({
            el: el,
            onSwipe: function() {
              $timeout(function() {
                $scope.onSwipe();
              });
            },
            onDestroy: function() {
              $timeout(function() {
                $scope.onDestroy();
              });
            },
            onDrag: function(e){
              if(e.gesture.deltaX < -15 && direction > -1) {
                $scope.$emit('!hot');
                $scope.$emit('!center');
                direction = -1;
              } else if (e.gesture.deltaX > 15 && direction < 1) {
                $scope.$emit('hot');
                $scope.$emit('!center');
                direction = 1;
              } else {
                 direction = 0;
              }
            },
            onDragEnd: function(e){
              $scope.$emit('center');
              direction = 0;
            }
          });
          $scope.$parent.swipeCard = swipeableCard;
          if ($scope.$parent.card['Image_URL']){
            swipeCards.pushCard(swipeableCard);
          }
        }
      }
    }
  }])

  .directive('swipeCards', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      template: '<div class="swipe-cards" ng-transclude></div>',
      replace: true,
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var swipeController = new SwipeableCardController({
        });

        $rootScope.$on('swipeCard.pop', function(isAnimated) {
          swipeController.popCard(isAnimated);
        });

        return swipeController;
      }
    }
  }])

  .factory('$ionicSwipeCardDelegate', ['$rootScope', function($rootScope) {
    return {
      popCard: function($scope, isAnimated) {
        $rootScope.$emit('swipeCard.pop', isAnimated);
      },
      getSwipebleCard: function($scope) {
        return $scope.$parent.swipeCard;
      }
    }
  }]);

})(window.ionic);
