angular.module('app.services', [])

.factory('SlideService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var slides = [];

  return {
    all: function() {
      return slides;
    },
    get: function(slideId) {
      // Simple index lookup
      return slides[slideId];
    }
  }
});
