angular.module('app.services')

.factory('PhotoService', ['$q','$http','$rootScope', function($q, $http, $rootScope) {

  var categories = {
                    "1":  { "db": "Top"         , "friendly" : "Tops"          },
                    "2":  { "db": "Bottom"      , "friendly" : "Bottoms"       },
                    "3":  { "db": "Blouse"      , "friendly" : "Blouses"       },
                    "4":  { "db": "Dress"       , "friendly" : "Dresses"       },
                    "5":  { "db": "Sweatshirt"  , "friendly" : "Sweatshirts"   },
                    "6":  { "db": "Accessory"   , "friendly" : "Accessories"   },
                    "7":  { "db": "Bracelet"    , "friendly" : "Bracelets"     },
                    "8":  { "db": "Earings"     , "friendly" : "Earings"       },
                    "9":  { "db": "Necklace"    , "friendly" : "Necklaces"     },
                    "10": { "db": "Outer Layer" , "friendly" : "Outer Layers"  }
                  };

  var photosPromise = function(params) {
    params = params || 1;
    var d = $q.defer();
      $http.get('http://127.0.0.1:3000/images/' + categories[params].db)
        .success(function(data, status, headers, config) {
          d.resolve(data);
        }).error(function(data, status, headers, config) {
          d.reject(data);
        });
    return d.promise;
  };

    return photosPromise;

}]);
